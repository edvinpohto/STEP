import LikeButtonSignedIn from '../components/LikeButtonSignedIn'

export default function EventCard() {
	return(
	<div className='grid grid-cols-1 place-content-center place-items-center'>

		<div className="m-3 w-11/12 sm:w-80">
			<div className="rounded-sm shadow-lg h-32 mb-6 w-full hover:shadow-xl">
				{/* <!-- media container --> */}
				<div className="relative bg-none float-left h-full w-1/4">
						<img 
						src="https://source.unsplash.com/random/" 
						alt="img" 
						className="bg-center bg-cover h-full"/>
				</div>

				{/* <!-- body container --> */}
				<div className="relative bg-white float-left h-full px-3 w-3/5">
					<div className="block">
						<span className="text-slate-500 text-xs">Mon, APR 09, 7:00 PM</span>
					</div>
					<span className="block mt-1 text-sm">This Thing Called Life: A Celebration of Prince and His Legacy at MEZZANINE SF</span>
					<div className="absolute bottom-2 opacity-100 pr-1 w-full text-xs">
						<span className="inline-block">St Andrews, UK</span>
						<span className="inline-block float-right">Free &ndash; $30</span>
					</div>
				</div>
			</div>
		</div>
		




		<div className='grid grid-cols-1 place-content-center place-items-center p-5'>
			<div  
			className='border-none rounded-md bg-slate-300 m-2 max-w-sm shadow-md'>
				<div>
					{/* Real src needs to be a submitted image address */}
					<img src="https://source.unsplash.com/random/400x100" alt="image" className='rounded-t-md' width={400} height={100} />
				</div>
  
				<LikeButtonSignedIn />
  
				<div className='p-2.5'>
					<p className='text-lg'>Event Card</p>
					<p className='text-sm'>Date: 2022-07-09</p>
					<p className='text-sm'>Location: St Andrews School of Music</p>
					<p className='text-sm'>Organised by Erik Pohto</p>
				</div>
			</div>
		</div>
	</div>
	)
}