
import React from "react";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./Pages/Home";
import Events from "./Pages/Events";
import BookTicket from "./Pages/BookTicket";
import Layout from "./component/Layout";

import AdminLayout from "./admin/AdminLayout";
import AdminProfile from "./admin/AdminProfile";
import AdminProtector from "./middleware/AdminProtector";
import LoginAdmin from "./admin/LoginAdmin";
import AddEvent from "./admin/AddEvent";
import AllEventList from "./admin/AllEventList";
import AdminRegister from "./admin/AdminRegister";
import BookTicketList from "./admin/BookTicketList";
import RegisterCustomer from "./customer/RegisterCustomer";
import LoginCustomer from "./customer/LoginCustomer";
import AboutEvents from "./Pages/AboutEvnets";
import Contacts from "./Pages/Contacts";
import LiveStream from "./Pages/LiveStream";
import Dashboard from "./admin/Dashboard";


const App = () => {
  return <>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="events" element={<Events />} />
          <Route path="about-event" element={<AboutEvents />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="live-stream" element={<LiveStream />} />

          <Route path="book-ticket/:id" element={<BookTicket />} />
        </Route>

        <Route
          path="/admin"
          element={<AdminProtector compo={<AdminLayout />} />}
        >
          <Route index element={<Dashboard />} />
          <Route path="admin-profile" element={<AdminProfile />} />
          <Route path="add-event" element={<AddEvent />} />
          <Route path="event-list" element={<AllEventList />} />
          <Route path="book-ticke/:eventId" element={<BookTicketList />} />
        </Route>

        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/admin-login" element={<LoginAdmin />} />
        <Route path="/customer-register" element={<RegisterCustomer />} />
        <Route path="/customer-login" element={<LoginCustomer />} />

        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* <Footer /> */}
    </HashRouter>
  </>

};

export default App;
