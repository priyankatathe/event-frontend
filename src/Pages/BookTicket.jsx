import React, { useRef, useState } from "react"
import { FaCar, FaTrain } from "react-icons/fa"
import { useParams } from "react-router-dom"
import { useGetEventByIdQuery } from "../redux/api/eventBookApi"
import { RiMotorbikeFill } from "react-icons/ri"
import { MdElderlyWoman } from "react-icons/md"
import FAQ from "./FAQ"
import TermAndCon from "./TermAndCon"
import AboutSection from "./AboutSection"
import Artist from "./Artist"
import { useBookingPaymentMutation, useVerifyPaymentMutation } from "../redux/api/razorpayApi"
import { useSelector } from "react-redux"

const BookTicket = () => {
    const { id } = useParams()
    const { data, isLoading, isError, refetch } = useGetEventByIdQuery(id, { skip: !id })
    const event = data?.event || null

    const [selectedTickets, setSelectedTickets] = useState({})

    const buyRef = useRef(null)
    const infoRef = useRef(null)
    const venueRef = useRef(null)
    const tcRef = useRef(null)
    const faqRef = useRef(null)

    const scrollToSection = (ref) => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" })

    const handleTicketChange = (e, ticket) => {
        const quantity = parseInt(e.target.value)
        setSelectedTickets(prev => {
            const updated = { ...prev }
            if (quantity === 0) delete updated[ticket.name]
            else updated[ticket.name] = { price: ticket.price, quantity }
            return updated
        })
    }

    const [bookingPayment] = useBookingPaymentMutation()
    const [verifyPayment, { refetch: verifyRefetch }] = useVerifyPaymentMutation()
    const { customer } = useSelector(state => state.Auth)

    const handlePayment = async () => {
        try {
            if (!customer?.result?._id) {
                alert("⚠️ Please login as customer first")
                return
            }

            if (!selectedTickets || Object.keys(selectedTickets).length === 0) {
                alert("⚠️ Please select at least one ticket")
                return
            }

            const ticketsPayload = Object.entries(selectedTickets).map(([name, t]) => ({
                ticketName: name,
                quantity: t.quantity,
                price: t.price,
            }))

            const ticketTotal = ticketsPayload.reduce((sum, t) => sum + t.price * t.quantity, 0)
            const transactionFee = event?.fees?.transactionFee || 0
            const convenienceFee = event?.fees?.convenienceFee || 0
            const totalAmount = ticketTotal + transactionFee + convenienceFee

            console.log("Booking Payload:", {
                userId: customer.result._id,
                eventId: event._id,
                tickets: ticketsPayload,
                amount: totalAmount,
            })

            const order = await bookingPayment({
                userId: customer.result._id,
                eventId: event._id,
                tickets: ticketsPayload,
                amount: totalAmount,
            }).unwrap()

            console.log("Order Response:", order)

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "Event Booking",
                description: "Ticket Payment",
                order_id: order.orderId,
                handler: async function (response) {
                    // console.log("Razorpay Response:", response);

                    const payload = {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        userId: customer.result._id,
                        eventId: event._id,
                        tickets: ticketsPayload,
                        totalAmount
                    }

                    // console.log("Payload to verifyPayment:", payload);

                    const verifyRes = await verifyPayment(payload).unwrap();
                    if (verifyRes.booking && verifyRes.booking.status === "paid") {
                        alert("✅ Payment Successful! Tickets booked.")
                        // refetch()
                        window.location.reload()
                    } else {
                        alert("❌ Payment Failed!")
                    }
                },
                prefill: {
                    name: customer.result.name,
                    email: customer.result.email,
                    contact: customer.result.mobile?.toString() || "",
                },
                theme: { color: "#3399cc" },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open()


        } catch (err) {
            // console.error("Payment Error:", err)
            alert("❌ Payment could not be initiated!")
        }
    }


    const totalTickets = Object.values(selectedTickets).reduce((sum, t) => sum + t.quantity, 0)
    const ticketTotal = Object.values(selectedTickets).reduce((sum, t) => sum + t.price * t.quantity, 0)
    const transactionFee = event?.fees?.transactionFee || 0
    const convenienceFee = event?.fees?.convenienceFee || 0
    const totalAmount = ticketTotal + transactionFee + convenienceFee


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
                        <h2 className="text-xl sm:text-2xl font-bold">{event?.name}</h2>
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
            </div>

            {/* Ticket Section */}
            <div className="bg-gray-50 font-sans text-[#333] px-0 sm:px-6 py-6">
                <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left */}
                    <section className="lg:col-span-2 space-y-4">
                        <div ref={buyRef} className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 gap-3">
                            <h2 className="text-xl sm:text-2xl font-semibold">Ticket Information</h2>
                            {totalTickets > 0 && (
                                <button
                                    onClick={handlePayment}
                                    className="bg-red-500 text-white rounded px-4 py-2 font-semibold hover:bg-red-600 whitespace-nowrap">
                                    Pay ${totalAmount.toFixed(2)}
                                </button>
                            )}
                        </div>

                        <div className="space-y-4">
                            {ticketOptions.map((ticket, idx) => {
                                const isSoldOut = ticket.availableQuantity === 0 || ticket.status?.toLowerCase() === "sold out"
                                return (
                                    <div key={idx} className="bg-white border rounded-lg shadow-sm p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
                                                onChange={(e) => handleTicketChange(e, ticket)}
                                                className="border rounded px-2 py-1 text-sm w-full sm:w-auto"
                                                disabled={isSoldOut}
                                                value={selectedTickets[ticket.name]?.quantity || 0}
                                            >
                                                {Array.from({ length: ticket.availableQuantity + 1 }, (_, i) => (
                                                    <option key={i} value={i}>{i}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                )
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

                    {/* order summary */}
                    <aside className="lg:col-span-1 space-y-5 w-full lg:w-auto">
                        {totalTickets > 0 && (
                            <div className="bg-white border rounded w-full">
                                <div className="p-4 border-b">
                                    <h3 className="font-semibold">Order Summary</h3>
                                </div>
                                <div className="p-4 text-sm space-y-4">
                                    {Object.entries(selectedTickets).map(([name, ticket], idx) => (
                                        <div key={idx} className="flex justify-between mt-1">
                                            <span>{name}: {ticket.quantity} X ${ticket.price}</span>
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
                                        <button
                                            onClick={handlePayment}
                                            className="btn btn-error text-white px-4 py-2 rounded w-full sm:w-60 mt-2">
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
                                    src={
                                        event?.organizer?.image ||
                                        "https://img.stablecog.com/insecure/256w/aHR0cHM6Ly9iLnN0YWJsZWNvZy5jb20vNWM5NDNkOGUtNWM1OS00YTc5LWE4NjAtYWVkMmQzMGZiZGExLmpwZWc.webp"
                                    }
                                    className="h-20 w-20 bg-gray-200 rounded-full object-cover"
                                    alt={event?.organizer?.name || "Organizer"}
                                />
                                <div>
                                    <p className="font-medium">
                                        {event?.organizer?.name || "Organizer Name"}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {event?.organizer?.company || "Organizer Company"}
                                    </p>
                                </div>
                            </div>
                            <div className="text-center pb-3">
                                <button
                                    onClick={() =>
                                        alert(
                                            `Viewing ${event?.organizer?.name || "Organizer"}'s Profile`
                                        )
                                    }
                                    className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 rounded w-full sm:w-60 mt-2"
                                >
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
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-center md:text-left">
                        Venue Details
                    </h2>
                    <hr />
                    <h1 className="text-base sm:text-lg md:text-xl font-medium text-center mt-4">
                        {venue?.name || "Venue name not available"}
                    </h1>
                    <p className="text-center text-xs sm:text-sm md:text-base">
                        {venue?.address || "Address not available"}
                    </p>

                    {/* Transport Icons */}
                    <div className="flex flex-wrap justify-center gap-6 mt-6">
                        <div className="flex flex-col items-center">
                            <FaCar className="text-blue-600 text-4xl drop-shadow-md" />
                            <span className="text-sm mt-1 font-medium">Car</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <FaTrain className="text-green-600 text-4xl drop-shadow-md" />
                            <span className="text-sm mt-1 font-medium">Subway</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <RiMotorbikeFill className="text-red-500 text-4xl drop-shadow-md" />
                            <span className="text-sm mt-1 font-medium">Bike</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <MdElderlyWoman className="text-purple-600 text-4xl drop-shadow-md" />
                            <span className="text-sm mt-1 font-medium">Elderly</span>
                        </div>
                    </div>

                    {/* Google Maps Dynamic Image */}
                    <div className="mt-5">
                        <img
                            src={`https://maps.googleapis.com/maps/api/staticmap?center=28.6139,77.2090&zoom=13&size=600x300&markers=color:red%7Clabel:E%7C28.6139,77.2090&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`}
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


    </>
}

export default BookTicket
