// import React, { useRef, useState } from "react"
// import { FaCalendarAlt, FaCar } from "react-icons/fa"
// import { useParams } from "react-router-dom"
// import { useBookEventMutation, useGetEventByIdQuery } from "../redux/api/eventBookApi"
// import { FaTrainSubway } from "react-icons/fa6"
// import { RiMotorbikeFill } from "react-icons/ri"
// import { MdElderlyWoman } from "react-icons/md"
// import { useFormik } from "formik"

// const BookTicket = () => {
//     const { id } = useParams()

//     //  Fetch single event by ID
//     const { data, isLoading, isError } = useGetEventByIdQuery(id, { skip: !id })
//     const [bookTicket, { isError: isBookError, isLoading: isBookLoading, error, isSuccess: isBookSuccess }] = useBookEventMutation()
//     const event = data?.event || null

//     const [selectedTickets, setSelectedTickets] = useState({})
//     const [openIndex, setOpenIndex] = useState(null)

//     const buyRef = useRef(null)
//     const infoRef = useRef(null)
//     const venueRef = useRef(null)
//     const tcRef = useRef(null)
//     const faqRef = useRef(null)

//     const formik = useFormik({
//         initialValues: {},
//         onSubmit: async () => {
//             if (totalTickets === 0) {
//                 alert("Please select at least one ticket.");
//                 return;
//             }

//             const payload = {
//                 eventId: id,
//                 tickets: selectedTickets,
//                 totalAmount,
//             };

//             try {
//                 const response = await bookTicket(payload).unwrap();
//                 alert(response.message || "Ticket booked successfully!");
//                 setSelectedTickets({});
//             } catch (err) {
//                 alert(err?.data?.message || "Booking failed!");
//             }
//         },
//     });


//     const handleTicketChange = (e, ticketName, ticketPrice) => {
//         const quantity = parseInt(e.target.value)
//         setSelectedTickets(prev => {
//             const updated = { ...prev }
//             if (quantity === 0) delete updated[ticketName]
//             else updated[ticketName] = { price: ticketPrice, quantity }
//             return updated
//         })
//     }

//     const totalTickets = Object.values(selectedTickets).reduce((sum, t) => sum + t.quantity, 0)
//     const ticketTotal = Object.values(selectedTickets).reduce((sum, t) => sum + t.price * t.quantity, 0)
//     const transactionFee = event?.fees?.transactionFee || 0
//     const convenienceFee = event?.fees?.convenienceFee || 0
//     const totalAmount = ticketTotal + transactionFee + convenienceFee

//     const scrollToSection = (ref) => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" })
//     const toggle = (index) => setOpenIndex(openIndex === index ? null : index)

//     if (isLoading) return <p className="text-center py-10">Loading...</p>
//     if (isError || !event) return <p className="text-center py-10 text-red-500">Error loading event</p>

//     const ticketOptions = event?.ticketOptions || []
//     const venue = event?.venue || {}

//     const ticketPrices = ticketOptions.map(ticket => ticket.price)
//     const minPrice = Math.min(...ticketPrices)
//     const maxPrice = Math.max(...ticketPrices)
//     const ticketRange = minPrice === maxPrice ? ` $${minPrice}` : `$${minPrice} - $${maxPrice}`

//     const artists = [
//         {
//             name: "Sukhbir Singh",
//             date: "Sep 26 - Sep 28",
//             cities: "New York, North Brunswick",
//             img: "https://randomuser.me/api/portraits/men/32.jpg"
//         },
//         {
//             name: "Badshah",
//             date: "Aug 23 - Sep 20",
//             cities: "Bellevue, Fairfax, Trenton, Oakland, Kent...",
//             img: "https://randomuser.me/api/portraits/men/11.jpg"
//         },
//         {
//             name: "Bhoomi Trivedi",
//             date: "Aug 30 - Sep 20",
//             cities: "Round Rock, Houston, Frisco...",
//             img: "https://randomuser.me/api/portraits/women/20.jpg"
//         },
//         {
//             name: "Vatsala Patil",
//             date: "Sep 26 - Sep 27",
//             cities: "Old Bridge",
//             img: "https://randomuser.me/api/portraits/women/48.jpg"
//         },
//         {
//             name: "Parth Doshi",
//             date: "Sep 19 - Sep 21",
//             cities: "Florence, Edison",
//             img: "https://randomuser.me/api/portraits/men/60.jpg"
//         },
//     ]

//     const faqs = [
//         {
//             question: 'How do I purchase tickets?',
//             answer: (
//                 <>
//                     <p>There are several options when buying tickets:</p>
//                     <p className="mt-2">
//                         You can purchase any ticket to any events listed on our website. To buy, select the #
//                         of tickets you want to purchase in the dropdown of a specific event and follow the
//                         instructions.
//                     </p>
//                     <p className="mt-2">
//                         <strong>Email:</strong> Not sure where to go or how to buy tickets? Email us at{' '}
//                         <a href="mailto:us.sulekha@sulekha.com" className="text-blue-600 underline">
//                             us.sulekha@sulekha.com
//                         </a>.
//                     </p>
//                     <p className="mt-2">
//                         <strong>Phone:</strong> You can purchase tickets over the phone{' '}
//                         <a href="tel:1-512-788-5300" className="text-blue-600 underline">
//                             1-512-788-5300
//                         </a>{' '}
//                         (Mon to Fri – 11am to 8pm – EST)
//                     </p>
//                 </>
//             ),
//         },
//         {
//             question: "What is Sulekha's Refund Policy?",
//             answer: (
//                 <>
//                     <p>All sales are final.</p>
//                     <p className="mt-2">
//                         No refunds will be issued under any circumstance unless an event is canceled or rescheduled.
//                     </p>
//                     <p className="mt-2">
//                         If your event is canceled, in most cases you won't need to do anything. We will inform you about the cancelation and the face value of the ticket will be refunded to your account, <strong>NOT</strong> the transaction fee.
//                     </p>
//                     <p className="mt-2">By purchasing tickets you are accepting these terms.</p>
//                     <p className="mt-2">
//                         If you have any questions, please email us at{' '}
//                         <a href="mailto:us.sulekha@sulekha.com" className="text-blue-600 underline">
//                             us.sulekha@sulekha.com
//                         </a>{' '}
//                         or call{' '}
//                         <a href="tel:1-512-788-5300" className="text-blue-600 underline">
//                             1-512-788-5300
//                         </a>{' '}
//                         (Mon to Fri - 11am to 8pm – EST).
//                     </p>
//                 </>
//             ),
//         },
//     ]

//     return <>
//         <div className="px-4 sm:px-6 lg:px-20 max-w-screen-7xl mx-auto">
//             {/* Header */}
//             <div className="bg-white text-black">
//                 <img
//                     src={event?.coverImage || "/fallback.jpg"}
//                     alt={event?.title || "Event"}
//                     className="w-full object-cover h-60 sm:h-72 md:h-96"
//                 />
//                 <div className="flex flex-wrap gap-2 px-4 py-2">
//                     {event?.tags?.map((tag, idx) => (
//                         <span key={idx} className="bg-blue-600 text-white text-xs px-2 py-1 rounded break-words">{tag}</span>
//                     ))}
//                 </div>
//                 <div className="flex flex-col md:flex-row justify-between px-4 py-4 gap-4">
//                     <div>
//                         <h2 className="text-xl sm:text-2xl font-bold">{event?.title}</h2>
//                         <p className="text-sm">📅 {event?.date ? new Date(event.date).toLocaleDateString() : "Date not available"}</p>
//                         <a
//                             href={venue?.googleMapUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-600 break-words text-sm sm:text-base"
//                         >
//                             {venue?.name} - {venue?.address}
//                         </a>
//                     </div>
//                     <div className="flex flex-col items-start md:items-end gap-2 w-full sm:w-auto">
//                         <button className="w-full sm:w-40 h-12 bg-red-600 hover:bg-red-700 text-white rounded">Buy Tickets</button>
//                         <p className="text-sm text-gray-700 mt-2">
//                             Ticket range: <span className="font-bold text-black">{ticketRange}</span>
//                         </p>
//                     </div>
//                 </div>
//                 <div className="border-t px-4 py-2 text-sm text-gray-600 flex flex-wrap gap-4">
//                     <span>❤ Shortlist</span>
//                     <span>🗓 Add to Calendar</span>
//                     <span>🔗 Share</span>
//                 </div>
//             </div>

