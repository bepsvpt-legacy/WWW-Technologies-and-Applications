<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>WWW HW4</title>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://openlayers.org/en/v4.1.1/css/ol.css">
    <link rel="stylesheet" href="css/main.css">
  </head>
  <body class="container-fluid">
    <header>
      <h2>Train Station Query System</h2>

      <form class="form-inline" id="range-query" onsubmit="return false;">
        <div class="form-group">
          <label class="sr-only" for="range">Range</label>

          <div class="input-group">
            <div class="input-group-addon">範圍設定</div>

            <input
              type="number"
              class="form-control"
              style="width: 7rem;"
              id="range"
              placeholder="1 ~ 10"
              step="1"
              max="10"
              min="1"
              autofocus
              required
            >

            <div class="input-group-addon">公里</div>
          </div>
        </div>

        <button type="submit" class="btn btn-primary">設定</button>
      </form>
    </header>

    <main>
      <div id='mapa'></div>

      <div>
        <table class="table table-bordered table-hover" style="width: 95%; margin: 0 auto;">
          <thead>
            <tr>
              <th class="text-center">車站名稱</th>
              <th class="text-center">車站地址</th>
              <th class="text-center">距離(km)</th>
            </tr>
          </thead>

          <tbody id="stations-body"></tbody>
        </table>
      </div>
    </main>

    <div class="modal fade bs-example-modal-sm" id="invalid-range" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">範圍錯誤</h4>
          </div>
          <div class="modal-body">
            <p class="lead text-danger">請輸入正確的範圍</p>
          </div>
        </div>
      </div>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js" defer></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" defer></script>
    <script src="https://openlayers.org/en/v4.1.1/build/ol.js" defer></script>
    <script src="js/answer.js" defer></script>
  </body>
</html>
