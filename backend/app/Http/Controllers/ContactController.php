<?php

namespace App\Http\Controllers;

use App\Mail\ContactFormConfirmation;
use App\Mail\ContactFormSubmitted;
use App\Models\Contact;
use Brevo\Client\Api\TransactionalEmailsApi;
use Brevo\Client\Configuration;
use Brevo\Client\Model\SendSmtpEmail;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Exception;
use function Laravel\Prompts\error;

class ContactController extends Controller {
    public function store(Request $request) {
        // 验证请求参数（可根据需要调整验证规则）
        $validatedData = $request->validate([
            'title'           => 'required|string',
            'name'             => 'required|string',
            'email'            => 'required|email',
            'travelType'       => 'required|string',
            'destination'      => 'required|array',
            'destination.*'    => 'required|string|max:255',
            'startDate'        => 'required|date',
            'endDate'          => 'required|date',
            'number_of_people' => 'required|integer|min:1',
            'budget'           => 'required|integer|min:0',
        ]);

        try {
            // 将 destination 数组转为 JSON 存储
            $validatedData['destination'] = json_encode($validatedData['destination']);

            // 存储到数据库
            $contact = Contact::create($validatedData);

            $config = Configuration::getDefaultConfiguration()->setApiKey('api-key', env('BREVO_API_KEY'));
            $apiInstance = new TransactionalEmailsApi(new Client(), $config);

            $email = new SendSmtpEmail([
                'sender' => ['email' => 'noreply@rhinecustom.com', 'name' => 'Rhine Custom'],
                'to' => [['email' => 'contact@rhinecustom.com']],
                'subject' => '新的旅行咨询 - ' . $contact->name,
                'htmlContent' => view('emails.contact-form-submitted', ['contact' => $contact])->render()
            ]);

            $apiInstance->sendTransacEmail($email);

            return response()->json([
                'message' => 'Form data stored successfully!',
                'contact' => $contact
            ], 201);

        } catch (\Exception $e) {
            // 临时调试：直接返回详细错误信息
            return response()->json([
                'message' => 'Failed to process your request',
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()  // 完整堆栈
            ], status: 500);
        }
    }
}