//             {/* Ticket Section */}
//             <div className="bg-gray-50 font-sans text-[#333] px-0 sm:px-6 py-6">
//                 <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
//                     {/* Left */}
//                     <section className="lg:col-span-2 space-y-4">
//                         <div className="bg-white border border-gray-300 rounded-md overflow-hidden">
//                             <div className="flex flex-wrap justify-between px-2 sm:px-4 py-3 text-sm font-medium">
//                                 <div className="flex flex-wrap gap-2">
//                                     <button onClick={() => scrollToSection(buyRef)} className="btn w-full sm:w-32">Buy tickets</button>
//                                     <button onClick={() => scrollToSection(infoRef)} className="btn w-full sm:w-32">Event Info</button>
//                                     <button onClick={() => scrollToSection(venueRef)} className="btn w-full sm:w-32">Venue</button>
//                                     <button onClick={() => scrollToSection(tcRef)} className="btn w-full sm:w-32">T & C</button>
//                                     <button onClick={() => scrollToSection(faqRef)} className="btn w-full sm:w-32">FAQ</button>
//                                 </div>
//                             </div>
//                         </div>

//                         <div ref={buyRef} className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 gap-3">
//                             <h2 className="text-xl sm:text-2xl font-semibold">Ticket Information</h2>
//                             {totalTickets > 0 && (
//                                 <button className="bg-red-500 text-white rounded px-4 py-2 font-semibold hover:bg-red-600 whitespace-nowrap">
//                                     Pay ${totalAmount.toFixed(2)}
//                                 </button>
//                             )}
//                         </div>

//                         <div className="space-y-4">
//                             {ticketOptions.map((ticket, idx) => {
//                                 const isSoldOut = ticket.availableQuantity === 0 || ticket.status?.toLowerCase() === "sold out"

//                                 return (
//                                     <div
//                                         key={idx}
//                                         className="bg-white border rounded-lg shadow-sm p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
//                                     >
//                                         <div className="flex-1 min-w-0">
//                                             <p className="text-sm font-semibold text-gray-800">{ticket.name}</p>
//                                             <p className="text-xs text-gray-500 truncate">${ticket.price}.00</p>
//                                         </div>

//                                         {/* ✅ Status Check */}
//                                         <div className="flex flex-col items-start sm:items-center">
//                                             {isSoldOut ? (
//                                                 <>
//                                                     <p className="text-sm font-semibold text-red-600">Sold Out</p>
//                                                     <p className="text-xs font-medium text-gray-500">Not available</p>
//                                                 </>
//                                             ) : (
//                                                 <>
//                                                     <p className="text-sm font-semibold text-green-600">${ticket.price}.00</p>
//                                                     <p className="text-xs font-medium text-green-600">Available ({ticket.availableQuantity})</p>
//                                                 </>
//                                             )}
//                                         </div>

//                                         <div className="w-full sm:w-auto">
//                                             <select
//                                                 onChange={(e) => handleTicketChange(e, ticket.name, ticket.price)}
//                                                 className="border rounded px-2 py-1 text-sm w-full sm:w-auto"
//                                                 disabled={isSoldOut}
//                                             >
//                                                 {Array.from({ length: ticket.availableQuantity + 1 }, (_, i) => (
//                                                     <option key={i} value={i}>{i}</option>
//                                                 ))}
//                                             </select>
//                                         </div>
//                                     </div>
//                                 )
//                             })}



//                             {totalTickets > 0 && (
//                                 <div className="bg-gray-400 p-5 flex flex-col sm:flex-row justify-between sm:justify-end items-center gap-3 mt-4">
//                                     <p className="text-sm text-center sm:text-right">
//                                         {totalTickets} Tickets / Total:{" "}
//                                         <span className="font-semibold">${totalAmount.toFixed(2)}</span>
//                                     </p>
//                                     <button className="bg-red-500 text-white px-4 py-2 rounded">
//                                         Pay ${(totalAmount + 3.14).toFixed(2)}
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     </section>

//                     {/* Sidebar */}
//                     <aside className="lg:col-span-1 space-y-5 w-full lg:w-auto">
//                         {totalTickets > 0 && (
//                             <div className="bg-white border rounded w-full">
//                                 <div className="p-4 border-b">
//                                     <h3 className="font-semibold">Order Summary</h3>
//                                 </div>
//                                 <div className="p-4 text-sm space-y-4">
//                                     {Object.entries(selectedTickets).map(([name, ticket], idx) => (
//                                         <div key={idx} className="flex justify-between mt-1">
//                                             <span>{name}: {ticket.quantity} X ${ticket.price}</span>
//                                             <span>${(ticket.price * ticket.quantity).toFixed(2)}</span>
//                                         </div>
//                                     ))}
//                                     {(transactionFee || convenienceFee) > 0 && (
//                                         <div className="flex justify-between mt-1">
//                                             <span>Transaction + Convenience Fee</span>
//                                             <span>${(transactionFee + convenienceFee).toFixed(2)}</span>
//                                         </div>
//                                     )}
//                                     <div className="flex justify-between mt-1 font-bold">
//                                         <span>Total</span>
//                                         <span>${totalAmount.toFixed(2)}</span>
//                                     </div>
//                                     <div className="text-center">
//                                         <button className="btn btn-error text-white px-4 py-2 rounded w-full sm:w-60 mt-2">
//                                             pay
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}

//                         {/* Organizer */}
//                         <div className="bg-white border rounded p-2">
//                             <h4 className="font-semibold mb-2 p-2">Organizer Details</h4>
//                             <hr />
//                             <div className="flex flex-col sm:flex-row items-center gap-3 p-3 text-center sm:text-left">
//                                 <img
//                                     src="https://images.unsplash.com/photo-1594919097231-33d4d04c7d39?q=80&w=1168&auto=format&fit=crop"
//                                     className="h-20 w-20 bg-gray-200 rounded-full"
//                                     alt="Organizer"
//                                 />
//                                 <div>
//                                     <p className="font-medium">Roshni Suchde</p>
//                                     <p className="text-xs text-gray-500">Roshni Productions LLC</p>
//                                 </div>
//                             </div>
//                             <div className="text-center pb-3">
//                                 <button className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 rounded w-full sm:w-60 mt-2">
//                                     View Organizer Profile
//                                 </button>
//                             </div>
//                         </div>
//                     </aside>
//                 </main>

//                 {/* Event Details */}
//                 <div ref={infoRef} className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 py-6">
//                     <div className="lg:col-span-2 bg-white border rounded shadow p-6">
//                         <h2 className="text-xl sm:text-2xl font-semibold mb-4">Event Details</h2>
//                         <hr />
//                         {event?.images?.length > 0 && (
//                             <div >
//                                 {event.images.map((imgUrl, idx) => (
//                                     <img
//                                         key={idx}
//                                         src={imgUrl}
//                                         alt={`Event Image ${idx + 1}`}
//                                         className="w-full h-230 object-cover rounded"
//                                     />
//                                 ))}
//                             </div>
//                         )}
//                         <p className="text-sm text-gray-700 leading-relaxed">
//                             {event?.description
//                                 ? event.description.split("\n").map((line, idx) => (
//                                     <React.Fragment key={idx}>{line}<br /></React.Fragment>
//                                 ))
//                                 : "Event details not available."}
//                         </p>
//                     </div>

