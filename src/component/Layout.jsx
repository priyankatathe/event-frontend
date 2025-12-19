import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Pages/Footer'

const Layout = () => {
    return <>
        <Navbar />
        <Outlet />
        <Footer />
    </>
}

export default Layout