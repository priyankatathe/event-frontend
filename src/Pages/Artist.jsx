import React from 'react'

const Artist = () => {
    const artists = [
        {
            name: "Sukhbir Singh",
            date: "Sep 26 - Sep 28",
            cities: "New York, North Brunswick",
            img: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
            name: "Badshah",
            date: "Aug 23 - Sep 20",
            cities: "Bellevue, Fairfax, Trenton, Oakland, Kent...",
            img: "https://randomuser.me/api/portraits/men/11.jpg"
        },
        {
            name: "Bhoomi Trivedi",
            date: "Aug 30 - Sep 20",
            cities: "Round Rock, Houston, Frisco...",
            img: "https://randomuser.me/api/portraits/women/20.jpg"
        },
        {
            name: "Vatsala Patil",
            date: "Sep 26 - Sep 27",
            cities: "Old Bridge",
            img: "https://randomuser.me/api/portraits/women/48.jpg"
        },
        {
            name: "Parth Doshi",
            date: "Sep 19 - Sep 21",
            cities: "Florence, Edison",
            img: "https://randomuser.me/api/portraits/men/60.jpg"
        },
    ]
    return <>

        <div>
            {["Artist Concerts & Tour Dates", "Navratri Dandiya Event Tickets in New Jersey Area"].map((title, idx) => (
                <div key={idx} className="bg-white border rounded shadow p-6">
                    <h2 className="text-lg sm:text-xl font-semibold mb-1">{title}</h2>
                    <p className="text-xs text-gray-500 mb-4">Events you can’t miss</p>
                    <hr />
                    <div className="space-y-4 mt-2">
                        {artists.map((artist, index) => (
                            <div key={index} className="flex items-center gap-4 border-b pb-3">
                                <img src={artist.img} alt={artist.name} className="w-14 h-14 rounded-full object-cover" />
                                <div className="text-sm">
                                    <p className="font-semibold text-blue-600">{artist.name}</p>
                                    <p className="text-gray-600 text-xs">Tour Date: {artist.date}</p>
                                    <p className="text-gray-600 text-xs truncate">Tour Cities: {artist.cities}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-right mt-4">
                        <a href="#" className="text-blue-600 text-sm hover:underline">
                            View More Event Artists Tours →
                        </a>
                    </div>
                </div>
            ))}
        </div>
    </>
}

export default Artist