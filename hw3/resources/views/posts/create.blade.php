@extends('layouts.app')

@section('content')
  <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <div class="panel panel-default">
          <div class="panel-heading">Post - Upload Image</div>
          <div class="panel-body">
            {!! Form::open(['route' => 'posts.store', 'method' => 'POST', 'files' => true, 'class' => 'form-horizontal']) !!}
              <div class="form-group{{ $errors->has('image') ? ' has-error' : '' }}">
                {!! Form::label('image', 'Image', ['class' => 'col-md-4 control-label']) !!}

                <div class="col-md-6">
                  {!! Form::file('image', ['required']) !!}

                  @if ($errors->has('image'))
                    <span class="help-block">
                      <strong>{{ $errors->first('image') }}</strong>
                    </span>
                  @endif
                </div>
              </div>

              <div class="form-group">
                <div class="col-md-8 col-md-offset-4">
                  <button type="submit" class="btn btn-primary">
                    Upload
                  </button>
                </div>
              </div>
            {!! Form::close() !!}
          </div>
        </div>
      </div>
    </div>
  </div>
@endsection
