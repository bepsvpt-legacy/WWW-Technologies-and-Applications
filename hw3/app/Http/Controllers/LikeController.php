<?php

namespace App\Http\Controllers;

use App\Likes;
use App\Post;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $id)
    {
        Post::findOrFail($id)->likes()->save(new Likes([
            'user_id' => $request->user()->getKey(),
        ]));

        return redirect()->route('posts.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Request $request
     * @param  int $postId
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $postId, $id)
    {
        Likes::where('post_id', $postId)
            ->where('user_id', $request->user()->getKey())
            ->where('id', $id)
            ->delete();

        return redirect()->route('posts.index');
    }
}
