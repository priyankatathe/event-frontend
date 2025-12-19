import React, { useEffect, useState } from "react"
import { FaCalendarAlt, FaSearch } from "react-icons/fa"
import { Link } from "react-router-dom"
import { useGetEventQuery } from "../redux/api/eventBookApi"

const Events = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const { data, isLoading, isError, refetch } = useGetEventQuery()


    const events = Array.isArray(data?.result) ? data.result : []

    const filteredEvents = events.filter((ev) => {
        const event = ev.eventId || ev
        const title = (event.title || "").toLowerCase()
        const name = (ev.name || "").toLowerCase()
        const search = searchTerm.toLowerCase()
        return title.includes(search) || name.includes(search)
    })


    useEffect(() => {
        refetch()
    }, [])

    return <>
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-purple-600 to-blue-500 text-white py-20 px-6 md:px-20 text-center">
                <div className="relative z-10">
                    <p className="text-pink-200 font-semibold">Find Your Next Experience</p>
                    <h1 className="text-4xl md:text-6xl font-bold mt-2">
                        Discover & Promote <br /> Upcoming Event
                    </h1>
                </div>
            </section>

            {/* Search Bar */}
            <div className="relative mt-5 z-20 mx-6 px-4 md:px-20">
                <div className="bg-white shadow-xl rounded-2xl flex flex-col md:flex-row items-center gap-4 p-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search Event"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none"
                    />
                    <button className="bg-purple-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-purple-700 w-full md:w-auto justify-center">
                        <FaSearch /> Search
                    </button>
                </div>
            </div>

            {/* Events Section */}
            <section className="py-16 px-6 mx-6 md:px-20">
                <p className="text-center text-pink-600 font-semibold mb-2">Upcoming Event</p>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Featured Events</h2>

                {isLoading && <p className="text-center text-gray-500">Loading events...</p>}
                {isError && <p className="text-center text-red-500">Failed to load events.</p>}

                {!isLoading && !isError && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredEvents.length > 0 ? (
                            filteredEvents.map((ev) => {
                                const event = ev.eventId || ev
                                return (
                                    <div
                                        key={ev._id}
                                        className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition duration-300"
                                    >
                                        <img
                                            src={
                                                ev.image?.[0] ||
                                                event.coverImage ||
                                                "https://via.placeholder.com/400x200"
                                            }
                                            alt={event.title || "Event"}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-5">
                                            <h3 className="text-base font-semibold text-gray-900">
                                                {event.title || ev.name}
                                            </h3>
                                            <p className="text-gray-500 text-sm mt-2 flex items-center gap-2">
                                                <FaCalendarAlt className="text-purple-600" />
                                                {event.date
                                                    ? new Date(event.date).toLocaleDateString()
                                                    : "Date not available"}
                                            </p>
                                            <div className="flex items-center justify-between mt-4">
                                                <p className="text-sm text-gray-500">
                                                    Location <br />
                                                    <span className="text-pink-600 font-medium">
                                                        {event.venue
                                                            ? `${event.venue.name}, ${event.venue.address}`
                                                            : ev.location || "Not specified"}
                                                    </span>
                                                </p>
                                                <Link
                                                    to={`/book-ticket/${event._id}`}
                                                    className="border border-purple-600 text-purple-600 px-4 py-1.5 rounded-md text-sm font-medium hover:bg-purple-600 hover:text-white transition"
                                                >
                                                    BUY NOW
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <p className="col-span-3 text-center text-gray-500">No events found</p>
                        )}
                    </div>
                )}
            </section>
        </div>


    </>
}

export default Events






// import React, { useState, useMemo } from "react";
// import { useGetBookingHistoryQuery } from "../redux/api/razorpayApi";
// import { useGetEventQuery } from "../redux/api/eventBookApi";
// import {
//     BarChart,
//     Bar,
//     XAxis,
//     YAxis,
//     Tooltip,
//     CartesianGrid,
//     ResponsiveContainer,
// } from "recharts";
// import { useGetAuthEventQuery } from "../redux/api/authApi";

// const BookTicketList = ({ adminId }) => {
//     // ✅ Bookings API
//     const {
//         data: tickets = [],
//         isLoading: isTicketsLoading,
//         isError: isTicketsError,
//     } = useGetBookingHistoryQuery(adminId);

//     // ✅ Events API
//     const {
//         data: eventsData,
//         isLoading: isEventsLoading,
//         isError: isEventsError,
//     } = useGetAuthEventQuery()
//     console.log("Events API Response:", eventsData);


