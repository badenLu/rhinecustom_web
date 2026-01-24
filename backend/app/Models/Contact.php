<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    protected $table = 'contacts';
    // 如果你的表名是 contacts (符合Laravel默认规则) 则可不写这一行

    protected $fillable = [
        'title',
        'name',
        'email',
        'travelType',
        'destination',
        'startDate',
        'endDate',
        'number_of_people',
        'budget'
    ];

    protected $casts = [
        'destination' => 'array',
        'startDate' => 'date',
        'endDate' => 'date',
    ];
}
