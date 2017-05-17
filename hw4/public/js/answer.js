const map = (() => {
  const map = new ol.Map({
    target: 'mapa',
    controls: ol.control.defaults().extend([
      new ol.control.ScaleLine(),
      new ol.control.ZoomSlider()
    ]),
    renderer: 'canvas',
    layers: [new ol.layer.Tile({ source: new ol.source.OSM() })],
    view: new ol.View({
      center: ol.proj.transform([121.0001, 23.5], 'EPSG:4326', 'EPSG:3857'),
      zoom: 8
    })
  });

  map.addLayer(new ol.layer.Vector({
    source: new ol.source.Vector()
  }))

  return map
})()

let check_clearMap = -1
let trainstationSourcef = null
let trainstationSource = null
let markerSource = new ol.source.Vector({})

// listen for click event
map.on('click', function(evt) {
  const range = parseInt(document.querySelector('#range').value) || 0

  if (range < 1 || range > 10) {
    return $('#invalid-range').modal('show')
  }

  if (check_clearMap >= 0) {
    markerSource.clear()
  }

  let [lng, lat] = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326')

  markerSource.addFeature(new ol.Feature({
    name: "icon",
    geometry: new ol.geom.Point(ol.proj.transform([lng, lat], 'EPSG:4326', 'EPSG:3857')),
  }))

  map.addLayer(new ol.layer.Vector({
    source: markerSource,
    style: new ol.style.Style({
      image: new ol.style.Icon(({
        scale: 0.4,
        anchor: [0.5, 1],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        src: 'icon/allow.png'
      })),
    })
  }))

  queryTrainStation(lat, lng, range)
})

function showTrainStationPoint(trainstation) {
  trainstationSourcef = new ol.source.Vector({
    features: (new ol.format.GeoJSON()).readFeatures(trainstation, { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' })
  });

  trainstationSource = new ol.layer.Vector({ source: trainstationSourcef })

  map.addLayer(trainstationSource);
}

function showTable(data) {
  let table = data.landmarkna.features.map(station => {
    return `
<tr>
  <td class="text-center">${station.properties.landmarkna}</td>
  <td>${station.properties.address}</td>
  <td>${station.properties.distance}</td>
</tr>
    `
  })

  if (! table.length) {
    table = ['<tr><td class="text-center" colspan="3">範圍內無車站</td></tr>']
  }

  document.querySelector('#stations-body').innerHTML = table.join('')
}

function queryTrainStation(lat, lng, range){
  if (check_clearMap > 0) {
    trainstationSourcef.clear()

    map.removeLayer(trainstationSource)
  }

  const httpRequest = new XMLHttpRequest()

  httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status !== 200) {
        check_clearMap = 0
      } else {
        check_clearMap = 1

        const data = JSON.parse(httpRequest.responseText)

        showTrainStationPoint(data.landmarkna)
        showTable(data)
      }
    }
  }
  httpRequest.open('POST', 'result.php')
  httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  httpRequest.send(`lat=${lat}&lng=${lng}&range=${range}`)
}