//                     <div className="space-y-3">
//                         {["Artist Concerts & Tour Dates", "Navratri Dandiya Event Tickets in New Jersey Area"].map((title, idx) => (
//                             <div key={idx} className="bg-white border rounded shadow p-6">
//                                 <h2 className="text-lg sm:text-xl font-semibold mb-1">{title}</h2>
//                                 <p className="text-xs text-gray-500 mb-4">Events you can’t miss</p>
//                                 <hr />
//                                 <div className="space-y-4 mt-2">
//                                     {artists.map((artist, index) => (
//                                         <div key={index} className="flex items-center gap-4 border-b pb-3">
//                                             <img src={artist.img} alt={artist.name} className="w-14 h-14 rounded-full object-cover" />
//                                             <div className="text-sm">
//                                                 <p className="font-semibold text-blue-600">{artist.name}</p>
//                                                 <p className="text-gray-600 text-xs">Tour Date: {artist.date}</p>
//                                                 <p className="text-gray-600 text-xs truncate">Tour Cities: {artist.cities}</p>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                                 <div className="text-right mt-4">
//                                     <a href="#" className="text-blue-600 text-sm hover:underline">
//                                         View More Event Artists Tours →
//                                     </a>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Venue Details */}
//                 <div ref={venueRef} className="bg-white border rounded shadow mb-5 p-3 max-w-7xl mx-auto">
//                     <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-center md:text-left">Venue Details</h2>
//                     <hr />
//                     <h1 className="text-base sm:text-lg md:text-xl font-medium text-center mt-4">
//                         {venue?.name || "Venue name not available"}
//                     </h1>
//                     <p className="text-center text-xs sm:text-sm md:text-base">
//                         {venue?.address || "Address not available"}
//                     </p>

//                     <div className="flex flex-wrap justify-center gap-3 mt-4">
//                         {venue?.transportModes?.car && <FaCar className="border rounded-2xl p-3 bg-amber-400 text-lg sm:text-xl" />}
//                         {venue?.transportModes?.subway && <FaTrainSubway className="border rounded-2xl p-3 bg-amber-400 text-lg sm:text-xl" />}
//                         {venue?.transportModes?.bike && <RiMotorbikeFill className="border rounded-2xl p-3 bg-amber-400 text-lg sm:text-xl" />}
//                         {venue?.transportModes?.elderlyFriendly && <MdElderlyWoman className="border rounded-2xl p-3 bg-amber-400 text-lg sm:text-xl" />}
//                     </div>

//                     <div className="mt-5">
//                         <img
//                             src="https://maps.googleapis.com/maps/api/staticmap?center=Secaucus%20Rec%20Center,1200%20Koelle%20Boulevard,Secaucus,NJ,07094&markers=color:red%7Clabel:C%7CSecaucus%20Rec%20Center,1200%20Koelle%20Boulevard,Secaucus,NJ,07094&zoom=13&size=600x300&maptype=roadmap&key=AIzaSyCUOoO5uqFk21NtvnLr6YSjdFkbCTpdldQ"
//                             alt="Event Location"
//                             className="w-full h-auto border rounded mb-1"
//                         />
//                     </div>

//                 </div>


//                 {/* About Section */}
//                 <div className="bg-white border rounded shadow mb-5 p-3 max-w-7xl mx-auto">
//                     <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-center md:text-left">About this event</h2>
//                     <hr />
//                     <div className="space-y-4 mt-4 text-sm text-gray-700">
//                         <h1 className="font-bold">Experience the Vibrancy of Dandiya Dhamaka 2025 in New Jersey</h1>
//                         <p>Mark your calendars for the night of September 20th, 2025, as the Indian Caucus of Secaucus proudly presents the much-awaited Dandiya Dhamaka! This cultural extravaganza in New Jersey is a perfect blend of Hindi, Gujarati, and multilingual performances that will keep your feet tapping all night long. Celebrate Navratri/Dandiya like never before with a night filled with live concerts, delectable food and drinks, and a dazzling display of colorful traditional attire.</p>

//                         <h1 className="font-bold">Immerse Yourself in a Multicultural Musical Fiesta</h1>
//                         <p>Although the artist line-up for Dandiya Dhamaka 2025 remains a surprise, expect nothing short of excellence. Our events have always been known for featuring talented artists who beautifully fuse traditional Indian music with contemporary rhythms. The artists' enchanting performances will surely captivate your senses and leave you yearning for more. So, join us for an unforgettable evening of music, dance, and celebration.</p>

//                         <h1 className="font-bold">Join Us at the Scenic Secaucus Rec Center</h1>
//                         <p>The Secaucus Rec Center, located at 1200 Koelle Boulevard, in the heart of Secaucus, NJ, United States, is our chosen venue for this grand event. Known for its safety and easy accessibility, this venue offers an ideal environment for our guests to enjoy the evening. Parking won't be an issue as ample spaces are available. While you're in the area, you might also want to try out some of the nearby Indian restaurants for a complete cultural experience.</p>

//                         <h1 className="font-bold">Secure Your Spot with Our Tiered General Admission Tickets</h1>
//                         <p>We offer a range of pricing options to suit everyone's budget. General Admission tickets start at $25.00, with additional tiers priced at $30.00, $35.00, $40.00, $45.00, and $50.00. Secure your spot today and get ready to immerse yourself in an evening of unforgettable cultural delight at Dandiya Dhamaka 2025!</p>
//                     </div>
//                 </div>

//                 {/* Terms & Conditions */}
//                 <div ref={tcRef} className="bg-white border rounded shadow mb-5 p-3 max-w-7xl mx-auto">
//                     <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-center md:text-left">Terms & Conditions</h2>
//                     <hr />
//                     <div className="mt-4 text-sm md:text-base text-gray-700 space-y-2 px-4 md:px-6">
//                         <ol className="list-decimal space-y-2 pl-4">
//                             <li>Tickets once purchased cannot be modified or cancelled. Refunds will be initiated only in case of event cancellation.</li>
//                             <li>Transaction fee per ticket may be levied. Please check the total amount before payment.</li>
//                             <li>Organizers hold the right to deny late entry to the event. Hence, we recommend reaching the venue an hour before the event starts to ensure smooth entry.</li>
//                             <li>If an event is canceled/postponed, Sulekha will refund only the face value of the ticket and NOT the transaction fee.</li>
//                             <li>Every venue has its own rules and regulations. They hold the right to deny entry on the basis of the same.</li>
//                             <li>These terms and conditions are subject to change from time to time at the discretion of the organiser.</li>
//                             <li><strong>Important Alert:</strong> Tickets purchased from third parties are not authorized by Sulekha and will be denied entry. Buy only from Sulekha to ensure valid access.</li>
//                         </ol>
//                     </div>
//                 </div>

//                 {/* FAQ */}
//                 <div ref={faqRef} className="bg-white border rounded shadow mb-5 p-3 max-w-7xl mx-auto">
//                     <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-center md:text-left">FAQ's</h2>
//                     <hr />
//                     <div className="divide-y">
//                         {faqs.map((faq, index) => (
//                             <div key={index} className="px-6 py-4">
//                                 <button
//                                     onClick={() => toggle(index)}
//                                     className="w-full text-left text-lg font-medium focus:outline-none"
//                                 >
//                                     {faq.question}
//                                 </button>
//                                 {openIndex === index && <div className="mt-2 text-gray-700 text-sm">{faq.answer}</div>}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </>
// }

// export default BookTicket




// import React, { useRef, useState } from "react"
// import { FaCar, FaTrain } from "react-icons/fa"
// import { useParams } from "react-router-dom"
// import { useGetEventByIdQuery } from "../redux/api/eventBookApi"
// import { FaTrainSubway } from "react-icons/fa6"
// import { RiMotorbikeFill } from "react-icons/ri"
// import { MdElderlyWoman } from "react-icons/md"
// import Footer from "./Footer"
// import FAQ from "./FAQ"
// import TermAndCon from "./TermAndCon"
// import AboutSection from "./AboutSection"
// import Artist from "./Artist"
// import { useBookingPaymentMutation, useVerifyPaymentMutation } from "../redux/api/razorpayApi"
// import { useSelector } from "react-redux"

