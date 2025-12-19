import React, { useState } from "react"
import { useGetAuthEventQuery, useGetEventBookingsQuery } from "../redux/api/authApi"
import { FaCalendarAlt, FaTicketAlt, FaRupeeSign, FaMusic } from "react-icons/fa"

import Graphchat from "./Graphchat"

const BookTicketList = ({ eventId }) => {
    const { data: events = [], isLoading: isEventsLoading } = useGetAuthEventQuery()
    const { data: eventTickets = [], isLoading: isTicketsLoading, isError: isTicketsError } = useGetEventBookingsQuery(eventId, {
        skip: !eventId,
    })

    const [showFullTable, setShowFullTable] = useState(false)

    const selectedEvent = events.find(ev => ev._id === eventId)

    const totalBookings = eventTickets.length
    const totalEarnings = eventTickets.reduce((sum, t) => sum + (t.totalAmount || 0), 0)
    const paidBookings = eventTickets.filter(t => t.status === "paid").length
    // const paidPercentage = totalBookings ? Math.round((paidBookings / totalBookings) * 100) : 0

    // ✅ Unique seat types (case-insensitive)
    const allSeatTypes = Array.from(
        new Set(
            eventTickets.flatMap(ticket =>
                ticket.tickets?.map(t => t.optionName?.trim().toLowerCase()) || []
            )
        )
    )
    const displaySeatTypes = allSeatTypes.map(
        type => type.charAt(0).toUpperCase() + type.slice(1)
    )

    return <>
        <div className="bg-[#f6fff8] min-h-screen p-4 md:p-6 w-full max-w-[1200px] mx-auto space-y-6">
            {/* ==== Stat Cards ==== */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Event */}
                <div className="bg-white rounded-xl shadow-md p-5 flex justify-between items-center hover:scale-105 transform transition">
                    <div>
                        <div className="text-gray-500 text-sm">Event Name</div>
                        <div className="text-2xl font-bold text-gray-800">
                            {isEventsLoading ? "Loading..." : selectedEvent?.name || "N/A"}
                        </div>
                    </div>
                    <div className="bg-red-100 p-3 rounded-full">
                        <FaMusic className="text-red-500 text-2xl" />
                    </div>
                </div>

                {/* Total Bookings */}
                <div className="bg-white rounded-xl shadow-md p-5 flex justify-between items-center hover:scale-105 transform transition">
                    <div>
                        <div className="text-gray-500 text-sm">Total Bookings</div>
                        <div className="text-3xl font-bold text-gray-800">
                            {isTicketsLoading ? "..." : totalBookings}
                        </div>
                        {/* <div className="text-green-600 text-sm mt-1">{paidPercentage}% Paid</div> */}
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                        <FaTicketAlt className="text-green-500 text-2xl" />
                    </div>
                </div>

                {/* Earnings */}
                <div className="bg-white rounded-xl shadow-md p-5 flex justify-between items-center hover:scale-105 transform transition">
                    <div>
                        <div className="text-gray-500 text-sm">Earnings</div>
                        <div className="text-3xl font-bold text-gray-800">
                            ₹ {totalEarnings.toLocaleString()}
                        </div>
                        <div className="text-green-600 text-sm mt-1">From {totalBookings} Bookings</div>
                    </div>
                    <div className="bg-yellow-100 p-3 rounded-full">
                        <FaRupeeSign className="text-yellow-500 text-2xl" />
                    </div>
                </div>
            </div>

            {/* ==== Graph + Recent Customers ==== */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Graphchat tickets={eventTickets} />

                <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between">
                    <div className="overflow-x-auto">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">Recent Customers</h2>
                        <table className="min-w-full divide-y divide-gray-200 text-sm md:text-base">
                            <thead className="bg-green-100 text-green-800 uppercase">
                                <tr>
                                    <th className="px-4 py-2 text-left">Customer</th>
                                    <th className="px-4 py-2 text-left">Status</th>
                                    <th className="px-4 py-2 text-left">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {eventTickets.slice(0, 5).map((ticket, index) => (
                                    <tr key={ticket._id || index} className="hover:bg-green-50 transition">
                                        <td className="px-4 py-2">{ticket.userId?.name || "N/A"}</td>
                                        <td className="px-4 py-2">
                                            <span
                                                className={`px-2 py-1 text-xs md:text-sm font-semibold rounded-full ${ticket.status === "paid"
                                                    ? "bg-green-100 text-green-700"
                                                    : ticket.status === "created"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">₹{ticket.totalAmount || 0}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <button
                        onClick={() => setShowFullTable(!showFullTable)}
                        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition text-sm md:text-base"
                    >
                        {showFullTable ? "Hide All" : "All View"}
                    </button>
                </div>
            </div>

            {/* ==== Full Bookings Table ==== */}
            {showFullTable && (
                <div className="bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">🎟 Booked Tickets</h2>

                    {isTicketsLoading ? (
                        <p className="text-gray-600">Loading tickets...</p>
                    ) : isTicketsError ? (
                        <p className="text-red-600">Error fetching tickets!</p>
                    ) : eventTickets.length === 0 ? (
                        <p className="text-gray-400 text-center py-10">No bookings found.</p>
                    ) : (
                        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden text-xs md:text-sm">
                            <thead className="bg-green-600 text-white uppercase tracking-wider">
                                <tr>
                                    <th className="px-4 py-3 text-center">#</th>
                                    <th className="px-4 py-3 text-center">Customer</th>
                                    <th className="px-4 py-3 text-center">Email</th>
                                    <th className="px-4 py-3 text-center">Mobile</th>
                                    <th className="px-4 py-3 text-center">Event</th>

                                    {/* ✅ Dynamic Seat Columns */}
                                    {displaySeatTypes.map((type, i) => (
                                        <th key={i} className="px-4 py-3 text-center">{type}</th>
                                    ))}

                                    <th className="px-4 py-3 text-center">Total Amount</th>
                                    <th className="px-4 py-3 text-center">Date & Time</th>
                                    <th className="px-4 py-3 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                                {eventTickets.map((ticket, index) => (
                                    <tr key={ticket._id || index} className="hover:bg-green-50 transition">
                                        <td className="px-4 py-3 text-center font-semibold text-gray-800">{index + 1}</td>
                                        <td className="px-4 py-3 text-center">{ticket.userId?.name || "N/A"}</td>
                                        <td className="px-4 py-3 text-center text-gray-600">{ticket.userId?.email || "N/A"}</td>
                                        <td className="px-4 py-3 text-center text-gray-600">{ticket.userId?.mobile || "N/A"}</td>
                                        <td className="px-4 py-3 text-center font-medium text-gray-700">{ticket.eventId?.name || "N/A"}</td>

                                        {/* ✅ Seat Data by Type */}
                                        {allSeatTypes.map((type, i) => {
                                            const seat = ticket.tickets?.find(
                                                t => t.optionName?.trim().toLowerCase() === type
                                            )
                                            return (
                                                <td key={i} className="px-4 py-3 text-center text-gray-700">
                                                    {seat ? (
                                                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">
                                                            x{seat.quantity}
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-400 italic">0</span>
                                                    )}
                                                </td>
                                            )
                                        })}

                                        <td className="px-4 py-3 text-center font-semibold text-gray-800">₹{ticket.totalAmount || 0}</td>
                                        <td className="px-4 py-3 text-center text-gray-600">
                                            {ticket.createdAt ? new Date(ticket.createdAt).toLocaleString() : "N/A"}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <span
                                                className={`px-3 py-1 text-xs font-semibold rounded-full ${ticket.status === "paid"
                                                    ? "bg-green-100 text-green-700"
                                                    : ticket.status === "created"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    </>
}

export default BookTicketList
