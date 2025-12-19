import React, { useState } from 'react'
import { FaMapMarkerAlt } from "react-icons/fa"
import { IoTimeOutline } from "react-icons/io5"
import { Link } from 'react-router-dom'
import { useGetEventQuery } from '../redux/api/eventBookApi'

const UpcomingEvents = () => {
    const { data, isLoading, isError } = useGetEventQuery()
    const [showAll, setShowAll] = useState(false)

    if (isLoading) return <p className="text-center">Loading events...</p>
    if (isError) return <p className="text-center text-red-500">Failed to load events</p>

    //  Copy + sort events by date
    let events = [...(data?.result || [])].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    )

    //  Sirf aaj ke baad wale events (past events ignore)
    const upcomingEvents = events.filter(event => new Date(event.date) >= new Date())

    //  Show 6 events or all (based on state)
    const displayedEvents = showAll ? upcomingEvents : upcomingEvents.slice(0, 6)

    return <>
        <div className="mt-20 max-w-7xl mx-auto px-5">
            <h5 className="text-center text-fuchsia-500 mb-5">EXPLORE EVENTS</h5>
            <h1 className="text-3xl md:text-4xl font-bold text-center">Upcoming Events</h1>

            {/* Container */}
            <div className="mt-10 max-w-7xl mx-auto px-4">

                {/* Grid for events */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedEvents.map((event, index) => (
                        <div key={event._id || index} className="bg-[#111] border border-gray-700 rounded-xl overflow-hidden shadow-lg">
                            <div className="relative">
                                <img
                                    src={event.coverImage || "https://via.placeholder.com/400x250"}
                                    alt={event.title}
                                    className="w-full h-56 object-cover"
                                />
                                <div className="absolute top-3 left-3 bg-pink-600 text-white px-3 py-2 rounded-lg text-center">
                                    <p className="text-xs font-semibold">{new Date(event.date).getDate()}</p>
                                    <p className="text-[10px]">
                                        {new Date(event.date).toLocaleString("default", { month: "short" })}
                                    </p>
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="text-lg font-extrabold text-white uppercase mb-3">
                                    {event.title}
                                </h3>
                                <div className="flex items-center text-gray-400 text-xs mb-2">
                                    <IoTimeOutline size={14} className="mr-2" />
                                    {new Date(event.date).toLocaleString()} - {new Date(event.endDate).toLocaleString()}
                                </div>
                                <div className="flex items-center text-gray-400 text-xs mb-4">
                                    <FaMapMarkerAlt size={14} className="mr-2" />
                                    {event.venue?.name || "Unknown Venue"}
                                </div>
                                <Link to={`/book-ticket/${event._id}`} className="btn btn-outline btn-accent py-1 rounded-md text-xs font-medium">
                                    {event.category || "General"}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View More */}
                <div className="my-10 text-center">
                    <Link to="/events" className="btn btn-outline btn-white rounded-3xl w-40">
                        VIEW MORE
                    </Link>
                </div>

            </div>
        </div>
    </>
}

export default UpcomingEvents