//     const [showFullTable, setShowFullTable] = useState(false);

//     // ✅ Events array safe extraction (handles both object + array response)
//     const events = Array.isArray(eventsData)
//         ? eventsData
//         : eventsData?.events || [];

//     // ✅ Filter events by adminId
//     const adminEvents = events.filter(ev => ev.adminId?._id === adminId);
//     const totalEvents = adminEvents.length;

//     // ✅ Tickets filter by admin’s events
//     const adminTickets = tickets.filter(t => t.eventId?.adminId === adminId);
//     const totalBookings = adminTickets.length;

//     // ✅ Earnings
//     const totalEarnings = adminTickets.reduce(
//         (sum, t) => sum + (t.totalAmount || 0),
//         0
//     );

//     // ✅ Paid %
//     const paidBookings = adminTickets.filter(t => t.status === "paid").length;
//     const paidPercentage = totalBookings
//         ? Math.round((paidBookings / totalBookings) * 100)
//         : 0;

//     // ✅ Monthly earnings chart data
//     const monthlyData = useMemo(() => {
//         const monthNames = [
//             "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//             "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
//         ];
//         const counts = {};

//         adminTickets.forEach(ticket => {
//             if (!ticket.createdAt) return;
//             const date = new Date(ticket.createdAt);
//             const month = monthNames[date.getMonth()];
//             counts[month] = (counts[month] || 0) + (ticket.totalAmount || 0);
//         });

//         return monthNames.map(m => ({
//             month: m,
//             value: counts[m] || 0,
//         }));
//     }, [adminTickets]);

//     return (
//         <div className="bg-[#f6fff8] min-h-screen p-6 md:ml-[250px] w-full md:w-[calc(100%-250px)] mt-16 space-y-6">
//             {/* ==== Stat Cards ==== */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//                 {/* Total Events */}
//                 <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-red-500">
//                     <div className="text-gray-500 text-sm">Total Events</div>
//                     <div className="text-3xl font-bold text-gray-800">
//                         {isEventsLoading ? "..." : totalEvents}
//                     </div>
//                     <div className="text-green-600 text-sm mt-1">
//                         {totalEvents > 0 ? ${totalEvents} Active : "No Events"}
//                     </div>
//                 </div>

//                 {/* Total Bookings */}
//                 <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-green-500">
//                     <div className="text-gray-500 text-sm">Total Bookings</div>
//                     <div className="text-3xl font-bold text-gray-800">
//                         {isTicketsLoading ? "..." : totalBookings}
//                     </div>
//                     <div className="text-green-600 text-sm mt-1">
//                         {paidPercentage}% Paid
//                     </div>
//                 </div>

//                 {/* Total Earnings */}
//                 <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-yellow-500">
//                     <div className="text-gray-500 text-sm">Earnings</div>
//                     <div className="text-3xl font-bold text-gray-800">
//                         ₹ {totalEarnings.toLocaleString()}
//                     </div>
//                     <div className="text-green-600 text-sm mt-1">
//                         From {totalBookings} Bookings
//                     </div>
//                 </div>
//             </div>

//             {/* ==== Chart + Small Table ==== */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                 {/* Chart */}
//                 <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-2">
//                     <h2 className="text-xl font-semibold text-gray-700 mb-4">
//                         📈 Earning Statistics
//                     </h2>
//                     <ResponsiveContainer width="100%" height={300}>
//                         <BarChart data={monthlyData}>
//                             <CartesianGrid strokeDasharray="3 3" />
//                             <XAxis dataKey="month" stroke="#6b7280" />
//                             <YAxis stroke="#6b7280" />
//                             <Tooltip formatter={(val) => ₹ ${val.toLocaleString()}} />
//                             <Bar dataKey="value" fill="#43a047" />
//                         </BarChart>
//                     </ResponsiveContainer>
//                 </div>

