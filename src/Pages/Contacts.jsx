import React from "react"
import { FaPhoneAlt, FaEnvelope, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa"

const ContactUs = () => {
    return <>
        <div className="bg-black text-white ">
            {/* Header Section */}
            <section className="text-center py-10">
                <h1 className="text-4xl font-bold">Contact Us</h1>
                <p className="text-gray-400 mt-2">Home / Contact</p>
            </section>

            {/* Contact Section */}
            <section className="container mx-auto px-4 md:px-16 lg:px-24 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Left Form */}
                <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>
                    <form className="flex flex-col space-y-4">
                        <input
                            type="text"
                            placeholder="Your Name..."
                            className="p-3 rounded-md bg-black border border-gray-700 text-white focus:outline-none focus:border-blue-500"
                        />
                        <input
                            type="email"
                            placeholder="example@youremail.com"
                            className="p-3 rounded-md bg-black border border-gray-700 text-white focus:outline-none focus:border-blue-500"
                        />
                        <input
                            type="text"
                            placeholder="Subject"
                            className="p-3 rounded-md bg-black border border-gray-700 text-white focus:outline-none focus:border-blue-500"
                        />
                        <textarea
                            placeholder="Type Here..."
                            rows="4"
                            className="p-3 rounded-md bg-black border border-gray-700 text-white focus:outline-none focus:border-blue-500"
                        ></textarea>
                        <button className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-300 transition">
                            Send Now
                        </button>
                    </form>
                </div>

                {/* Right Info */}
                <div>
                    <p className="text-gray-400 mb-6">
                        In tempus nisi turpis, ut ultricies dui eleifend a. Quisque et quam
                        vel magna consectetur pharetra euismod elit et. Morbi nibh tortor,
                        ullamcorper id purus eu, rhoncus consequat velit.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm mb-6">
                        <div className="flex items-center space-x-3">
                            <FaPhoneAlt className="text-green-400 text-xl" />
                            <div>
                                <h3 className="font-bold">Phone Number</h3>
                                <p className="text-gray-400">+2822 4032 567</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaEnvelope className="text-blue-400 text-xl" />
                            <div>
                                <h3 className="font-bold">Email Address</h3>
                                <p className="text-gray-400">Example@Email.Com</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaWhatsapp className="text-green-500 text-xl" />
                            <div>
                                <h3 className="font-bold">Whatsapp</h3>
                                <p className="text-gray-400">082-245-7533</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaMapMarkerAlt className="text-red-500 text-xl" />
                            <div>
                                <h3 className="font-bold">Our Office</h3>
                                <p className="text-gray-400">2443 Oak Ridge Omaha, QA 45065</p>
                            </div>
                        </div>
                    </div>

                    {/* Map */}
                    <div className="w-full h-60">
                        <iframe
                            className="w-full h-full rounded-md"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1985.2788025953614!2d-0.1195432!3d51.5033991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604b90052efad%3A0xdebcc9e5b6d3db!2sLondon%20Eye!5e0!3m2!1sen!2sin!4v1695020000000!5m2!1sen!2sin"
                            allowFullScreen=""
                            loading="lazy"
                            title="Google Map"
                        ></iframe>
                    </div>
                </div>
            </section>


        </div>
    </>
}

export default ContactUs
