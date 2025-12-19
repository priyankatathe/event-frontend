import React from 'react'
import AdminNavbar from './AdminNavbar'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'

const AdminLayout = () => {
    return <>
        {/* <AdminNavbar /> */}
        <AdminSidebar />

        <Outlet />

    </>
}

export default AdminLayout