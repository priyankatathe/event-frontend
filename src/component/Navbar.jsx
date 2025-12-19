import React, { useState } from "react"
import { FiMenu, FiX } from "react-icons/fi"
import { Link } from "react-router-dom"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="bg-black text-white">
            <header className="flex justify-between items-center px-4 md:px-12 py-4">
                {/* Logo */}
                <Link to="/" className="text-white font-bold text-lg">MOSHING.</Link>

                {/* Desktop Nav Links */}
                <nav className="hidden md:flex gap-6 text-sm font-medium">
                    <Link to="/live-stream" href="#" className="hover:text-purple-400">
                        Live Streams
                    </Link>
                    <Link to="/events" className="hover:text-purple-400">
                        Event
                    </Link>
                    <Link to="/about-event" href="#" className="hover:text-purple-400">
                        AboutEvents
                    </Link>
                    <Link to="/contacts" href="#" className="hover:text-purple-400">
                        Contacts
                    </Link>
                </nav>

                {/* Desktop Button */}
                <div className="hidden md:flex">
                    <Link to="/customer-login" className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-lg text-sm font-semibold">
                        Sign up
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden flex items-center"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
                </button>
            </header>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden flex flex-col items-center gap-4 pb-6">
                    <Link to="/live-stream"
                        href="#"
                        className="hover:text-purple-400"
                        onClick={() => setIsOpen(false)}
                    >
                        Live Streams
                    </Link>
                    <Link
                        to="/events"
                        className="hover:text-purple-400"
                        onClick={() => setIsOpen(false)}
                    >
                        Event
                    </Link>
                    <Link to="/about-event"
                        href="#"
                        className="hover:text-purple-400"
                        onClick={() => setIsOpen(false)}
                    >
                        AboutEvents
                    </Link>
                    <Link to="/contacts"
                        href="#"
                        className="hover:text-purple-400"
                        onClick={() => setIsOpen(false)}
                    >
                        Contacts
                    </Link>
                    <Link to="/customer-login"
                        onClick={() => setIsOpen(false)}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-lg text-sm font-semibold"
                    >
                        Sign up
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Navbar
