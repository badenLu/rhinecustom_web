<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Brevo\Client\Api\TransactionalEmailsApi;
use Brevo\Client\Configuration;
use Brevo\Client\Model\SendSmtpEmail;
use Illuminate\Http\Request;

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

            // 配置 Brevo API
            $config = Configuration::getDefaultConfiguration()->setApiKey('api-key', env('BREVO_API_KEY'));
            $apiInstance = new TransactionalEmailsApi(new \GuzzleHttp\Client(), $config);

            // 邮件1：发给管理员
            $emailToAdmin = new SendSmtpEmail([
                'sender' => ['email' => 'noreply@rhinecustom.com', 'name' => 'Rhine Custom'],
                'to' => [['email' => 'contact@rhinecustom.com']],
                'subject' => '新的旅行咨询 - ' . $contact->name,
                'htmlContent' => view('emails.contact-form-submitted', ['contact' => $contact])->render()
            ]);
            $apiInstance->sendTransacEmail($emailToAdmin);

            // 邮件2：发给用户（确认邮件）
            $emailToUser = new SendSmtpEmail([
                'sender' => ['email' => 'noreply@rhinecustom.com', 'name' => 'Rhine Custom'],
                'to' => [['email' => $contact->email]],
                'subject' => '感谢您的咨询 - Rhine Custom',
                'htmlContent' => view('emails.contact-form-confirmation', ['contact' => $contact])->render()
            ]);
            $apiInstance->sendTransacEmail($emailToUser);

            return response()->json([
                'message' => 'Form data stored successfully!',
                'contact' => $contact
            ], status: 201);

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
