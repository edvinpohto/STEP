import * as React from 'react';
import Map, { Marker } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

export default function Mapbox() {
	const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN

  return <Map
	initialViewState={{
		latitude: 56.33950660627565,
		longitude: -2.794454438733709,
		zoom: 12
	}}
		style={{width: '100vw', height: '100vh'}}
		mapStyle="mapbox://styles/mapbox/streets-v9"
		mapboxAccessToken={MAPBOX_TOKEN}
	>
		{/* <Marker longitude={-122.4} latitude={37.8} color="red" /> */}
</Map>
}