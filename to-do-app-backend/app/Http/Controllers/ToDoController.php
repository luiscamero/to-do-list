<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\ToDo;
use App\Models\User;

class ToDoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = Auth::user();

        return response()->json([
            'tasks' => $user->toDo()->get(),
            'success' => true
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'description' => 'required',
        ]);

        $toDo = new ToDo();
        $toDo->description = $validated['description'];
        $toDo->user_id = Auth::id();
        $toDo->save();

        return response()->json([
          'success' => true,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'checked' => 'required',
        ]);

        $toDo = ToDo::find($id);
        if (!$toDo) {
            return response('Id not found', 404);
        }
        $toDo->checked = $validated['checked'];
        $toDo->save();

        return response()->json([
            'success' => true,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $toDo = ToDo::find($id);
        if (!$toDo) {
            return response('Id not found', 404);
        }
        $toDo->delete();

        return response()->json([
            'success' => true,
        ]);
    }
}
