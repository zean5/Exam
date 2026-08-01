<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = [
        'name',
        'room_id',
        'start_time',
        'end_time',
        'status',
    ];
}
