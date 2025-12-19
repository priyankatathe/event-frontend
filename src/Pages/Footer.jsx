import React from "react"
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa"

const Footer = () => {
    return <div >
        <footer className="bg-black text-gray-400 py-10    ">
            {/* Container */}
            <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Left Section */}
                    <div>
                        <h2 className="text-xl font-bold">
                            <span className="text-white">LIVE </span>
                            <span className="text-purple-500">ENTERTAINMENT</span>
                        </h2>
                        <p className="mt-4 text-sm leading-6">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit eget
                            feugiat nunc dapibus platea risus dictumst elit. Tincidunt mattis id
                            accumsan dolor ullamcorper.
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-4 mt-6">
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center hover:bg-purple-700 transition"
                            >
                                <FaFacebookF className="text-white text-lg" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center hover:bg-purple-700 transition"
                            >
                                <FaTwitter className="text-white text-lg" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center hover:bg-purple-700 transition"
                            >
                                <FaLinkedinIn className="text-white text-lg" />
                            </a>
                        </div>
                    </div>

                    {/* Plan Events */}
                    <div>
                        <h3 className="text-white font-semibold mb-3">Plan Events</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-purple-400 transition">Create and Set Up</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition">Sell Tickets</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition">Online RSVP</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition">Online Events</a></li>
                        </ul>
                    </div>

                    {/* Outside Live */}
                    <div>
                        <h3 className="text-white font-semibold mb-3">Outside Live</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-purple-400 transition">About Us</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition">Press</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition">Contact Us</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition">Help Center</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition">How it Works</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition">Privacy</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition">Terms</a></li>
                        </ul>
                    </div>

                    {/* Stay In The Loop */}
                    <div>
                        <h3 className="text-white font-semibold mb-3">Stay In The Loop</h3>
                        <p className="text-sm mb-4">
                            Join our mailing list to stay in the loop with our newest Event
                            and concert updates.
                        </p>
                        <div className="relative w-full">
                            <input
                                type="email"
                                placeholder="Enter your email address.."
                                className="w-full px-4 py-3 pr-32 rounded-full text-black bg-white focus:ring-2 focus:ring-purple-500 outline-none"
                            />
                            <button className="absolute right-1 top-1 bottom-1 px-3 sm:px-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition text-white font-semibold text-xs sm:text-sm">
                                Subscribe Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-white">
                    © 2023 LIVE ENTERTAINMENT. All Rights Reserved.
                </div>
            </div>
        </footer>

    </div >
}

export default Footer
