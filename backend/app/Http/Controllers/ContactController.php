<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        // 验证请求参数（可根据需要调整验证规则）
        $validatedData = $request->validate([
            'gender'           => 'required|string',
            'name'             => 'required|string',
            'email'            => 'required|email',
            'travelType'       => 'required|string',
            'destination'      => 'required|array', 
            'startDate'        => 'required|date',
            'endDate'          => 'required|date',
            'number_of_people' => 'required|integer|min:1',
            'budget'           => 'required|integer|min:0',
        ]);

        // 使用模型将数据插入数据库
        $contact = Contact::create($validatedData);

        return response()->json([
            'message' => 'Form data stored successfully!',
            'contact' => $contact
        ], 201);
    }
}