//                 {/* Small Table */}
//                 <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between">
//                     <div>
//                         <h2 className="text-xl font-semibold text-gray-700 mb-4">
//                             Recent Customers
//                         </h2>
//                         <table className="min-w-full divide-y divide-gray-200 text-sm">
//                             <thead className="bg-green-100 text-green-800 uppercase">
//                                 <tr>
//                                     <th className="px-4 py-2 text-left">Customer</th>
//                                     <th className="px-4 py-2 text-left">Status</th>
//                                     <th className="px-4 py-2 text-left">Amount</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y divide-gray-100">
//                                 {adminTickets.slice(0, 5).map((ticket, index) => (
//                                     <tr key={ticket._id || index} className="hover:bg-green-50 transition">
//                                         <td className="px-4 py-2">{ticket.userId?.name || "N/A"}</td>
//                                         <td className="px-4 py-2">
//                                             <span
//                                                 className={`px-2 py-1 text-xs font-semibold rounded-full ${ticket.status === "paid"
//                                                     ? "bg-green-100 text-green-700"
//                                                     : ticket.status === "created"
//                                                         ? "bg-yellow-100 text-yellow-700"
//                                                         : "bg-red-100 text-red-700"
//                                                     }`}
//                                             >
//                                                 {ticket.status.charAt(0).toUpperCase() +
//                                                     ticket.status.slice(1)}
//                                             </span>
//                                         </td>
//                                         <td className="px-4 py-2">
//                                             ₹{ticket.totalAmount || 0}
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>

//                     <button
//                         onClick={() => setShowFullTable(!showFullTable)}
//                         className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
//                     >
//                         {showFullTable ? "Hide All" : "All View"}
//                     </button>
//                 </div>
//             </div>

//             {/* ==== Full Bookings Table ==== */}
//             {showFullTable && (
//                 <div className="bg-white rounded-xl shadow-md p-6 overflow-x-auto">
//                     <h2 className="text-xl font-semibold text-gray-700 mb-4">
//                         🎟 Booked Tickets
//                     </h2>
//                     {isTicketsLoading ? (
//                         <p className="text-gray-600">Loading tickets...</p>
//                     ) : isTicketsError ? (
//                         <p className="text-red-600">Error fetching tickets!</p>
//                     ) : (
//                         <table className="min-w-full divide-y divide-gray-200 text-sm">
//                             <thead className="bg-green-100 text-green-800 uppercase">
//                                 <tr>
//                                     <th className="px-4 py-2 text-center">#</th>
//                                     <th className="px-4 py-2 text-center">Customer</th>
//                                     <th className="px-4 py-2 text-center">Email</th>
//                                     <th className="px-4 py-2 text-center">Mobile</th>
//                                     <th className="px-4 py-2 text-center">Event</th>
//                                     <th className="px-4 py-2 text-center">Amount</th>
//                                     <th className="px-4 py-2 text-center">Date & Time</th>
//                                     <th className="px-4 py-2 text-center">Status</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y divide-gray-100">
//                                 {adminTickets.length === 0 ? (
//                                     <tr>
//                                         <td
//                                             colSpan={8}
//                                             className="px-4 py-10 text-center text-gray-400"
//                                         >
//                                             No bookings found.
//                                         </td>
//                                     </tr>
//                                 ) : (
//                                     adminTickets.map((ticket, index) => (
//                                         <tr
//                                             key={ticket._id || index}
//                                             className="hover:bg-green-50 transition"
//                                         >
//                                             <td className="px-4 py-3 text-center font-semibold text-gray-800">
//                                                 {index + 1}
//                                             </td>
//                                             <td className="px-4 py-3 text-center">
//                                                 {ticket.userId?.name || "N/A"}
//                                             </td>
//                                             <td className="px-4 py-3 text-center">
//                                                 {ticket.userId?.email || "N/A"}
//                                             </td>
//                                             <td className="px-4 py-3 text-center">
//                                                 {ticket.userId?.mobile || "N/A"}
//                                             </td>
//                                             <td className="px-4 py-3 text-center">
//                                                 {ticket.eventId?.name || "N/A"}
//                                             </td>
//                                             <td className="px-4 py-3 text-center text-gray-600">
//                                                 ₹{ticket.totalAmount || 0}
//                                             </td>
//                                             <td className="px-4 py-3 text-center text-gray-600">
//                                                 {ticket.createdAt
//                                                     ? new Date(ticket.createdAt).toLocaleString()
//                                                     : "N/A"}
//                                             </td>
//                                             <td className="px-4 py-3 text-center">
//                                                 <span
//                                                     className={`px-3 py-1 text-xs font-semibold rounded-full ${ticket.status === "paid"
//                                                         ? "bg-green-100 text-green-700"
//                                                         : ticket.status === "created"
//                                                             ? "bg-yellow-100 text-yellow-700"
//                                                             : "bg-red-100 text-red-700"
//                                                         }`}
//                                                 >
//                                                     {ticket.status.charAt(0).toUpperCase() +
//                                                         ticket.status.slice(1)}
//                                                 </span>
//                                             </td>
//                                         </tr>
//                                     ))
//                                 )}
//                             </tbody>
//                         </table>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default BookTicketList;
