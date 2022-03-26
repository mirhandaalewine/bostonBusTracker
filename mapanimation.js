mapboxgl.accessToken = 'pk.eyJ1IjoibWlyaGFuZGFhbGV3aW5lIiwiYSI6ImNsMG1vMHhlcDB3bzgza28zeDFuY3h2MjcifQ.1wVfPTJA841rtUA4gd1yww';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mirhandaalewine/cl13vctfx000l14lnhsehl0gy',
  center: [-71.0942, 42.3601],
  zoom: 14
});

const busMarkers = {};

async function run(){
    // get bus data    
	const locations = await getBusLocations();
	console.log(new Date());
	console.log(locations);

	locations.forEach((bus) => {
		if (busMarkers[bus.id]) {
			busMarkers[bus.id].setLngLat([bus.attributes.longitude, bus.attributes.latitude]);
		} else {
			busMarkers[bus.id] = new mapboxgl.Marker().setLngLat([bus.attributes.longitude, bus.attributes.latitude]).addTo(map);
		}
	})

	// timer
	setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}

run();
