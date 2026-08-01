<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = [
        'name',
        'room_id',
        'start_date',
        'end_date',
        'date_of_arrival',
        
    ];
}
