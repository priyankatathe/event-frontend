import React from 'react'
import { FaCreditCard, FaSearch, FaTicketAlt } from 'react-icons/fa';
import Footer from './Footer';

const BookNow = () => {
    return <>

        <div className="mt-10 max-w-7xl mx-auto mb-10 px-9 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">

                {/* Left Content */}
                <div>
                    {/* Heading */}
                    <p className="text-pink-500 font-semibold">BOOK NOW</p>
                    <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-8">
                        How to Buy Tickets
                    </h2>

                    {/* Step 1 */}
                    <div className="flex items-start space-x-4 mb-6">
                        <div className="w-12 h-12 flex items-center justify-center bg-pink-600 text-white rounded-xl">
                            <FaSearch size={22} />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Search Your Favourite Event</h3>
                            <p className="text-gray-400 text-sm mt-1">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, tortor tempus.
                            </p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex items-start space-x-4 mb-6">
                        <div className="w-12 h-12 flex items-center justify-center bg-pink-600 text-white rounded-xl">
                            <FaTicketAlt size={22} />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Book the Tickets</h3>
                            <p className="text-gray-400 text-sm mt-1">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, tortor tempus.
                            </p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 flex items-center justify-center bg-pink-600 text-white rounded-xl">
                            <FaCreditCard size={22} />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Complete Payment</h3>
                            <p className="text-gray-400 text-sm mt-1">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, tortor tempus.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Image */}
                <div className="flex justify-center">
                    <img
                        src="https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_1280.jpg"
                        className="w-full max-w-lg rounded-2xl"
                        alt="event"
                    />
                </div>
            </div>
        </div>

    </>
}

export default BookNow