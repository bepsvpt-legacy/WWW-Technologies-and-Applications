<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Post::with(['comments', 'likes'])
            ->whereNotNull('content')
            ->latest()
            ->paginate(5);

        return view('posts.index', compact('posts'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('posts.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, ['image' => 'required|image|max:85']);

        $post = Post::create([
            'user_id' => $request->user()->getKey(),
            'image' => file_get_contents($request->file('image')->path()),
            'mime_type' => $request->file('image')->getMimeType(),
        ]);

        return redirect()->route('posts.edit', ['post' => $post->getKey()]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     *
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $post = Post::findOrFail($id);

        return view('posts.edit', compact('post'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, ['content' => 'required|string|max:255']);

        Post::findOrFail($id)->update($request->only(['content']));

        return redirect()->route('posts.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Request $request
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $post = Post::where('user_id', $request->user()->getKey())
            ->findOrFail($id);

        $post->comments()->delete();

        $post->likes()->delete();

        if ($post->delete()) {
            flash()->success('刪除成功')->important();
        }

        return redirect()->route('posts.index');
    }
}
