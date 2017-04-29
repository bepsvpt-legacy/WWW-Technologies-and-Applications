@extends('layouts.app')

@section('content')
  <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <div class="panel panel-default">
          <div class="panel-heading">Post - Add Content</div>
          <div class="panel-body">
            <div>
              <img
                src="data:{{ $post->mime_type }};base64,{{ base64_encode($post->image) }}"
                width="100%"
                class="center-block img-rounded"
              >
            </div>

            <hr>

            {!! Form::model($post, ['route' => ['posts.update', $post->getKey()], 'method' => 'PATCH', 'class' => 'form-horizontal']) !!}
              <div class="form-group{{ $errors->has('content') ? ' has-error' : '' }}">
                {!! Form::label('content', 'content', ['class' => 'col-md-4 control-label']) !!}

                <div class="col-md-6">
                  {!! Form::textarea('content', null, ['class' => 'form-control', 'style' => 'resize: none;', 'rows' => 5, 'maxlength' => 255, 'required']) !!}

                  @if ($errors->has('content'))
                    <span class="help-block">
                        <strong>{{ $errors->first('content') }}</strong>
                      </span>
                  @endif
                </div>
              </div>

              <div class="form-group">
                <div class="col-md-8 col-md-offset-4">
                  <button type="submit" class="btn btn-primary">
                    Post
                  </button>

                  <button type="submit" form="delete-form" class="btn btn-danger">
                    Cancel
                  </button>
                </div>
              </div>
            {!! Form::close() !!}

            {!! Form::open(['id' => 'delete-form', 'route' => ['posts.destroy', $post->getKey()], 'method' => 'DELETE', 'class' => 'form-inline']) !!}
            {!! Form::close() !!}
          </div>
        </div>
      </div>
    </div>
  </div>
@endsection