// const BookTicket = () => {
//     const { id } = useParams()
//     const { data, isLoading, isError } = useGetEventByIdQuery(id, { skip: !id })
//     const event = data?.event || null

//     const [selectedTickets, setSelectedTickets] = useState({})

//     const buyRef = useRef(null)
//     const infoRef = useRef(null)
//     const venueRef = useRef(null)
//     const tcRef = useRef(null)
//     const faqRef = useRef(null)

//     const scrollToSection = (ref) => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" })

//     const handleTicketChange = (e, ticket) => {
//         const quantity = parseInt(e.target.value)
//         setSelectedTickets(prev => {
//             const updated = { ...prev }
//             if (quantity === 0) delete updated[ticket.name]
//             else updated[ticket.name] = { price: ticket.price, quantity }
//             return updated
//         })
//     }

//     const [bookingPayment] = useBookingPaymentMutation()
//     const [verifyPayment] = useVerifyPaymentMutation()
//     const { customer } = useSelector(state => state.Auth)

//     const handlePayment = async () => {
//         try {
//             if (!customer?.result?._id) {
//                 alert("⚠️ Please login as customer first")
//                 return
//             }

//             if (!selectedTickets || Object.keys(selectedTickets).length === 0) {
//                 alert("⚠️ Please select at least one ticket")
//                 return
//             }

//             // Backend ke hisaab se 'ticketName' rakh rahe hain
//             const ticketsPayload = Object.entries(selectedTickets).map(([name, t]) => ({
//                 ticketName: name,
//                 quantity: t.quantity,
//                 price: t.price,
//             }))

//             const ticketTotal = ticketsPayload.reduce((sum, t) => sum + t.price * t.quantity, 0)
//             const transactionFee = event?.fees?.transactionFee || 0
//             const convenienceFee = event?.fees?.convenienceFee || 0
//             const totalAmount = ticketTotal + transactionFee + convenienceFee

//             console.log("Booking Payload:", {
//                 userId: customer.result._id,
//                 eventId: event._id,
//                 tickets: ticketsPayload,
//                 amount: totalAmount,
//             })

//             const order = await bookingPayment({
//                 userId: customer.result._id,
//                 eventId: event._id,
//                 tickets: ticketsPayload,
//                 amount: totalAmount,
//             }).unwrap()

//             console.log("Order Response:", order)

//             const options = {
//                 key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//                 amount: order.amount, // in paise
//                 currency: order.currency,
//                 name: "Event Booking",
//                 description: "Ticket Payment",
//                 order_id: order.orderId, // <- backend se jo order create hua tha, wahi
//                 handler: async function (response) {
//                     console.log("Razorpay Response:", response);

//                     const payload = {
//                         razorpay_order_id: response.razorpay_order_id,
//                         razorpay_payment_id: response.razorpay_payment_id,
//                         razorpay_signature: response.razorpay_signature
//                     };

//                     console.log("Payload to verifyPayment:", payload);

//                     const verifyRes = await verifyPayment(payload).unwrap();
//                     if (verifyRes.booking && verifyRes.booking.status === "paid") {
//                         alert("✅ Payment Successful! Tickets booked.")
//                         refetch()
//                     } else {
//                         alert("❌ Payment Failed!");
//                     }
//                 },
//                 prefill: {
//                     name: customer.result.name,
//                     email: customer.result.email,
//                     contact: customer.result.mobile?.toString() || "",
//                 },
//                 theme: { color: "#3399cc" },
//             };

//             const razorpay = new window.Razorpay(options);
//             razorpay.open()


//         } catch (err) {
//             console.error("Payment Error:", err)
//             alert("❌ Payment could not be initiated!")
//         }
//     }


//     const totalTickets = Object.values(selectedTickets).reduce((sum, t) => sum + t.quantity, 0)
//     const ticketTotal = Object.values(selectedTickets).reduce((sum, t) => sum + t.price * t.quantity, 0)
//     const transactionFee = event?.fees?.transactionFee || 0
//     const convenienceFee = event?.fees?.convenienceFee || 0
//     const totalAmount = ticketTotal + transactionFee + convenienceFee


//     if (isLoading) return <p className="text-center py-10">Loading...</p>
//     if (isError || !event) return <p className="text-center py-10 text-red-500">Error loading event</p>

//     const ticketOptions = event?.ticketOptions || []
//     const venue = event?.venue || {}
//     const ticketPrices = ticketOptions.map(ticket => ticket.price)
//     const minPrice = Math.min(...ticketPrices)
//     const maxPrice = Math.max(...ticketPrices)
//     const ticketRange = minPrice === maxPrice ? ` $${minPrice}` : `$${minPrice} - $${maxPrice}`

//     return <>
//         <div className="px-4 sm:px-6 lg:px-20 max-w-screen-7xl mx-auto">
//             {/* Header */}
//             <div className="bg-white text-black">
//                 <img
//                     src={event?.coverImage || "/fallback.jpg"}
//                     alt={event?.title || "Event"}
//                     className="w-full object-cover h-60 sm:h-72 md:h-96"
//                 />
//                 <div className="flex flex-wrap gap-2 px-4 py-2">
//                     {event?.tags?.map((tag, idx) => (
//                         <span key={idx} className="bg-blue-600 text-white text-xs px-2 py-1 rounded break-words">{tag}</span>
//                     ))}
//                 </div>
//                 <div className="flex flex-col md:flex-row justify-between px-4 py-4 gap-4">
//                     <div>
//                         <h2 className="text-xl sm:text-2xl font-bold">{event?.title}</h2>
//                         <p className="text-sm">📅 {event?.date ? new Date(event.date).toLocaleDateString() : "Date not available"}</p>
//                         <a
//                             href={venue?.googleMapUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-600 break-words text-sm sm:text-base"
//                         >
//                             {venue?.name} - {venue?.address}
//                         </a>
//                     </div>
//                     <div className="flex flex-col items-start md:items-end gap-2 w-full sm:w-auto">
//                         <button className="w-full sm:w-40 h-12 bg-red-600 hover:bg-red-700 text-white rounded">Buy Tickets</button>
//                         <p className="text-sm text-gray-700 mt-2">
//                             Ticket range: <span className="font-bold text-black">{ticketRange}</span>
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             {/* Ticket Section */}
//             <div className="bg-gray-50 font-sans text-[#333] px-0 sm:px-6 py-6">
//                 <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
//                     {/* Left */}
//                     <section className="lg:col-span-2 space-y-4">
//                         <div ref={buyRef} className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 gap-3">
//                             <h2 className="text-xl sm:text-2xl font-semibold">Ticket Information</h2>
//                             {totalTickets > 0 && (
//                                 <button
//                                     onClick={handlePayment}
//                                     className="bg-red-500 text-white rounded px-4 py-2 font-semibold hover:bg-red-600 whitespace-nowrap">
//                                     Pay ${totalAmount.toFixed(2)}
//                                 </button>
//                             )}
//                         </div>

