import React, { useEffect, useState } from "react"
import { useGetAdminQuery, useLogoutAdminMutation, useUpdateAdminMutation } from "../redux/api/authApi"
import { useNavigate } from "react-router-dom"
import { FaEnvelope, FaPhone, FaUserShield } from "react-icons/fa"
import { useFormik } from "formik"
import * as yup from "yup"
import clsx from "clsx"
import { toast } from "react-toastify"

const AdminProfile = () => {
    const { data: admin, refetch, isLoading, isError } = useGetAdminQuery()
    const [logoutAdmin] = useLogoutAdminMutation()
    const navigate = useNavigate()
    const [updateAdmin, { isSuccess }] = useUpdateAdminMutation()

    const [editItem, setEditItem] = useState(null)

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: editItem?.name || "",
            image: "",
            email: editItem?.email || "",
            mobile: editItem?.mobile || "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Enter name"),
            image: yup.mixed().notRequired(),
            email: yup
                .string()
                .email("Enter valid email")
                .required("Enter email"),
            mobile: yup
                .string()
                .required("Enter mobile")
                .matches(/^[0-9]+$/, "Only digits allowed")
                .length(10, "Mobile number must be exactly 10 digits"),
        }),

        onSubmit: async (values, { resetForm }) => {
            const fd = new FormData()
            Object.entries(values).forEach(([key, value]) => {
                fd.append(key, value)
            })

            try {
                await updateAdmin({ id: editItem._id, data: fd }).unwrap()
                toast.success("Admin updated successfully")
                document.getElementById("my_modal_5").close()
                resetForm()
                refetch() // ✅ screen update without refresh
            } catch (error) {
                toast.error("Update failed")
            }
        }
    })

    const handleLogout = async () => {
        try {
            await logoutAdmin().unwrap()
            localStorage.removeItem("token")
            navigate("/admin-login")
        } catch (error) {
            console.error("Logout failed:", error)
        }
    }

    const handleClass = (field) =>
        clsx({
            "input w-full border rounded px-3 py-2": true,
            "input-error": formik.touched[field] && formik.errors[field],
            "input-success": formik.touched[field] && !formik.errors[field],
        })

    if (isLoading) return <div className="text-center mt-10 text-gray-500">Loading...</div>
    if (isError) return <div className="text-center mt-10 text-red-500">Error fetching data</div>

    return <div className="md:ml-[250px] bg-gray-100">
        <h1 className="text-2xl ml-5 font-bold">Admin Profile</h1>
        <div className=" flex justify-center items-center min-h-screen px-6 lg:px-8 ">
            <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl p-8 flex flex-col md:flex-row items-center gap-8">

                {/* Left: Profile Image */}
                <div className="flex-shrink-0 relative flex flex-col items-center">
                    <img
                        src={admin?.image}
                        alt={admin?.name}
                        className="w-36 h-36 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
                    />
                    <p className="mt-4 text-lg font-semibold text-gray-800">{admin?.name}</p>
                    <p className="text-white font-medium mt-1">Admin User</p>
                </div>

                {/* Right: Info */}
                <div className="flex-1 flex flex-col justify-center gap-6 w-full">
                    <h3 className="text-2xl font-bold text-gray-800 border-b border-gray-300 pb-2 mb-4">Admin Profile</h3>

                    {/* Info Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-4 rounded-xl shadow-md hover:shadow-xl transition bg-gradient-to-r from-indigo-50 to-white">
                            <FaUserShield className="text-indigo-500 text-xl" />
                            <div>
                                <p className="text-gray-400 text-xs uppercase tracking-wide">Role</p>
                                <p className="text-gray-800 font-semibold">{admin?.role}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 rounded-xl shadow-md hover:shadow-xl transition bg-gradient-to-r from-indigo-50 to-white">
                            <FaEnvelope className="text-indigo-500 text-xl" />
                            <div>
                                <p className="text-gray-400 text-xs uppercase tracking-wide">Email</p>
                                <p className="text-gray-800 font-semibold break-all">{admin?.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 rounded-xl shadow-md hover:shadow-xl transition bg-gradient-to-r from-indigo-50 to-white">
                            <FaPhone className="text-indigo-500 text-xl" />
                            <div>
                                <p className="text-gray-400 text-xs uppercase tracking-wide">Mobile</p>
                                <p className="text-gray-800 font-semibold">{admin?.mobile}</p>
                                {formik.touched.mobile && formik.errors.mobile && (
                                    <p className="text-red-500 text-xs mt-1">{formik.errors.mobile}</p>
                                )}

                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => {
                                setEditItem(admin)
                                document.getElementById("my_modal_5").showModal()
                            }}
                            className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold py-2 px-6 rounded-xl shadow-lg transform hover:scale-105 transition">
                            Update Profile
                        </button>
                        <button
                            onClick={handleLogout}
                            className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2 px-6 rounded-xl shadow-lg transform hover:scale-105 transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-white shadow-2xl rounded-2xl p-6 w-full max-w-lg">
                    <h3 className="font-bold text-2xl text-gray-800 mb-6 text-center">Edit Admin Profile</h3>
                    <form onSubmit={formik.handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter Name"
                                    className={handleClass("name") + " focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"}
                                    {...formik.getFieldProps("name")}
                                />
                                {formik.touched.name && formik.errors.name && (
                                    <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Enter Email"
                                    className={handleClass("email") + " focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"}
                                    {...formik.getFieldProps("email")}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
                                )}
                            </div>
                        </div>

                        {/* Mobile */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile</label>
                            <input
                                type="text"
                                name="mobile"
                                placeholder="Enter Mobile Number"
                                className={handleClass("mobile") + " focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"}
                                {...formik.getFieldProps("mobile")}
                            />
                            {formik.touched.mobile && formik.errors.mobile && (
                                <p className="text-red-500 text-xs mt-1">{formik.errors.mobile}</p>
                            )}
                        </div>

                        {/* Image */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Image</label>
                            <input
                                type="file"
                                name="image"
                                className={handleClass("image")}
                                onChange={(e) => formik.setFieldValue("image", e.currentTarget.files[0])}
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
                            <button
                                type="submit"
                                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg shadow-md transition duration-200 font-semibold"
                            >
                                Update
                            </button>
                            <form method="dialog">
                                <button
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-lg shadow-md transition duration-200 font-semibold"
                                >
                                    Close
                                </button>
                            </form>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    </div>
}

export default AdminProfile
