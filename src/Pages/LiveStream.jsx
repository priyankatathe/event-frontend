import React from "react";
import { FaUsers, FaCalendarAlt, FaClock } from "react-icons/fa";

const LiveStream = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-black text-white">
                <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-8">
                    {/* Video Player */}
                    <div className="flex-1">
                        <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg">
                            <iframe
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                                title="Live Stream"
                                frameBorder="0"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                    {/* Sidebar (Upcoming Events) */}
                    <div className="w-full md:w-80 bg-gray-900 text-white rounded-lg shadow-lg p-5">
                        <h2 className="text-xl font-bold mb-4">Upcoming Streams</h2>
                        <ul className="space-y-4">
                            <li className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 cursor-pointer">
                                🎤 Rock Night - 20 Sept 8PM
                            </li>
                            <li className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 cursor-pointer">
                                🎶 Jazz Evening - 22 Sept 7PM
                            </li>
                            <li className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 cursor-pointer">
                                🎸 Indie Fest - 25 Sept 9PM
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Event Info */}
            <section className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-2">
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">
                        Live Music Festival 2025
                    </h1>
                    <p className="text-gray-700 mb-6">
                        Join us for an unforgettable night of live music, featuring top
                        artists and immersive performances streamed directly to you. Enjoy
                        the beats, connect with fans, and feel the energy of the festival.
                    </p>
                    <div className="flex items-center space-x-6 text-gray-600">
                        <div className="flex items-center space-x-2">
                            <FaCalendarAlt className="text-purple-600" />
                            <span>18 Sept 2025</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaClock className="text-blue-600" />
                            <span>8:00 PM</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaUsers className="text-green-600" />
                            <span>2.5k Watching</span>
                        </div>
                    </div>
                </div>

                {/* Chat Box */}
                <div className="bg-white rounded-lg shadow-md p-5 h-[400px] flex flex-col">
                    <h2 className="text-lg font-bold mb-3">Live Chat</h2>
                    <div className="flex-1 overflow-y-auto space-y-3 text-sm text-gray-800 border-b pb-3">
                        <p><span className="font-bold text-purple-600">Alex:</span> This stream is fire 🔥</p>
                        <p><span className="font-bold text-blue-600">Mia:</span> Love this song ❤️</p>
                        <p><span className="font-bold text-green-600">John:</span> Greetings from NYC!</p>
                    </div>
                    <div className="mt-3 flex">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="flex-1 px-3 py-2 border rounded-l-md focus:outline-none"
                        />
                        <button className="bg-purple-600 text-white px-4 rounded-r-md hover:bg-purple-700">
                            Send
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LiveStream;