//                         <div className="space-y-4">
//                             {ticketOptions.map((ticket, idx) => {
//                                 const isSoldOut = ticket.availableQuantity === 0 || ticket.status?.toLowerCase() === "sold out"
//                                 return (
//                                     <div key={idx} className="bg-white border rounded-lg shadow-sm p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//                                         <div className="flex-1 min-w-0">
//                                             <p className="text-sm font-semibold text-gray-800">{ticket.name}</p>
//                                             <p className="text-xs text-gray-500 truncate">${ticket.price}.00</p>
//                                         </div>
//                                         <div className="flex flex-col items-start sm:items-center">
//                                             {isSoldOut ? (
//                                                 <>
//                                                     <p className="text-sm font-semibold text-red-600">Sold Out</p>
//                                                     <p className="text-xs font-medium text-gray-500">Not available</p>
//                                                 </>
//                                             ) : (
//                                                 <>
//                                                     <p className="text-sm font-semibold text-green-600">${ticket.price}.00</p>
//                                                     <p className="text-xs font-medium text-green-600">Available ({ticket.availableQuantity})</p>
//                                                 </>
//                                             )}
//                                         </div>
//                                         <div className="w-full sm:w-auto">
//                                             <select
//                                                 onChange={(e) => handleTicketChange(e, ticket)}
//                                                 className="border rounded px-2 py-1 text-sm w-full sm:w-auto"
//                                                 disabled={isSoldOut}
//                                                 value={selectedTickets[ticket.name]?.quantity || 0}
//                                             >
//                                                 {Array.from({ length: ticket.availableQuantity + 1 }, (_, i) => (
//                                                     <option key={i} value={i}>{i}</option>
//                                                 ))}
//                                             </select>
//                                         </div>
//                                     </div>
//                                 )
//                             })}

//                             {totalTickets > 0 && (
//                                 <div className="bg-gray-400 p-5 flex flex-col sm:flex-row justify-between sm:justify-end items-center gap-3 mt-4">
//                                     <p className="text-sm text-center sm:text-right">
//                                         {totalTickets} Tickets / Total: <span className="font-semibold">${totalAmount.toFixed(2)}</span>
//                                     </p>
//                                     <button
//                                         onClick={handlePayment}
//                                         className="bg-red-500 text-white px-4 py-2 rounded">
//                                         Pay ${totalAmount.toFixed(2)}
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     </section>

//                     {/* Sidebar */}
//                     <aside className="lg:col-span-1 space-y-5 w-full lg:w-auto">
//                         {totalTickets > 0 && (
//                             <div className="bg-white border rounded w-full">
//                                 <div className="p-4 border-b">
//                                     <h3 className="font-semibold">Order Summary</h3>
//                                 </div>
//                                 <div className="p-4 text-sm space-y-4">
//                                     {Object.entries(selectedTickets).map(([name, ticket], idx) => (
//                                         <div key={idx} className="flex justify-between mt-1">
//                                             <span>{name}: {ticket.quantity} X ${ticket.price}</span>
//                                             <span>${(ticket.price * ticket.quantity).toFixed(2)}</span>
//                                         </div>
//                                     ))}
//                                     {(transactionFee || convenienceFee) > 0 && (
//                                         <div className="flex justify-between mt-1">
//                                             <span>Transaction + Convenience Fee</span>
//                                             <span>${(transactionFee + convenienceFee).toFixed(2)}</span>
//                                         </div>
//                                     )}
//                                     <div className="flex justify-between mt-1 font-bold">
//                                         <span>Total</span>
//                                         <span>${totalAmount.toFixed(2)}</span>
//                                     </div>
//                                     <div className="text-center">
//                                         <button
//                                             onClick={handlePayment}
//                                             className="btn btn-error text-white px-4 py-2 rounded w-full sm:w-60 mt-2">
//                                             Pay ${totalAmount.toFixed(2)}
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}

//                         {/* Organizer */}
//                         <div className="bg-white border rounded p-2">
//                             <h4 className="font-semibold mb-2 p-2">Organizer Details</h4>
//                             <hr />
//                             <div className="flex flex-col sm:flex-row items-center gap-3 p-3 text-center sm:text-left">
//                                 <img
//                                     src={
//                                         event?.organizer?.image ||
//                                         "https://via.placeholder.com/150"
//                                     }
//                                     className="h-20 w-20 bg-gray-200 rounded-full object-cover"
//                                     alt={event?.organizer?.name || "Organizer"}
//                                 />
//                                 <div>
//                                     <p className="font-medium">
//                                         {event?.organizer?.name || "Organizer Name"}
//                                     </p>
//                                     <p className="text-xs text-gray-500">
//                                         {event?.organizer?.company || "Organizer Company"}
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className="text-center pb-3">
//                                 <button
//                                     onClick={() =>
//                                         alert(
//                                             `Viewing ${event?.organizer?.name || "Organizer"}'s Profile`
//                                         )
//                                     }
//                                     className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 rounded w-full sm:w-60 mt-2"
//                                 >
//                                     View Organizer Profile
//                                 </button>
//                             </div>
//                         </div>

//                     </aside>
//                 </main>

//                 {/* Event Details */}
//                 <div ref={infoRef} className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 py-6">
//                     <div className="lg:col-span-2 bg-white border rounded shadow p-6">
//                         <h2 className="text-xl sm:text-2xl font-semibold mb-4">Event Details</h2>
//                         <hr />
//                         {event?.images?.length > 0 && (
//                             <div >
//                                 {event.images.map((imgUrl, idx) => (
//                                     <img
//                                         key={idx}
//                                         src={imgUrl}
//                                         alt={`Event Image ${idx + 1}`}
//                                         className="w-full h-230 object-cover mt-5 rounded"
//                                     />
//                                 ))}
//                             </div>
//                         )}
//                         <p className="text-sm text-gray-700 leading-relaxed">
//                             {event?.description
//                                 ? event.description.split("\n").map((line, idx) => (
//                                     <React.Fragment key={idx}>{line}<br /></React.Fragment>
//                                 ))
//                                 : "Event details not available."}
//                         </p>
//                     </div>

//                     <div className="space-y-3">
//                         <Artist />
//                     </div>
//                 </div>

//                 {/* Venue Details */}
//                 <div
//                     ref={venueRef}
//                     className="bg-white border rounded shadow mb-5 p-3 max-w-7xl mx-auto"
//                 >
//                     <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-center md:text-left">
//                         Venue Details
//                     </h2>
//                     <hr />
//                     <h1 className="text-base sm:text-lg md:text-xl font-medium text-center mt-4">
//                         {venue?.name || "Venue name not available"}
//                     </h1>
//                     <p className="text-center text-xs sm:text-sm md:text-base">
//                         {venue?.address || "Address not available"}
//                     </p>

//                     {/* Transport Icons */}
//                     <div className="flex flex-wrap justify-center gap-6 mt-6">
//                         {/* Car */}
//                         <div className="flex flex-col items-center">
//                             <FaCar className="text-blue-600 text-4xl drop-shadow-md" />
//                             <span className="text-sm mt-1 font-medium">Car</span>
//                         </div>

//                         {/* Subway / Train */}
//                         <div className="flex flex-col items-center">
//                             <FaTrain className="text-green-600 text-4xl drop-shadow-md" />
//                             <span className="text-sm mt-1 font-medium">Subway</span>
//                         </div>

//                         {/* Bike */}
//                         <div className="flex flex-col items-center">
//                             <RiMotorbikeFill
//                                 className="text-red-500 text-4xl drop-shadow-md" />
//                             <span className="text-sm mt-1 font-medium">Bike</span>
//                         </div>

//                         {/* Elderly Friendly */}
//                         <div className="flex flex-col items-center">
//                             <MdElderlyWoman className="text-purple-600 text-4xl drop-shadow-md" />
//                             <span className="text-sm mt-1 font-medium">Elderly</span>
//                         </div>
//                     </div>

//                     {/* Google Maps Dynamic Image */}
//                     {venue?.googleMapUrl ? (
//                         <div className="mt-5">
//                             <img
//                                 src={venue.googleMapUrl}
//                                 alt="Event Location"
//                                 className="w-full h-auto border rounded mb-1"
//                             />
//                         </div>
//                     ) : (
//                         venue?.address && (
//                             <div className="mt-5">
//                                 <img
//                                     src={`https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(
//                                         venue.name + "," + venue.address
//                                     )}&markers=color:red%7Clabel:V%7C${encodeURIComponent(
//                                         venue.name + "," + venue.address
//                                     )}&zoom=13&size=600x300&maptype=roadmap&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY
//                                         }`}
//                                     alt="Event Location"
//                                     className="w-full h-auto border rounded mb-1"
//                                 />
//                             </div>
//                         )
//                     )}

