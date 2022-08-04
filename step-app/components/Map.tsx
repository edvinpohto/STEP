// Help for individual popups https://stackoverflow.com/questions/60997591/mapbox-marker-popups-wont-open-close-individually

// import * as React from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Event } from '../types/models'
import { useEffect, useState } from 'react';
import formatDateAndTime from '../utils/formatDateAndTime';
import formatLocation from '../utils/formatLocation';
import Link from 'next/link';

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
	const [showPopup, setShowPopup] = useState<any>({})

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
					// cursor="pointer"
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
								// captureClick={true}
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