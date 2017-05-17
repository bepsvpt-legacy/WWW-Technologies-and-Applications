<?php

require_once __DIR__.'/../vendor/autoload.php';

use Dotenv\Dotenv;
use Illuminate\Database\Capsule\Manager as Capsule;
use Illuminate\Database\Schema\Blueprint;

(new Dotenv(__DIR__.'/../'))->load();

$capsule = new Capsule;

$capsule->addConnection([
    'driver'    => 'mysql',
    'host'      => 'localhost',
    'database'  => getenv('DB_DATABASE'),
    'username'  => getenv('DB_USERNAME'),
    'password'  => getenv('DB_PASSWORD'),
    'charset'   => 'utf8mb4',
    'collation' => 'utf8mb4_unicode_ci',
    'prefix'    => '',
]);

$capsule->setAsGlobal();

if (! Capsule::schema()->hasTable('train_stations')) {
    // create table
    Capsule::schema()->create('train_stations', function (Blueprint $table) {
        $table->increments('id');
        $table->double('lng');
        $table->double('lat');
        $table->string('landmarkid', 16);
        $table->string('landmarkco', 5);
        $table->string('landmarkna', 16);
        $table->string('landmarkad', 12);
        $table->string('address', 48);
    });

    // insert data
    $fp = fopen(__DIR__.'/../trainstation.csv', 'r');

    fgets($fp);

    while ($line = fgets($fp)) {
        $data = array_combine(
            ['lng', 'lat', 'landmarkid', 'landmarkco', 'landmarkna', 'landmarkad', 'address'],
            explode(',', str_replace(PHP_EOL, '', $line))
        );

        $data['landmarkid'] = doubleval($data['landmarkid']);

        Capsule::table('train_stations')->insert($data);
    }
}

$lat = floatval($_REQUEST['lat']);
$lng = floatval($_REQUEST['lng']);
$range = intval($_REQUEST['range'], 10);

if ($range < 1 || $range > 10) {
    $range = 5;
}

$data = Capsule::table('train_stations')
    ->selectRaw('`landmarkna`, `lat`, `lng`, `address`, (6371 * acos(cos(radians(?)) * cos(radians(`lat`)) * cos(radians(`lng`) - radians(?)) + sin(radians(?)) * sin(radians(`lat`)))) AS `distance`', [
        $lat, $lng, $lat,
    ])
    ->having('distance', '<=', $range)
    ->orderBy('distance')
    ->limit(10)
    ->get();

$result = [
    'length' => count($data),
    'landmarkna' => [
        'type' => 'FeatureCollection',
        'features' => array_map(function ($station) {
            return [
                'type' => 'Feature',
                'properties' => [
                    'landmarkna' => $station['landmarkna'],
                    'address' => $station['address'],
                    'distance' => $station['distance'],
                ],
                'geometry' => [
                    'type' => 'Point',
                    'coordinates' => [$station['lng'], $station['lat']],
                ],
            ];
        }, $data),
    ],
];

echo json_encode($result);
