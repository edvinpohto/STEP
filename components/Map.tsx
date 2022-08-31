// Component implementing the Mapbox map.
// Help for individual popups https://stackoverflow.com/questions/60997591/mapbox-marker-popups-wont-open-close-individually

import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useState } from 'react';
import formatDateAndTime from '../utils/formatDateAndTime';
import formatLocation from '../utils/formatLocation';
import Link from 'next/link';

export default function Mapbox() {
	const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN

	// states for the map
	const [data, setData] = useState<any[]>([])
  const [isLoading, setLoading] = useState(false)
	const [showPopup, setShowPopup] = useState<any>({})

	// gets events
	useEffect(() => {
    setLoading(true)
    fetch('/api/events')
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
				>

				{data && data.map((data: any) => (
          <div 
						key={data._id} 
						className='w-full'
						id='marker'>
						<Marker
							longitude={data.eventLocation[1].lng} 
							latitude={data.eventLocation[1].lat} 
							color="red"
							onClick={() =>
                setShowPopup({
                  ...showPopup,
                  [data._id]: true
                })
              }
						/>

						{showPopup[data._id] && (
							<Popup 
								className='w-full p-0'
								key={data._id} 
								closeOnClick={false} 
								longitude={data.eventLocation[1].lng} 
								latitude={data.eventLocation[1].lat}
								anchor="bottom"
								offset={[0, 150]}
								onClose={() =>
									setShowPopup({
										...showPopup,
										[data._id]: false
									})
								}>

								{/* This is the popup card */}
								<div className="grid">
									<div className="flex h-28 w-full">
										{/* <!-- body container --> */}
										<div className="relative grow bg-white float-left h-full px-3">
											{/* Text */}
											<div className="block pt-1">
												{/* <span className="text-slate-500 text-xs">Mon, APR 09, 7:00 PM</span> */}
												<span className="text-slate-500 text-xs">{formatDateAndTime(data.eventDate)}</span>
											</div>
											<span className="block mt-2 text-sm mr-4">{data.eventName}</span>
											<span className="block text-xs">Organiser: {data.eventOrganiser}</span>
											<div className="absolute bottom-0 opacity-100 pr-1 w-full text-xs">
												{/* <span className="inline-block">{property.eventLocation}</span> */}
												<span className="inline-block">{formatLocation(data.eventLocation[0])}</span>
												<Link href={`/events/${data._id}`}>
													<button 
														className="inline-block float-right mr-5 text-indigo-700"
														id="goToEvent">
														Go to event
													</button>
												</Link>
											</div>
										</div>
									</div>
								</div>
							</Popup>)}
          </div>
        ))}
			</Map>
		</div>
	)
}