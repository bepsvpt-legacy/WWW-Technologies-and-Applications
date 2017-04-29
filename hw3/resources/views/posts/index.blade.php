@extends('layouts.app')

@section('content')
  <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2 text-right">
        <a href="{{ route('posts.create') }}">
          <button type="button" class="btn btn-success">新增動態</button>
        </a>

        <hr>

        @if($posts->isEmpty())
          <div class="alert alert-info text-center" role="alert">尚無動態</div>
        @endif
      </div>

      @foreach($posts as $post)
        <div class="col-md-8 col-md-offset-2">
          <div class="panel panel-default">
            <div class="panel-heading">
              <img
                src="data:{{ $post->mime_type }};base64,{{ base64_encode($post->image) }}"
                width="100%"
                class="img-rounded"
              >
            </div>

            <div class="panel-body">
              <div class="panel panel-info">
                <!-- Default panel contents -->
                <div class="panel-heading">
                  @if(Auth::check() && Auth::user()->getKey() == $post->user_id)
                    {!! Form::open(['route' => ['posts.destroy', $post->getKey()], 'method' => 'DELETE', 'class' => 'pull-right']) !!}
                      <i class="fa fa-trash text-danger cursor-pointer" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="刪除"></i>
                    {!! Form::close() !!}
                  @endif

                  <h4>{{ $post->user->username }}</h4>

                  <p style="white-space: pre-line;">{{ $post->content }}</p>

                  <hr style="margin: 1rem 0;">

                  <div>
                    <span>
                      @if(Auth::check())
                        @php($like = $post->likes()->where('user_id', Auth::user()->getKey())->first())

                        @if(is_null($like))
                          {!! Form::open(['route' => ['posts.likes.store', $post->getKey()], 'method' => 'POST', 'class' => 'inline-block']) !!}
                            <i class="fa fa-heart cursor-pointer" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Like"></i>
                          {!! Form::close() !!}
                        @else
                          {!! Form::open(['route' => ['posts.likes.destroy', $post->getKey(), $like->getKey()], 'method' => 'DELETE', 'class' => 'inline-block']) !!}
                            <i class="fa fa-heart cursor-pointer text-danger" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Unlike"></i>
                          {!! Form::close() !!}
                        @endif
                      @endif

                      <span>{{ $post->likes->count() }} likes</span>
                    </span>

                    <span class="pull-right">{{ $post->created_at->diffForHumans() }}</span>
                  </div>
                </div>

                <ul class="list-group">
                  @foreach($post->comments as $comment)
                    <li class="list-group-item">
                      <div class="row">
                        <div class="col-sm-2">
                          <b style="word-break: break-all;">{{ $comment->user->username }}</b>
                        </div>

                        <div class="col-sm-7" style="word-break: break-all;">
                          <span>{{ $comment->content }}</span>
                        </div>

                        <div class="col-sm-3 text-right">
                          <span class="inline-block">{{ $comment->created_at->diffForHumans() }}</span>

                          @if(Auth::check() && Auth::user()->getKey() == $comment->user_id)
                            {!! Form::open(['route' => ['posts.comments.destroy', $post->getKey(), $comment->getKey()], 'method' => 'DELETE', 'class' => 'inline-block']) !!}
                              <i class="fa fa-trash text-danger cursor-pointer" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="刪除"></i>
                            {!! Form::close() !!}
                          @endif
                        </div>
                      </div>
                    </li>
                  @endforeach

                  <li class="list-group-item">
                    {!! Form::open(['route' => ['posts.comments.store', $post->getKey()], 'method' => 'POST']) !!}
                      <div class="form-group{{ $errors->has('content') ? ' has-error' : '' }}">
                        {!! Form::text('content', null, ['class' => 'form-control', 'placeholder' => '留言', 'maxlength' => 255, 'required']) !!}

                        @if ($errors->has('content'))
                          <span class="help-block">
                            <strong>{{ $errors->first('content') }}</strong>
                          </span>
                        @endif
                      </div>

                      <div class="text-right">
                        <button type="submit" class="btn btn-primary">
                          送出
                        </button>
                      </div>
                    {!! Form::close() !!}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      @endforeach

      <div class="col-md-8 col-md-offset-2 text-center">
        {{ $posts->render() }}
      </div>
    </div>
  </div>
@endsection

@push('scripts')
  <script>
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()

      $(document).on('click', 'i.fa-trash, i.fa-heart', function () {
        $(this).closest('form').submit()
      })
    })
  </script>
@endpush
