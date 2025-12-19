import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaUserAlt, FaCalendarPlus, FaListUl, FaBars, FaChartPie, FaSignOutAlt } from 'react-icons/fa'
import { useGetAdminQuery } from '../redux/api/authApi'

const LINKS = [
    { label: 'Dashboard', to: '/admin', icon: FaChartPie },
    { label: 'Profile-Admin', to: '/admin/admin-profile', icon: FaUserAlt },
    { label: 'Add-Event', to: '/admin/add-event', icon: FaCalendarPlus },
    { label: 'Event-List', to: '/admin/event-list', icon: FaListUl }
]

const AdminSidebar = () => {
    const { data: admin, isLoading, isError } = useGetAdminQuery()
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    const toggleSidebar = () => setIsOpen(!isOpen)
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/admin-login')
    }

    const AdminInfo = () => (
        <div className="flex items-center gap-3 p-4 text-white bg-[#33691E]">
            <img
                src={admin?.image || 'https://via.placeholder.com/50'}
                alt="admin"
                className="w-12 h-12 rounded-full border-2 border-white object-cover"
            />
            <div>
                <h2 className="font-semibold">{admin?.name || 'Loading...'}</h2>
                <p className="text-sm">{admin?.role || 'Admin'}</p>
            </div>
        </div>
    )

    const renderLink = (item) => {
        const isActive = location.pathname === item.to
        const Icon = item.icon
        return (
            <div key={item.label} className="relative">
                <Link
                    to={item.to}
                    onClick={() => isOpen && toggleSidebar()}
                    className={`flex items-center gap-3 px-4 py-2 rounded-xl my-1 mx-2 cursor-pointer text-white 
                   `
                    }
                >
                    <div
                        className={`p-2 rounded-md flex items-center justify-center bg-[#33691E] text-white`}
                    >
                        <Icon size={16} />
                    </div>
                    <span className="text-sm font-medium">{item.label}</span>
                </Link>
                {isActive && (
                    <span className="absolute right-5 top-1/2 transform -translate-y-1/2 h-6 w-1 bg-yellow-400 rounded-l-md"></span>
                )}
            </div>
        )
    }


    return (
        <>
            {/* Mobile Hamburger */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <button onClick={toggleSidebar}>
                    <FaBars size={24} className="text-[#33691E]" />
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-[#33691E] text-white shadow-md z-50 transform transition-transform duration-300
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:w-[250px] flex flex-col`}
            >
                {isLoading ? (
                    <div className="p-4 text-center">Loading...</div>
                ) : isError ? (
                    <div className="p-4 text-center text-red-300">Error</div>
                ) : (
                    <AdminInfo />
                )}

                {/* Links scrollable */}
                <div className="flex-grow overflow-y-auto mt-4">{LINKS.map(renderLink)}</div>

                {/* Logout fixed at bottom */}
                <div className="mt-auto px-4 py-4">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-lg transition"
                    >
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </div>

            {/* Overlay for Mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={toggleSidebar}
                />
            )}
        </>
    )
}

export default AdminSidebar
