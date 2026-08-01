<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('dashboard', ['reservation' => Reservation::query()->latest()->get()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    // public function create()
    // {
    //     //
    // }

    // /**
    //  * Store a newly created resource in storage.
    //  */
    public function store(Request $request)
    {
        $data=$request->validate([
            'name' => 'required|string|max:255',
            'room_id' => 'required|integer',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
        ]);

        Reservation::create($data);
        return redirect()->route('dashboard');
    }

    /**
     * Display the specified resource.
     */
    // public function show(Reservation $reservation)
    // {
    //     //
    // }

    // /**
    //  * Show the form for editing the specified resource.
    //  */
    // public function edit(Reservation $reservation)
    // {
    //     //
    // }

    // /**
    //  * Update the specified resource in storage.
    //  */
    public function update(Request $request, Reservation $reservation)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'room_id' => 'required|integer',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'status' => 'required|string|in:pending,confirmed,cancelled',
        ]);

        $reservation->update($data);
        return redirect()->route('dashboard');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reservation $reservation)
    {
        $reservation->delete();
        return redirect()->route('dashboard');
    }
}
