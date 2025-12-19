import React, { useState, useEffect } from "react"
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { useLogoutAdminMutation, useGetAdminQuery } from "../redux/api/authApi"

const AdminNavbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const toggleMenu = () => setIsOpen(!isOpen)
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen)

    const navigate = useNavigate()
    const { data: admin } = useGetAdminQuery()
    const [logoutAdmin, { isLoading }] = useLogoutAdminMutation()

    const handleLogout = async () => {
        try {
            await logoutAdmin().unwrap()
            localStorage.removeItem("token")
            navigate("/admin-login")
        } catch (error) {
            console.error("Logout failed:", error)
        }
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setIsOpen(false)
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return <>
        <div>
            {/* Navbar */}
            <nav
                className="bg-white
               text-black h-20 fixed top-0 right-0 z-50 flex items-center justify-between px-4  
               w-full md:w-[calc(100%-250px)] md:ml-[250px]"
            >
                {/* Logo */}
                <div className="flex items-center flex-shrink-0">
                    <span className="text-xl font-bold ml-10">AdminPanel</span>
                </div>

                {/* 🔹 Admin Dropdown */}
                <div className="relative hidden md:flex items-center cursor-pointer">
                    <div onClick={toggleDropdown} className="flex items-center gap-2">
                        <img
                            src={admin?.image || "https://via.placeholder.com/40"}
                            alt="admin"
                            className="w-10 h-10 rounded-full border-2 border-white object-cover"
                        />
                        <span className="font-medium">{admin?.name || "Admin"}</span>
                        <FaChevronDown size={14} />
                    </div>

                    {dropdownOpen && (
                        <div className="absolute right-0 top-14 w-40 bg-white text-black rounded-md shadow-lg">
                            <Link
                                to="/admin"
                                className="block px-4 py-2 hover:bg-gray-100"
                                onClick={() => setDropdownOpen(false)}
                            >
                                Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                disabled={isLoading}
                            >
                                {isLoading ? "Logging out..." : "Logout"}
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                        className="focus:outline-none"
                    >
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden fixed top-16 left-0 w-full bg-gray-800 text-white flex flex-col gap-1 p-2 z-40">
                    <Link
                        to="/admin"
                        onClick={() => setIsOpen(false)}
                        className="hover:bg-gray-700 px-3 py-2 rounded transition"
                    >
                        Admin-profile
                    </Link>
                    <Link
                        to="/admin/add-event"
                        onClick={() => setIsOpen(false)}
                        className="hover:bg-gray-700 px-3 py-2 rounded transition"
                    >
                        Add-events
                    </Link>
                    <Link
                        to="/admin/event-list"
                        onClick={() => setIsOpen(false)}
                        className="hover:bg-gray-700 px-3 py-2 rounded transition"
                    >
                        Event-list
                    </Link>
                    {/* 🔹 Mobile Logout भी */}
                    <button
                        onClick={() => {
                            setIsOpen(false)
                            handleLogout()
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded mt-2"
                    >
                        Logout
                    </button>
                </div>
            )}

            {/* Spacer for fixed navbar */}
            <div className="h-16 md:ml-[250px]"></div>
        </div>
    </>

}

export default AdminNavbar
