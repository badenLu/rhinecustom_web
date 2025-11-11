<?php

namespace App\Http\Controllers;

use App\Models\TravelRoute;
use Illuminate\Http\Request;

class RouteController extends Controller
{
    public function index() {
        $routes = TravelRoute::all();
        return response()->json($routes);
    }

    public function show($id) {
        $route = TravelRoute::findOrFail($id);
        return response()->json($route);
    }
}
