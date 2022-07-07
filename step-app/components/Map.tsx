import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect, useRef } from "react";

export default function Component() {
    const mapContainer = useRef<any>(null);

	useEffect(() => {
		const mapContainer = useRef<any>(null);
		const map = useRef<mapboxgl.Map | any>(null);
	
		mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN ?? '';
	
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/light-v10',
			center: [15.4542, 18.7322], // center map on Chad
			zoom: 1.8
		})
	})
  
    return (
        <>
            <div className="mapContainer"></div>
        </>
    )
}