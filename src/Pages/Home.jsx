import React from 'react'
import UpcomingEvents from './UpcomingEvents'
import BookNow from './BookNow'
import Footer from './Footer'

const Home = () => {
    return <>
        <div className="min-h-screen bg-black text-white flex flex-col">

            <main className="flex flex-col items-center justify-center text-center px-6 mt-10">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight ">
                    LET'S JOIN CONCERT OF THE <br /> BIGGEST BAND{" "}
                    <span className="text-purple-400">IN THE WORLD</span>
                </h2>

                <p className="mt-6 text-gray-300 max-w-2xl text-sm md:text-base">
                    The latest concert ticket ordering platform that is easy to reach, fast, and at low prices.
                    Find your favorite band, order tickets now
                </p>

                {/* ✅ Responsive Grid */}
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-5xl">
                    <img
                        src="https://i.pinimg.com/474x/b8/5a/24/b85a248a5515e81cb9965b1b7b460ffc.jpg"
                        alt="band member"
                        className="object-cover w-full h-72 rounded-md mt-10"
                    />
                    <img
                        src="https://people.com/thmb/anMUQz4nphkCOcyGyCI_utMeAPs=/4000x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(749x0:751x2)/bts-members-v-1-42f669c62fb940d3a464a639268191e3.jpg"
                        alt="band member"
                        className="object-cover w-full h-72 rounded-md mt-2"
                    />
                    <img
                        src="https://w0.peakpx.com/wallpaper/24/495/HD-wallpaper-bts-members-phone-park-jimin-hand-pose-bts-south-korean-singer.jpg"
                        alt="band member"
                        className="object-cover w-full h-72 rounded-md mt-10"
                    />
                    <img
                        src="https://w0.peakpx.com/wallpaper/957/153/HD-wallpaper-bts-suga-cute-bts-member-bangtan-boy-kpop-korean-singer.jpg"
                        alt="band member"
                        className="object-cover w-full h-72 rounded-md mt-4"
                    />
                    <img
                        src="https://i.pinimg.com/736x/99/d8/94/99d894f57eb93454c1213a578dd277e8.jpg"
                        alt="band member"
                        className="object-cover w-full h-72 rounded-md mt-10"
                    />
                </div>
            </main>

            <div>
                <UpcomingEvents />
            </div>
            <div>
                <BookNow />
            </div>

        </div>
    </>
}

export default Home
