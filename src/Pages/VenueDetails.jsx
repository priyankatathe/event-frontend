import React, { useRef, useState } from "react"
import { FaCar } from "react-icons/fa"
import { useParams } from "react-router-dom"
import { useGetEventByIdQuery } from "../redux/api/eventBookApi"
import { FaTrainSubway } from "react-icons/fa6"
import { RiMotorbikeFill } from "react-icons/ri"
import { MdElderlyWoman } from "react-icons/md"
import Footer from "./Footer"
import FAQ from "./FAQ"
import TermAndCon from "./TermAndCon"
import AboutSection from "./AboutSection"
import Artist from "./Artist"
import { useBookingPaymentMutation, useVerifyPaymentMutation } from "../redux/api/razorpayApi"

const BookTicket = () => {
    const { id } = useParams()

    const { data, isLoading, isError } = useGetEventByIdQuery(id, { skip: !id })
    const event = data?.event || null

    const [selectedTickets, setSelectedTickets] = useState({})

    const buyRef = useRef(null)
    const infoRef = useRef(null)
    const venueRef = useRef(null)
    const tcRef = useRef(null)
    const faqRef = useRef(null)

    const handleTicketChange = (e, ticketName, ticketPrice) => {
        const quantity = parseInt(e.target.value)
        setSelectedTickets(prev => {
            const updated = { ...prev }
            if (quantity === 0) delete updated[ticketName]
            else updated[ticketName] = { price: ticketPrice, quantity }
            return updated
        })
    }
    const [bookingPayment] = useBookingPaymentMutation();
    const [verifyPayment] = useVerifyPaymentMutation(); // verify ke liye ek mutation aur banani hogi

    const handlePayment = async () => {
        try {
            // 1️⃣ Backend ko call karke order create karna
            const order = await bookingPayment({
                tickets: selectedTickets,
                amount: totalAmount,
            }).unwrap();

            // 2️⃣ Razorpay checkout options
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "Event Booking",
                description: "Ticket Payment",
                order_id: order.id, // backend se mila order_id
                handler: async function (response) {
                    // 3️⃣ Backend verify-payment API call
                    const verifyRes = await verifyPayment(response).unwrap();

                    if (verifyRes.success) {
                        alert("✅ Payment Successful!");
                    } else {
                        alert("❌ Payment Failed!");
                    }
                },
                prefill: {
                    name: "Priyanka Tathe",
                    email: "test@example.com",
                    contact: "9999999999",
                },
                theme: { color: "#3399cc" },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (err) {
            console.error("Payment Error:", err);
        }
    };

    const totalTickets = Object.values(selectedTickets).reduce((sum, t) => sum + t.quantity, 0)
    const ticketTotal = Object.values(selectedTickets).reduce((sum, t) => sum + t.price * t.quantity, 0)
    const transactionFee = event?.fees?.transactionFee || 0
    const convenienceFee = event?.fees?.convenienceFee || 0
    const totalAmount = ticketTotal + transactionFee + convenienceFee

    const scrollToSection = (ref) => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" })

    if (isLoading) return <p className="text-center py-10">Loading...</p>
    if (isError || !event) return <p className="text-center py-10 text-red-500">Error loading event</p>

    const ticketOptions = event?.ticketOptions || []
    const venue = event?.venue || {}

    const ticketPrices = ticketOptions.map(ticket => ticket.price)
    const minPrice = Math.min(...ticketPrices)
    const maxPrice = Math.max(...ticketPrices)
    const ticketRange = minPrice === maxPrice ? ` $${minPrice}` : `$${minPrice} - $${maxPrice}`



    return <>
        <div className="px-4 sm:px-6 lg:px-20 max-w-screen-7xl mx-auto">
            {/* Header */}
            <div className="bg-white text-black">
                <img
                    src={event?.coverImage || "/fallback.jpg"}
                    alt={event?.title || "Event"}
                    className="w-full object-cover h-60 sm:h-72 md:h-96"
                />
                <div className="flex flex-wrap gap-2 px-4 py-2">
                    {event?.tags?.map((tag, idx) => (
                        <span key={idx} className="bg-blue-600 text-white text-xs px-2 py-1 rounded break-words">{tag}</span>
                    ))}
                </div>
                <div className="flex flex-col md:flex-row justify-between px-4 py-4 gap-4">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold">{event?.title}</h2>
                        <p className="text-sm">📅 {event?.date ? new Date(event.date).toLocaleDateString() : "Date not available"}</p>
                        <a
                            href={venue?.googleMapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 break-words text-sm sm:text-base"
                        >
                            {venue?.name} - {venue?.address}
                        </a>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-2 w-full sm:w-auto">
                        <button className="w-full sm:w-40 h-12 bg-red-600 hover:bg-red-700 text-white rounded">Buy Tickets</button>
                        <p className="text-sm text-gray-700 mt-2">
                            Ticket range: <span className="font-bold text-black">{ticketRange}</span>
                        </p>
                    </div>
                </div>
                <div className="border-t px-4 py-2 text-sm text-gray-600 flex flex-wrap gap-4">
                    <span>❤ Shortlist</span>
                    <span>🗓 Add to Calendar</span>
                    <span>🔗 Share</span>
                </div>
            </div>

            {/* Ticket Section */}
            <div className="bg-gray-50 font-sans text-[#333] px-0 sm:px-6 py-6">
                <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left */}
                    <section className="lg:col-span-2 space-y-4">
                        <div className="bg-white border border-gray-300 rounded-md overflow-hidden">
                            <div className="flex flex-wrap justify-between px-2 sm:px-4 py-3 text-sm font-medium">
                                <div className="flex flex-wrap gap-2">
                                    <button onClick={() => scrollToSection(buyRef)} className="btn w-full sm:w-32">Buy tickets</button>
                                    <button onClick={() => scrollToSection(infoRef)} className="btn w-full sm:w-32">Event Info</button>
                                    <button onClick={() => scrollToSection(venueRef)} className="btn w-full sm:w-32">Venue</button>
                                    <button onClick={() => scrollToSection(tcRef)} className="btn w-full sm:w-32">T & C</button>
                                    <button onClick={() => scrollToSection(faqRef)} className="btn w-full sm:w-32">FAQ</button>
                                </div>
                            </div>
                        </div>


                        <div ref={buyRef} className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 gap-3">
                            <h2 className="text-xl sm:text-2xl font-semibold">Ticket Information</h2>
                            {totalTickets > 0 && (
                                <button className="bg-red-500 text-white rounded px-4 py-2 font-semibold hover:bg-red-600 whitespace-nowrap">
                                    Pay ${totalAmount.toFixed(2)}
                                </button>
                            )}
                        </div>

                        <div className="space-y-4">
                            {ticketOptions.map((ticket, idx) => {
                                const isSoldOut = ticket.availableQuantity === 0 || ticket.status?.toLowerCase() === "sold out";

                                return (
                                    <div
                                        key={idx}
                                        className="bg-white border rounded-lg shadow-sm p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-gray-800">{ticket.name}</p>
                                            <p className="text-xs text-gray-500 truncate">${ticket.price}.00</p>
                                        </div>

                                        <div className="flex flex-col items-start sm:items-center">
                                            {isSoldOut ? (
                                                <>
                                                    <p className="text-sm font-semibold text-red-600">Sold Out</p>
                                                    <p className="text-xs font-medium text-gray-500">Not available</p>
                                                </>
                                            ) : (
                                                <>
                                                    <p className="text-sm font-semibold text-green-600">${ticket.price}.00</p>
                                                    <p className="text-xs font-medium text-green-600">Available ({ticket.availableQuantity})</p>
                                                </>
                                            )}
                                        </div>

                                        <div className="w-full sm:w-auto">
                                            <select
                                                onChange={(e) => handleTicketChange(e, ticket.name, ticket.price)}
                                                className="border rounded px-2 py-1 text-sm w-full sm:w-auto"
                                                disabled={isSoldOut}
                                                value={selectedTickets[ticket.name]?.quantity || 0}
                                            >
                                                {Array.from({ length: ticket.availableQuantity + 1 }, (_, i) => (
                                                    <option key={i} value={i}>
                                                        {i}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                );
                            })}

                            {totalTickets > 0 && (
                                <div className="bg-gray-400 p-5 flex flex-col sm:flex-row justify-between sm:justify-end items-center gap-3 mt-4">
                                    <p className="text-sm text-center sm:text-right">
                                        {totalTickets} Tickets / Total: <span className="font-semibold">${totalAmount.toFixed(2)}</span>
                                    </p>
                                    <button
                                        onClick={handlePayment}
                                        className="bg-red-500 text-white px-4 py-2 rounded">
                                        Pay ${totalAmount.toFixed(2)}
                                    </button>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1 space-y-5 w-full lg:w-auto">
                        {totalTickets > 0 && (
                            <div className="bg-white border rounded w-full">
                                <div className="p-4 border-b">
                                    <h3 className="font-semibold">Order Summary</h3>
                                </div>
                                <div className="p-4 text-sm space-y-4">
                                    {Object.entries(selectedTickets).map(([name, ticket], idx) => (
                                        <div key={idx} className="flex justify-between mt-1">
                                            <span>
                                                {name}: {ticket.quantity} X ${ticket.price}
                                            </span>
                                            <span>${(ticket.price * ticket.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                    {(transactionFee || convenienceFee) > 0 && (
                                        <div className="flex justify-between mt-1">
                                            <span>Transaction + Convenience Fee</span>
                                            <span>${(transactionFee + convenienceFee).toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between mt-1 font-bold">
                                        <span>Total</span>
                                        <span>${totalAmount.toFixed(2)}</span>
                                    </div>
                                    <div className="text-center">
                                        <button className="btn btn-error text-white px-4 py-2 rounded w-full sm:w-60 mt-2">
                                            Pay ${totalAmount.toFixed(2)}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Organizer */}
                        <div className="bg-white border rounded p-2">
                            <h4 className="font-semibold mb-2 p-2">Organizer Details</h4>
                            <hr />
                            <div className="flex flex-col sm:flex-row items-center gap-3 p-3 text-center sm:text-left">
                                <img
                                    src="https://images.unsplash.com/photo-1594919097231-33d4d04c7d39?q=80&w=1168&auto=format&fit=crop"
                                    className="h-20 w-20 bg-gray-200 rounded-full"
                                    alt="Organizer"
                                />
                                <div>
                                    <p className="font-medium">Roshni Suchde</p>
                                    <p className="text-xs text-gray-500">Roshni Productions LLC</p>
                                </div>
                            </div>
                            <div className="text-center pb-3">
                                <button className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 rounded w-full sm:w-60 mt-2">
                                    View Organizer Profile
                                </button>
                            </div>
                        </div>
                    </aside>
                </main>

                {/* Event Details */}
                <div ref={infoRef} className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 py-6">
                    <div className="lg:col-span-2 bg-white border rounded shadow p-6">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Event Details</h2>
                        <hr />
                        {event?.images?.length > 0 && (
                            <div >
                                {event.images.map((imgUrl, idx) => (
                                    <img
                                        key={idx}
                                        src={imgUrl}
                                        alt={`Event Image ${idx + 1}`}
                                        className="w-full h-230 object-cover mt-5 rounded"
                                    />
                                ))}
                            </div>
                        )}
                        <p className="text-sm text-gray-700 leading-relaxed">
                            {event?.description
                                ? event.description.split("\n").map((line, idx) => (
                                    <React.Fragment key={idx}>{line}<br /></React.Fragment>
                                ))
                                : "Event details not available."}
                        </p>
                    </div>

                    <div className="space-y-3">
                        <Artist />
                    </div>
                </div>

                {/* Venue Details */}
                <div ref={venueRef} className="bg-white border rounded shadow mb-5 p-3 max-w-7xl mx-auto">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-center md:text-left">Venue Details</h2>
                    <hr />
                    <h1 className="text-base sm:text-lg md:text-xl font-medium text-center mt-4">
                        {venue?.name || "Venue name not available"}
                    </h1>
                    <p className="text-center text-xs sm:text-sm md:text-base">
                        {venue?.address || "Address not available"}
                    </p>

                    <div className="flex flex-wrap justify-center gap-3 mt-4">
                        {venue?.transportModes?.car && <FaCar className="border rounded-2xl p-3 bg-amber-400 text-lg sm:text-xl" />}
                        {venue?.transportModes?.subway && <FaTrainSubway className="border rounded-2xl p-3 bg-amber-400 text-lg sm:text-xl" />}
                        {venue?.transportModes?.bike && <RiMotorbikeFill className="border rounded-2xl p-3 bg-amber-400 text-lg sm:text-xl" />}
                        {venue?.transportModes?.elderlyFriendly && <MdElderlyWoman className="border rounded-2xl p-3 bg-amber-400 text-lg sm:text-xl" />}
                    </div>

                    <div className="mt-5">
                        <img
                            src="https://maps.googleapis.com/maps/api/staticmap?center=Secaucus%20Rec%20Center,1200%20Koelle%20Boulevard,Secaucus,NJ,07094&markers=color:red%7Clabel:C%7CSecaucus%20Rec%20Center,1200%20Koelle%20Boulevard,Secaucus,NJ,07094&zoom=13&size=600x300&maptype=roadmap&key=AIzaSyCUOoO5uqFk21NtvnLr6YSjdFkbCTpdldQ"
                            alt="Event Location"
                            className="w-full h-auto border rounded mb-1"
                        />
                    </div>

                </div>

                {/* About Section */}
                <div >
                    <AboutSection />
                </div>

                {/* Terms & Conditions */}
                <div ref={tcRef} >
                    <TermAndCon />
                </div>

                {/* FAQ */}
                <div ref={faqRef} >
                    <FAQ />
                </div>
            </div>
        </div>

        <div>
            <Footer />
        </div>
    </>
}

export default BookTicket