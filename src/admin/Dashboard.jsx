import React, { useState } from "react"
import { useGetBookingHistoryQuery } from "../redux/api/razorpayApi"
import { useGetAuthEventQuery } from "../redux/api/authApi"
import Graphchat from "./Graphchat"
import { FaMusic, FaRupeeSign, FaTicketAlt } from "react-icons/fa"

const Dashboard = ({ adminId }) => {
    const {
        data: tickets = [],
        isLoading: isTicketsLoading,
        isError: isTicketsError,
    } = useGetBookingHistoryQuery(adminId)

    const {
        data: eventsData,
        isLoading: isEventsLoading,
    } = useGetAuthEventQuery()

    const [showFullTable, setShowFullTable] = useState(false)

    // ✅ Events array safe extraction
    const events = Array.isArray(eventsData)
        ? eventsData
        : eventsData?.events || []

    // ✅ Filter events by adminId
    const adminEvents = events.filter(ev => ev.adminId?._id === adminId)
    const totalEvents = adminEvents.length

    // ✅ Tickets filter by admin’s events
    const adminTickets = tickets.filter(t => t.eventId?.adminId === adminId)
    const totalBookings = adminTickets.length

    // ✅ Earnings
    const totalEarnings = adminTickets.reduce(
        (sum, t) => sum + (t.totalAmount || 0),
        0
    )

    // ✅ Paid %
    const paidBookings = adminTickets.filter(t => t.status === "paid").length


    return (
        <>
            <div className="bg-[#f6fff8] min-h-screen p-6 md:ml-[250px] w-full md:w-[calc(100%-250px)] space-y-6">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                {/* ==== Stat Cards ==== */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Total Events */}
                    <div className="rounded-xl border p-6 flex justify-between items-center">
                        <div>
                            <div className="text-gray-500 text-sm ">Total Events</div>
                            <div className="text-3xl font-bold text-gray-800 ">
                                {isEventsLoading ? "..." : totalEvents}
                            </div>
                            <div className="text-red-600 text-sm mt-1">
                                {totalEvents > 0 ? `${totalEvents} Active` : "No Events"}
                            </div>
                        </div>
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-200 text-red-500 text-2xl">
                            <FaMusic />
                        </div>
                    </div>

                    {/* Total Bookings */}
                    <div className="rounded-xl border p-6 flex justify-between items-center">
                        <div>
                            <div className="text-gray-500 text-sm">Total Bookings</div>
                            <div className="text-3xl font-bold text-gray-800">
                                {isTicketsLoading ? "..." : totalBookings}
                            </div>
                        </div>
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-200 text-green-500 text-2xl">
                            <FaTicketAlt />
                        </div>
                    </div>

                    {/* Earnings */}
                    <div className="rounded-xl border p-6 flex justify-between items-center">
                        <div>
                            <div className="text-gray-500 text-sm">Earnings</div>
                            <div className="text-3xl font-bold text-gray-800">
                                ₹ {totalEarnings.toLocaleString()}
                            </div>
                            <div className="text-yellow-600 text-sm mt-1">
                                From {totalBookings} Bookings
                            </div>
                        </div>
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-200 text-yellow-500 text-2xl">
                            <FaRupeeSign />
                        </div>
                    </div>
                </div>

                {/* ==== Graph + Customers Side by Side ==== */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Graph */}
                    <Graphchat tickets={adminTickets} />

                    {/* Recent Customers */}
                    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">
                                Recent Customers
                            </h2>
                            <table className="min-w-full divide-y divide-gray-200 text-sm">
                                <thead className="bg-green-100 text-green-800 uppercase">
                                    <tr>
                                        <th className="px-4 py-2 text-left">Customer</th>
                                        <th className="px-4 py-2 text-left">Status</th>
                                        <th className="px-4 py-2 text-left">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {adminTickets.slice(0, 5).map((ticket, index) => (
                                        <tr
                                            key={ticket._id || index}
                                            className="hover:bg-green-50 transition"
                                        >
                                            <td className="px-4 py-2">
                                                {ticket.userId?.name || "N/A"}
                                            </td>
                                            <td className="px-4 py-2">
                                                <span
                                                    className={`px-2 py-1 text-xs font-semibold rounded-full ${ticket.status === "paid"
                                                        ? "bg-green-100 text-green-700"
                                                        : ticket.status === "created"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : "bg-red-100 text-red-700"
                                                        }`}
                                                >
                                                    {ticket.status.charAt(0).toUpperCase() +
                                                        ticket.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                ₹{ticket.totalAmount || 0}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Button */}
                        <button
                            onClick={() => setShowFullTable(!showFullTable)}
                            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                        >
                            {showFullTable ? "Hide All" : "All View"}
                        </button>
                    </div>
                </div>

                {/* ==== Full Bookings Table ==== */}
                {showFullTable && (
                    <div className="bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            🎟 Booked Tickets
                        </h2>

                        {isTicketsLoading ? (
                            <p className="text-gray-600">Loading tickets...</p>
                        ) : isTicketsError ? (
                            <p className="text-red-600">Error fetching tickets!</p>
                        ) : (
                            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden text-sm">
                                {/* ==== Table Head ==== */}
                                <thead className="bg-green-600 text-white uppercase text-xs tracking-wider">
                                    <tr>
                                        <th className="px-4 py-3 text-center">#</th>
                                        <th className="px-4 py-3 text-center">Customer</th>
                                        <th className="px-4 py-3 text-center">Email</th>
                                        <th className="px-4 py-3 text-center">Mobile</th>
                                        <th className="px-4 py-3 text-center">Event</th>

                                        {/* ✅ Dynamic Seat Type Columns */}
                                        {Array.from(
                                            new Set(
                                                adminTickets.flatMap((ticket) =>
                                                    ticket.tickets?.map((t) =>
                                                        t.optionName?.trim().toLowerCase()
                                                    ) || []
                                                )
                                            )
                                        ).map((seatType, i) => (
                                            <th key={i} className="px-4 py-3 text-center">
                                                {seatType.charAt(0).toUpperCase() + seatType.slice(1)}
                                            </th>
                                        ))}

                                        <th className="px-4 py-3 text-center">Total Amount</th>
                                        <th className="px-4 py-3 text-center">Date & Time</th>
                                        <th className="px-4 py-3 text-center">Status</th>
                                    </tr>
                                </thead>

                                {/* ==== Table Body ==== */}
                                <tbody className="divide-y divide-gray-100 bg-white">
                                    {adminTickets.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={9}
                                                className="px-4 py-10 text-center text-gray-400"
                                            >
                                                No bookings found.
                                            </td>
                                        </tr>
                                    ) : (
                                        adminTickets.map((ticket, index) => {
                                            // ✅ Seat Types (normalized lowercase)
                                            const allSeatTypes = Array.from(
                                                new Set(
                                                    adminTickets.flatMap((t) =>
                                                        t.tickets?.map((x) =>
                                                            x.optionName?.trim().toLowerCase()
                                                        ) || []
                                                    )
                                                )
                                            );

                                            return (
                                                <tr
                                                    key={ticket._id || index}
                                                    className="hover:bg-green-50 transition"
                                                >
                                                    {/* Index */}
                                                    <td className="px-4 py-3 text-center font-semibold text-gray-800">
                                                        {index + 1}
                                                    </td>

                                                    {/* Customer */}
                                                    <td className="px-4 py-3 text-center">
                                                        {ticket.userId?.name || "N/A"}
                                                    </td>

                                                    {/* Email */}
                                                    <td className="px-4 py-3 text-center text-gray-600">
                                                        {ticket.userId?.email || "N/A"}
                                                    </td>

                                                    {/* Mobile */}
                                                    <td className="px-4 py-3 text-center text-gray-600">
                                                        {ticket.userId?.mobile || "N/A"}
                                                    </td>

                                                    {/* Event */}
                                                    <td className="px-4 py-3 text-center font-medium text-gray-700">
                                                        {ticket.eventId?.name || "N/A"}
                                                    </td>

                                                    {/* ✅ Dynamic Seat Type Columns */}
                                                    {allSeatTypes.map((type, i) => {
                                                        const seat = ticket.tickets?.find(
                                                            (t) =>
                                                                t.optionName?.trim().toLowerCase() === type
                                                        );
                                                        return (
                                                            <td
                                                                key={i}
                                                                className="px-4 py-3 text-center text-gray-700"
                                                            >
                                                                {seat ? (
                                                                    <div className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg shadow-sm border border-green-200 bg-gradient-to-r from-green-50 to-green-100">
                                                                        <span className="text-sm font-semibold text-green-800">
                                                                            x{seat.quantity}
                                                                        </span>
                                                                    </div>
                                                                ) : (
                                                                    <span className="text-gray-400 italic">0</span>
                                                                )}
                                                            </td>
                                                        );
                                                    })}

                                                    {/* Amount */}
                                                    <td className="px-4 py-3 text-center font-semibold text-gray-800">
                                                        ₹{ticket.totalAmount || 0}
                                                    </td>

                                                    {/* Date & Time */}
                                                    <td className="px-4 py-3 text-center text-gray-600">
                                                        {ticket.createdAt
                                                            ? new Date(ticket.createdAt).toLocaleString()
                                                            : "N/A"}
                                                    </td>

                                                    {/* Status */}
                                                    <td className="px-4 py-3 text-center">
                                                        <span
                                                            className={`px-3 py-1 text-xs font-semibold rounded-full 
                      ${ticket.status === "paid"
                                                                    ? "bg-green-100 text-green-700"
                                                                    : ticket.status === "created"
                                                                        ? "bg-yellow-100 text-yellow-700"
                                                                        : "bg-red-100 text-red-700"
                                                                }`}
                                                        >
                                                            {ticket.status.charAt(0).toUpperCase() +
                                                                ticket.status.slice(1)}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}


            </div>
        </>
    )
}

export default Dashboard
