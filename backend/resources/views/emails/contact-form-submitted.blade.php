<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>新的旅行咨询</title>
    <style>
        body {
            font-family: 'Microsoft YaHei', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
        .content {
            background: #f9f9f9;
            padding: 30px;
            border: 1px solid #ddd;
        }
        .info-row {
            margin: 15px 0;
            padding: 10px;
            background: white;
            border-left: 4px solid #667eea;
            border-radius: 4px;
        }
        .label {
            font-weight: bold;
            color: #667eea;
            display: inline-block;
            width: 120px;
        }
        .value {
            color: #333;
        }
        .footer {
            text-align: center;
            padding: 20px;
            color: #666;
            font-size: 12px;
            background: #f0f0f0;
            border-radius: 0 0 10px 10px;
        }
    </style>
</head>
<body>
<div class="header">
    <h1>🎉 新的旅行咨询</h1>
    <p>收到来自网站的新咨询表单</p>
</div>

<div class="content">
    <h2>客户信息</h2>

    <div class="info-row">
        <span class="label">称呼：</span>
        <span class="value">
                @if($contact->title == 'mr') 先生
                @elseif($contact->title == 'ms') 女士
                @else 其他
                @endif
            </span>
    </div>

    <div class="info-row">
        <span class="label">姓名：</span>
        <span class="value">{{ $contact->name }}</span>
    </div>

    <div class="info-row">
        <span class="label">邮箱：</span>
        <span class="value">{{ $contact->email }}</span>
    </div>

    <h2 style="margin-top: 30px;">旅行详情</h2>

    <div class="info-row">
        <span class="label">旅行类型：</span>
        <span class="value">{{ $contact->travelType }}</span>
    </div>

    <div class="info-row">
        <span class="label">目的地：</span>
        <span class="value">
                @if(is_array(json_decode($contact->destination)))
                    {{ implode(', ', json_decode($contact->destination)) }}
                @else
                    {{ $contact->destination }}
                @endif
            </span>
    </div>

    <div class="info-row">
        <span class="label">出发日期：</span>
        <span class="value">{{ $contact->startDate }}</span>
    </div>

    <div class="info-row">
        <span class="label">返回日期：</span>
        <span class="value">{{ $contact->endDate }}</span>
    </div>

    <div class="info-row">
        <span class="label">出行人数：</span>
        <span class="value">{{ $contact->number_of_people }} 人</span>
    </div>

    <div class="info-row">
        <span class="label">预算：</span>
        <span class="value">¥{{ number_format($contact->budget, 0, '.', ',') }} 人民币</span>
    </div>

    <div class="info-row">
        <span class="label">提交时间：</span>
        <span class="value">{{ $contact->created_at->format('Y-m-d H:i:s') }}</span>
    </div>
</div>

<div class="footer">
    <p>此邮件由 Rhine Custom 网站自动发送</p>
    <p>© {{ date('Y') }} Rhine Custom. All rights reserved.</p>
</div>
</body>
</html>
