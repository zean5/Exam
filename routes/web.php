<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::get('reservations', [\App\Http\Controllers\ReservationController::class, 'index'])->name('reservations.index');
    Route::post('reservations', [\App\Http\Controllers\ReservationController::class, 'store'])->name('reservations.store'); 
    Route::put('reservations/{reservation}', [\App\Http\Controllers\ReservationController::class, 'update'])->name('reservations.update');
    Route::delete('reservations/{reservation}', [\App\Http\Controllers\ReservationController::class, 'destroy'])->name('reservations.destroy');
});

require __DIR__.'/settings.php';
