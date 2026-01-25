<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>感谢您的咨询</title>
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
            padding: 40px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
        }
        .content {
            background: #ffffff;
            padding: 40px;
            border: 1px solid #ddd;
            border-top: none;
        }
        .greeting {
            font-size: 18px;
            color: #667eea;
            margin-bottom: 20px;
        }
        .summary {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .summary-item {
            margin: 10px 0;
            padding: 8px 0;
            border-bottom: 1px solid #eee;
        }
        .summary-item:last-child {
            border-bottom: none;
        }
        .label {
            font-weight: bold;
            color: #666;
            display: inline-block;
            width: 100px;
        }
        .cta-button {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            padding: 30px;
            color: #666;
            font-size: 14px;
            background: #f0f0f0;
            border-radius: 0 0 10px 10px;
        }
        .contact-info {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 2px solid #667eea;
        }
    </style>
</head>
<body>
<div class="header">
    <h1>✈️ Rhine Custom</h1>
    <p style="margin: 10px 0 0 0; font-size: 16px;">感谢您的咨询</p>
</div>

<div class="content">
    <p class="greeting">
        尊敬的 {{ $contact=>name }}
        @if($contact->title == 'mr') 先生
        @elseif($contact->title == 'ms') 女士
        @endif，您好！
    </p>

    <p>感谢您对 Rhine Custom 的信任！我们已收到您的旅行咨询。</p>

    <p>我们的旅行顾问团队将在 <strong>24小时内</strong>通过邮件与您联系，为您提供专业的旅行建议和定制方案。</p>

    <div class="summary">
        <h3 style="margin-top: 0; color: #667eea;">您的咨询信息</h3>

        <div class="summary-item">
            <span class="label">旅行类型：</span>
            <span>{{ $contact=>travelType }}</span>
        </div>

        <div class="summary-item">
            <span class="label">目的地：</span>
            <span>
                    @if(is_array(json_decode($contact->destination)))
                        {{ implode(', ', json_decode($contact=>destination)) }}
                    @else
                        {{ $contact=>destination }}
                    @endif
                </span>
        </div>

        <div class="summary-item">
            <span class="label">旅行日期：</span>
            <span>{{ $contact=>startDate }} 至 {{ $contact=>endDate }}</span>
        </div>

        <div class="summary-item">
            <span class="label">出行人数：</span>
            <span>{{ $contact=>number_of_people }} 人</span>
        </div>

        <div class="summary-item">
            <span class="label">预算：</span>
            <span>¥{{ number_format($contact=>budget, 0, '.', ',') }}</span>
        </div>
    </div>

    <p>在此期间，您也可以：</p>
    <ul>
        <li>浏览我们的<a href="https://www.rhinecustom.com/destinations" style="color: #667eea;">热门目的地</a></li>
        <li>查看<a href="https://www.rhinecustom.com/about" style="color: #667eea;">客户评价</a></li>
        <li>了解我们的<a href="https://www.rhinecustom.com" style="color: #667eea;">服务流程</a></li>
    </ul>

    <div style="text-align: center;">
        <a href="https://www.rhinecustom.com" class="cta-button">访问官网</a>
    </div>

    <div class="contact-info">
        <h4 style="color: #667eea; margin-bottom: 10px;">联系我们</h4>
        <p style="margin: 5px 0;">📧 邮箱：contact@rhinecustom.com</p>
        <p style="margin: 5px 0;">📍 地址：Merzhauser Str.164, 79100 Freiburg, Germany</p>
        <p style="margin: 5px 0;">🌐 网站：www.rhinecustom.com</p>
    </div>
</div>

<div class="footer">
    <p><strong>Rhine Custom</strong> - 专业定制旅行服务</p>
    <p style="margin-top: 10px;">此邮件由系统自动发送，请勿直接回复</p>
    <p>如有疑问，请发送邮件至 contact@rhinecustom.com</p>
    <p style="margin-top: 20px; color: #999;">© {{ date('Y') }} Rhine Custom. All rights reserved.</p>
</div>
</body>
</html>