//                 </div>


//                 {/* About Section */}
//                 <div >
//                     <AboutSection />
//                 </div>

//                 {/* Terms & Conditions */}
//                 <div ref={tcRef} >
//                     <TermAndCon />
//                 </div>

//                 {/* FAQ */}
//                 <div ref={faqRef} >
//                     <FAQ />
//                 </div>
//             </div>
//         </div>


//     </>
// }

// export default BookTicket







// import React, { useEffect, useState } from "react"
// import { useFormik, FieldArray, FormikProvider } from "formik"
// import * as yup from "yup"
// import clsx from "clsx"
// import { useAddEventMutation } from "../redux/api/eventBookApi"
// import { toast } from "react-toastify"
// import { useNavigate } from "react-router-dom"

// const AddEvent = () => {
//     const [addEvent, { isLoading, isError, error, isSuccess }] =
//         useAddEventMutation()
//     const navigate = useNavigate()
//     const [coverPreview, setCoverPreview] = useState(null)
//     const [organizerPreview, setOrganizerPreview] = useState(null)

//     const formik = useFormik({
//         initialValues: {
//             name: "",
//             description: "",
//             coverImage: null,
//             images: [],
//             date: "",
//             time: "",
//             venue: { name: "", address: "", googleMapUrl: "" },
//             ticketOptions: [{ name: "", price: "", availableQuantity: "" }],
//             fees: { transactionFee: 2.14, convenienceFee: 1.0 },
//             organizer: { name: "", company: "", image: null },
//             tags: [""],
//             category: "upcomingevent",
//         },
//         validationSchema: yup.object({
//             name: yup.string().required("Event name is required"),
//             description: yup.string().required("Description is required"),
//             coverImage: yup.mixed().required("Cover image is required"),
//             date: yup.date().required("Date is required"),
//             time: yup.string().required("Time is required"),
//             venue: yup.object({
//                 name: yup.string().required("Venue name is required"),
//                 address: yup.string().required("Address is required"),
//                 googleMapUrl: yup.string().url("Must be a valid URL"),
//             }),
//             organizer: yup.object({
//                 name: yup.string().required("Organizer name is required"),
//                 company: yup.string(),
//             }),
//             ticketOptions: yup.array().of(
//                 yup.object({
//                     name: yup.string().required("Ticket type required"),
//                     price: yup.number().required("Price required"),
//                     availableQuantity: yup.number().required("Quantity required"),
//                 })
//             ),
//             category: yup
//                 .string()
//                 .oneOf(["upcomingevent", "fetureEvent"])
//                 .required("Select category"),
//         }),
//         onSubmit: async (values, { resetForm }) => {
//             try {
//                 const formData = new FormData()
//                 formData.append("name", values.name)
//                 formData.append("description", values.description)
//                 formData.append("date", values.date)
//                 formData.append("time", values.time)
//                 formData.append("category", values.category)
//                 formData.append("coverImage", values.coverImage)
//                 if (values.organizer.image) {
//                     formData.append("organizerImage", values.organizer.image)
//                 }
//                 values.images.forEach((img) => {
//                     formData.append("images", img)
//                 })
//                 formData.append("venue", JSON.stringify(values.venue))
//                 formData.append(
//                     "organizer",
//                     JSON.stringify({
//                         name: values.organizer.name,
//                         company: values.organizer.company,
//                     })
//                 )
//                 formData.append("ticketOptions", JSON.stringify(values.ticketOptions))
//                 formData.append("tags", JSON.stringify(values.tags))
//                 formData.append("fees", JSON.stringify(values.fees))

//                 await addEvent(formData).unwrap()
//                 toast.success("🎉 Event added successfully!")
//                 resetForm()
//                 setCoverPreview(null)
//                 setOrganizerPreview(null)
//             } catch (err) {
//                 console.error("Failed to add event: ", err)
//             }
//         },
//     })

//     const handleClass = (key) =>
//         clsx(
//             "w-full border rounded-lg p-2 focus:outline-none focus:ring-2 transition-all",
//             formik.touched[key] && formik.errors[key] && "border-red-500 focus:ring-red-400",
//             formik.touched[key] && !formik.errors[key] && "border-green-500 focus:ring-green-400"
//         )

//     const handleCoverChange = (e) => {
//         const file = e.currentTarget.files[0]
//         formik.setFieldValue("coverImage", file)
//         if (file) setCoverPreview(URL.createObjectURL(file))
//     }

//     const handleOrganizerChange = (e) => {
//         const file = e.currentTarget.files[0]
//         formik.setFieldValue("organizer.image", file)
//         if (file) setOrganizerPreview(URL.createObjectURL(file))
//     }

//     const handleImagesChange = (e) => {
//         const files = Array.from(e.currentTarget.files)
//         formik.setFieldValue("images", files)
//     }

//     useEffect(() => {
//         if (isSuccess) navigate("/admin/event-list")
//     }, [isSuccess])

//     return <>
//         <div className="md:ml-[250px] p-6">
//             <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-6 ">
//                 <div className="w-full max-w-7xl bg-white shadow-2xl rounded-2xl p-10 ">
//                     <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-10">
//                         🎟️ Add Event
//                     </h2>

//                     <form onSubmit={formik.handleSubmit} className="space-y-10">
//                         {/* Event Info + Organizer with Venue below Organizer */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                             {/* Event Info */}
//                             <div className="border p-6 rounded-xl shadow-sm bg-gray-50 space-y-4">
//                                 <h3 className="text-lg font-bold text-indigo-600">📌 Event Info</h3>
//                                 <input placeholder="Event Name" {...formik.getFieldProps("name")} className={handleClass("name")} />
//                                 <textarea rows={3} placeholder="Description" {...formik.getFieldProps("description")} className={handleClass("description")} />
//                                 <input type="date" {...formik.getFieldProps("date")} className={handleClass("date")} />
//                                 <input type="time" {...formik.getFieldProps("time")} className={handleClass("time")} />
//                                 <select {...formik.getFieldProps("category")} className={handleClass("category")}>
//                                     <option value="upcomingevent">Upcoming Event</option>
//                                     <option value="fetureEvent">Feature Event</option>
//                                 </select>
//                                 <input type="file" accept="image/*" onChange={handleCoverChange} className="w-full border rounded-lg p-2" />
//                                 {coverPreview && <img src={coverPreview} alt="Cover Preview" className="mt-3 w-40 h-32 object-cover rounded-lg shadow" />}
//                                 <input type="file" accept="image/*" multiple onChange={handleImagesChange} className="w-full border rounded-lg p-2" />
//                             </div>

//                             {/* Organizer + Venue */}
//                             <div className="space-y-6">
//                                 <div className="border p-6 rounded-xl shadow-sm bg-gray-50 space-y-4">
//                                     <h3 className="text-lg font-bold text-indigo-600">👤 Organizer</h3>
//                                     <input placeholder="Organizer Name" {...formik.getFieldProps("organizer.name")} className={handleClass("organizer.name")} />
//                                     <input placeholder="Company" {...formik.getFieldProps("organizer.company")} className={handleClass("organizer.company")} />
//                                     <input type="file" accept="image/*" onChange={handleOrganizerChange} className="w-full border rounded-lg p-2" />
//                                     {organizerPreview && <img src={organizerPreview} alt="Organizer Preview" className="mt-3 w-32 h-32 object-cover rounded-lg shadow" />}
//                                 </div>

