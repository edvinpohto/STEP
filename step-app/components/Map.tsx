// import * as React from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Event } from '../types/models'
import { useEffect, useState } from 'react';

const locations = [
	{ eventName: "test1",
		lat: 56.3297648,
		lng: -2.7954401,
		_id: "62cd879aacf5dd9c5047cdad"
	}, 
	{ eventName: "test2",
		lat: 56.340226,
		lng: -2.7920074,
		_id: "62cd87bcacf5dd9c5047cdae"
	}
]

// export default function Mapbox(property: { lat: number | undefined; lng: number | undefined; _id: React.Key | null | undefined; }) {
export default function Mapbox() {
	const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN

	const [data, setData] = useState<any[]>([])
  const [isLoading, setLoading] = useState(false)

	useEffect(() => {
    setLoading(true)
    fetch('/api/test')
      .then((res) => res.json())
      .then((data) => {
        setData(data.events)
        setLoading(false)
      })
  }, [])

  return (
		<div>
			<Map
				initialViewState={{
					latitude: 56.33950660627565,
					longitude: -2.794454438733709,
					zoom: 12
				}}
					style={{width: '100vw', height: '100vh'}}
					mapStyle="mapbox://styles/mapbox/streets-v9"
					mapboxAccessToken={MAPBOX_TOKEN}
					// cursor="pointer"
				>

				{/* <GeocoderControl mapboxAccessToken={MAPBOX_TOKEN} position="top-left" /> */}
				{/* <Marker longitude={-2.794454438733709} latitude={56.33950660627565} color="red" /> */}

				{data && data.map((data: any) => (
          <div 
						key={data._id} 
						className='w-full'>
						<Marker 
							longitude={data.eventLocation[1].lng} 
							latitude={data.eventLocation[1].lat} 
							color="red"
							onClick={e => {
								// If we let the click event propagates to the map, it will immediately close the popup
								// with `closeOnClick: true`
								console.log(`${data._id}`)
							}}
						/>
          </div>
        ))}
			</Map>
		</div>
	)
}

