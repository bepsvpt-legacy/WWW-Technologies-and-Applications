<?php

namespace App\Http\Controllers;

use App\Comment;
use App\Post;
use Illuminate\Http\Request;

class CommentController extends Controller
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
        $this->validate($request, ['content' => 'required|string|max:255']);

        Post::findOrFail($id)->comments()->save(new Comment([
            'user_id' => $request->user()->getKey(),
            'content' => $request->input('content'),
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
        $success = Comment::where('post_id', $postId)
            ->where('user_id', $request->user()->getKey())
            ->where('id', $id)
            ->delete();

        if ($success) {
            flash()->success('刪除成功')->important();
        }

        return redirect()->route('posts.index');
    }
}