//                                 {/* Venue inside right column below organizer */}
//                                 <div className="border p-6 rounded-xl shadow-sm bg-gray-50 space-y-4">
//                                     <h3 className="text-lg font-bold text-indigo-600">📍 Venue Details</h3>
//                                     <input placeholder="Venue Name" {...formik.getFieldProps("venue.name")} className={handleClass("venue.name")} />
//                                     <input placeholder="Address" {...formik.getFieldProps("venue.address")} className={handleClass("venue.address")} />
//                                     <input placeholder="Google Map URL" {...formik.getFieldProps("venue.googleMapUrl")} className={handleClass("venue.googleMapUrl")} />
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Tickets + Tags side by side */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                             {/* Tickets */}
//                             <FormikProvider value={formik}>
//                                 <FieldArray name="ticketOptions">
//                                     {({ push, remove }) => (
//                                         <div className="border p-6 rounded-xl shadow-sm bg-gray-50 space-y-4">
//                                             <h3 className="text-lg font-bold text-indigo-600 mb-2">🎫 Ticket Options</h3>
//                                             {formik.values.ticketOptions.map((ticket, index) => (
//                                                 <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
//                                                     <input placeholder="Type" {...formik.getFieldProps(`ticketOptions.${index}.name`)} className={handleClass(`ticketOptions.${index}.name`)} />
//                                                     <input type="number" placeholder="Price" {...formik.getFieldProps(`ticketOptions.${index}.price`)} className={handleClass(`ticketOptions.${index}.price`)} />
//                                                     <input type="number" placeholder="Quantity" {...formik.getFieldProps(`ticketOptions.${index}.availableQuantity`)} className={handleClass(`ticketOptions.${index}.availableQuantity`)} />
//                                                     <div className="flex space-x-2">
//                                                         <button type="button" className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg" onClick={() => push({ name: "", price: "", availableQuantity: "" })}>+</button>
//                                                         {index > 0 && (
//                                                             <button type="button" className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg" onClick={() => remove(index)}>-</button>
//                                                         )}
//                                                     </div>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     )}
//                                 </FieldArray>
//                             </FormikProvider>

//                             {/* Tags */}
//                             <FormikProvider value={formik}>
//                                 <FieldArray name="tags">
//                                     {({ push, remove }) => (
//                                         <div className="border p-6 rounded-xl shadow-sm bg-gray-50 space-y-4">
//                                             <h3 className="text-lg font-bold text-indigo-600 mb-2">🏷️ Tags</h3>
//                                             {formik.values.tags.map((tag, index) => (
//                                                 <div key={index} className="flex space-x-2 items-center">
//                                                     <input {...formik.getFieldProps(`tags.${index}`)} className={handleClass(`tags.${index}`)} />
//                                                     <button type="button" className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg" onClick={() => push("")}>+</button>
//                                                     {index > 0 && (
//                                                         <button type="button" className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg" onClick={() => remove(index)}>-</button>
//                                                     )}
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     )}
//                                 </FieldArray>
//                             </FormikProvider>
//                         </div>

//                         {/* Submit */}
//                         <button
//                             type="submit"
//                             disabled={isLoading}
//                             className={`w-full bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 ${isLoading ? "bg-gray-400" : "bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600"
//                                 }`}
//                         >
//                             {isLoading ? "Submitting..." : "🚀 Submit Event"}
//                         </button>

//                         {isError && <p className="text-red-500 mt-2">❌ {error?.data?.message || "Failed to add event"}</p>}
//                         {isSuccess && <p className="text-green-500 mt-2">✅ Event added successfully!</p>}
//                     </form>
//                 </div>
//             </div>
//         </div>
//     </>
// }

// export default AddEvent


// import React, { useEffect, useState } from "react"
// import { useGetAuthEventQuery } from "../redux/api/authApi"
// import { useDeleteEventMutation, useUpdateEventMutation } from "../redux/api/eventBookApi"
// import { toast } from "react-toastify"
// import { useFormik } from "formik"
// import * as yup from "yup"
// import clsx from "clsx"
// import BookTicketList from "./BookTicketList" // ✅ Import BookTicketList

// const AllEventList = () => {
//     const { data, isLoading, refetch, isError } = useGetAuthEventQuery()
//     const [deleteEvent,
//         { isLoading: isDeleteLoading, isSuccess: isDeleteSuccess }
//     ] = useDeleteEventMutation()
//     const [updateEvent, { isSuccess: isUpdateSuccess }] = useUpdateEventMutation()

//     const [editItem, setEditItem] = useState(null)
//     const [selectedEvent, setSelectedEvent] = useState(null) // ✅ Selected event state

//     const formik = useFormik({
//         enableReinitialize: true,
//         initialValues: {
//             name: editItem?.name || "",
//             description: editItem?.description || "",
//             date: editItem?.date?.slice(0, 10) || "",
//             time: editItem?.time || "",
//             venue: editItem?.venue?.name || "",
//             address: editItem?.venue?.address || "",
//             fees: editItem?.fees?.transactionFee || "",
//             convenienceFee: editItem?.fees?.convenienceFee || "",
//             coverImage: "",
//             tags: editItem?.tags?.join(",") || "",
//             ticketOptions: editItem?.ticketOptions?.map(t => `${t.name}:${t.price}:${t.availableQuantity}`).join(",") || "",
//         },
//         validationSchema: yup.object({
//             name: yup.string().required("Enter event name"),
//             description: yup.string().required("Enter description"),
//             date: yup.string().required("Enter date"),
//             time: yup.string().required("Enter time"),
//             venue: yup.string().required("Enter venue name"),
//             address: yup.string().required("Enter address"),
//             fees: yup.number().required("Enter transaction fee"),
//             convenienceFee: yup.number().required("Enter convenience fee"),
//             coverImage: yup.mixed().notRequired(),
//             tags: yup.string().notRequired(),
//             ticketOptions: yup.string().notRequired(),
//         }),
//         onSubmit: (values, { resetForm }) => {
//             const fd = new FormData()
//             fd.append("name", values.name)
//             fd.append("description", values.description)
//             fd.append("date", values.date)
//             fd.append("time", values.time)
//             fd.append("venue", JSON.stringify({ name: values.venue, address: values.address }))
//             fd.append("fees", JSON.stringify({ transactionFee: values.fees, convenienceFee: values.convenienceFee }))
//             if (values.coverImage) fd.append("coverImage", values.coverImage)
//             if (values.tags) fd.append("tags", JSON.stringify(values.tags.split(",").map(t => t.trim())))
//             if (values.ticketOptions) {
//                 const ticketsArray = values.ticketOptions.split(",").map(t => {
//                     const [name, price, qty] = t.split(":");
//                     return { name: name.trim(), price: Number(price), availableQuantity: Number(qty) };
//                 });
//                 fd.append("ticketOptions", JSON.stringify(ticketsArray));
//             }
//             updateEvent({ id: editItem._id, data: fd });
//             resetForm();
//             refetch()
//             setEditItem(null);
//             document.getElementById("my_modal_5").close();
//         }
//     });

//     const handleClass = (field) =>
//         clsx({
//             "input w-full border rounded px-3 py-2": true,
//             "input-error": formik.touched[field] && formik.errors[field],
//             "input-success": formik.touched[field] && !formik.errors[field],
//         });

//     useEffect(() => {
//         if (isUpdateSuccess) {
//             toast.success("Event updated successfully");
//             document.getElementById("my_modal_5").close();
//         }
//     }, [isUpdateSuccess]);

//     useEffect(() => {
//         if (isDeleteSuccess) {
//             toast.success("Event deleted successfully")
//             refetch()
//         }
//     }, [isDeleteSuccess]);

//     if (isLoading) return <p className="text-center text-gray-500 text-lg py-10">Loading events...</p>;
//     if (isError) return <p className="text-center text-red-500 text-lg py-10">Failed to load events</p>;

//     return <>
//         <div className="md:ml-[250px] p-6 bg-gradient-to-br from-purple-100 to-blue-100 min-h-screen">

