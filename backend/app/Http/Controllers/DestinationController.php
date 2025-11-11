<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Destination;

class DestinationController extends Controller
{
    public function index()
    {
        $destinations = Destination::all()->map(function ($destination) {
            $destination->image = url("images/" . $destination->image); 
            return $destination;
        });

        return response()->json($destinations);
    }

    public function show($id) {
        $destination = Destination::findOrFail($id);
        $destination->image = url("images/" . $destination->image); 
        return response()->json($destination);
    }
}