//             {/* ✅ Show BookTicketList if event selected */}
//             {selectedEvent ? (
//                 <div>
//                     <button
//                         className="mb-4 bg-gray-600 text-white px-4 py-2 rounded shadow"
//                         onClick={() => setSelectedEvent(null)}
//                     >
//                         ⬅ Back to Events
//                     </button>

//                     {selectedEvent && (
//                         <>
//                             {console.log("Selected Event Props:", selectedEvent)}
//                             <BookTicketList
//                                 eventId={selectedEvent._id}
//                                 adminId={selectedEvent.adminId?._id}
//                             />
//                         </>
//                     )}
//                 </div>

//             ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
//                     {data?.map(event => (
//                         <div
//                             key={event._id}
//                             className="bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden transform hover:scale-[1.01] transition duration-300 p-6 flex flex-col gap-4 cursor-pointer"
//                             onClick={() => setSelectedEvent(event)} // ✅ select event
//                         >
//                             <img
//                                 src={event.coverImage || "https://via.placeholder.com/400x200"}
//                                 alt="cover"
//                                 className="w-full h-48 object-cover rounded-lg shadow"
//                             />

//                             <div className="space-y-2 text-sm text-gray-800">
//                                 <p><span className="font-semibold text-gray-600">Name:</span> {event.name}</p>
//                                 <p><span className="font-semibold text-gray-600">Description:</span> {event.description}</p>
//                                 <p><span className="font-semibold text-gray-600">Date:</span> {new Date(event.date).toLocaleDateString()}</p>
//                                 <p><span className="font-semibold text-gray-600">Time:</span> {event.time}</p>
//                                 <p><span className="font-semibold text-gray-600">Venue:</span> {event.venue?.name}, {event.venue?.address}</p>
//                                 <p><span className="font-semibold text-gray-600">Fees:</span> ₹{event.fees?.transactionFee} + ₹{event.fees?.convenienceFee}</p>
//                             </div>

//                             {event.tags?.length > 0 && (
//                                 <div className="flex flex-wrap gap-2">
//                                     {event.tags.map((tag, i) => (
//                                         <span
//                                             key={i}
//                                             className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full shadow-sm"
//                                         >
//                                             {tag}
//                                         </span>
//                                     ))}
//                                 </div>
//                             )}

//                             {event.ticketOptions?.length > 0 && (
//                                 <div className="flex flex-wrap gap-2">
//                                     {event.ticketOptions.map((ticket, i) => (
//                                         <span
//                                             key={i}
//                                             className="bg-indigo-50 text-indigo-700 text-xs px-3 py-1 rounded-md border shadow-sm"
//                                         >
//                                             🎟 {ticket.name} - ₹{ticket.price} ({ticket.availableQuantity})
//                                         </span>
//                                     ))}
//                                 </div>
//                             )}

//                             <div className="flex gap-3 mt-4">
//                                 <button
//                                     onClick={(e) => {
//                                         e.stopPropagation()
//                                         setEditItem(event);
//                                         document.getElementById("my_modal_5").showModal();
//                                     }}
//                                     className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-medium shadow-md transition"
//                                 >
//                                     ✏ Update
//                                 </button>
//                                 <button
//                                     onClick={(e) => {
//                                         e.stopPropagation()
//                                         deleteEvent(event._id)
//                                     }}
//                                     disabled={isDeleteLoading}
//                                     className={`flex-1 ${isDeleteLoading
//                                         ? "bg-red-300 cursor-not-allowed"
//                                         : "bg-red-500 hover:bg-red-600"
//                                         } text-white py-2 rounded-lg text-sm font-medium shadow-md transition`}
//                                 >
//                                     {isDeleteLoading ? "Deleting..." : "🗑 Delete"}
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//             {/* Modal */}
//             <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
//                 <div className="modal-box rounded-2xl shadow-2xl border border-gray-200 max-w-3xl w-full">
//                     <h3 className="font-bold text-xl mb-6 text-center text-gray-800">
//                         ✏️ Edit Event
//                     </h3>

//                     <form onSubmit={formik.handleSubmit} className="space-y-4">
//                         {/* Name & Description */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-600 mb-1">Event Name</label>
//                                 <input
//                                     type="text"
//                                     name="name"
//                                     placeholder="Enter event name"
//                                     className={`${handleClass("name")} input input-bordered w-full`}
//                                     {...formik.getFieldProps("name")}
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
//                                 <input
//                                     type="text"
//                                     name="description"
//                                     placeholder="Short description"
//                                     className={`${handleClass("description")} input input-bordered w-full`}
//                                     {...formik.getFieldProps("description")}
//                                 />
//                             </div>
//                         </div>

//                         {/* Date & Time */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-600 mb-1">Date</label>
//                                 <input
//                                     type="date"
//                                     name="date"
//                                     className={`${handleClass("date")} input input-bordered w-full`}
//                                     {...formik.getFieldProps("date")}
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-600 mb-1">Time</label>
//                                 <input
//                                     type="time"
//                                     name="time"
//                                     className={`${handleClass("time")} input input-bordered w-full`}
//                                     {...formik.getFieldProps("time")}
//                                 />
//                             </div>
//                         </div>

//                         {/* Venue & Address */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-600 mb-1">Venue Name</label>
//                                 <input
//                                     type="text"
//                                     name="venue"
//                                     placeholder="Venue"
//                                     className={`${handleClass("venue")} input input-bordered w-full`}
//                                     {...formik.getFieldProps("venue")}
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
//                                 <input
//                                     type="text"
//                                     name="address"
//                                     placeholder="Address"
//                                     className={`${handleClass("address")} input input-bordered w-full`}
//                                     {...formik.getFieldProps("address")}
//                                 />
//                             </div>
//                         </div>

//                         {/* Fees */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-600 mb-1">Transaction Fee</label>
//                                 <input
//                                     type="number"
//                                     name="fees"
//                                     placeholder="Transaction Fee"
//                                     className={`${handleClass("fees")} input input-bordered w-full`}
//                                     {...formik.getFieldProps("fees")}
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-600 mb-1">Convenience Fee</label>
//                                 <input
//                                     type="number"
//                                     name="convenienceFee"
//                                     placeholder="Convenience Fee"
//                                     className={`${handleClass("convenienceFee")} input input-bordered w-full`}
//                                     {...formik.getFieldProps("convenienceFee")}
//                                 />
//                             </div>
//                         </div>

//                         {/* Cover Image */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-600 mb-1">Cover Image</label>
//                             <input
//                                 type="file"
//                                 name="coverImage"
//                                 className={`${handleClass("coverImage")} file-input file-input-bordered w-full`}
//                                 onChange={(e) => formik.setFieldValue("coverImage", e.currentTarget.files[0])}
//                             />
//                         </div>

//                         {/* Tags & Tickets */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-600 mb-1">Tags</label>
//                                 <input
//                                     type="text"
//                                     name="tags"
//                                     placeholder="Tags (comma separated)"
//                                     className={`${handleClass("tags")} input input-bordered w-full`}
//                                     {...formik.getFieldProps("tags")}
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-600 mb-1">Tickets</label>
//                                 <input
//                                     type="text"
//                                     name="ticketOptions"
//                                     placeholder="Tickets (name:price:qty, comma separated)"
//                                     className={`${handleClass("ticketOptions")} input input-bordered w-full`}
//                                     {...formik.getFieldProps("ticketOptions")}
//                                 />
//                             </div>
//                         </div>

//                         {/* Actions */}
//                         <div className="modal-action flex flex-wrap justify-end gap-3 mt-6">
//                             <button
//                                 type="submit"
//                                 className="btn btn-success px-6 text-white shadow-md hover:scale-105 transition"
//                             >
//                                 ✅ Update
//                             </button>
//                             <form method="dialog">
//                                 <button className="btn btn-outline px-6">❌ Close</button>
//                             </form>
//                         </div>
//                     </form>
//                 </div>
//             </dialog>

//         </div>
//     </>
// };

// export default AllEventList;


