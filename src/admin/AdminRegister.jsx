import React, { useEffect } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import clsx from "clsx"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useRegisterAdminMutation } from "../redux/api/authApi"
import photo from "../img/1.jpg"

const AdminRegister = () => {
    const navigate = useNavigate()
    const [registerAdmin, { isSuccess, isError, isLoading, error }] =
        useRegisterAdminMutation()

    const formik = useFormik({
        initialValues: {
            name: "",
            mobile: "",
            email: "",
            password: "",
            role: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Enter name"),
            mobile: yup
                .string()
                .matches(/^[0-9]{10}$/, "Enter valid 10-digit mobile")
                .required("Enter mobile"),
            email: yup.string().email("Invalid email").required("Enter email"),
            password: yup.string().min(6, "Min 6 characters").required("Enter password"),
            role: yup.string().required("Select role"),
        }),
        onSubmit: async (values) => {
            await registerAdmin(values)
        },
    })

    useEffect(() => {
        if (isSuccess) {
            toast.success("Admin registered successfully!")
            navigate("/admin-login")
        }
        if (isError) {
            toast.error(error?.data?.message || "Registration failed!")
        }
    }, [isSuccess, isError, navigate, error])

    const handleClass = (key) =>
        clsx(
            "w-full bg-slate-100 placeholder-slate-400 rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-green-300 transition",
            formik.touched[key] && formik.errors[key] && "border border-red-500",
            formik.touched[key] && !formik.errors[key] && "border border-green-500"
        )

    return <>
        <div className="min-h-screen bg-[#fef7f2] flex items-center justify-center px-4">
            <div className="bg-white shadow-xl rounded-3xl overflow-hidden flex flex-col md:flex-row w-full max-w-5xl">

                {/* Left side image */}
                <div className="w-full md:w-1/2 flex justify-start  p-10 bg-white">
                    <img
                        src={photo}
                        alt="register"
                        className="w-[240px] md:w-[280px] h-auto object-contain"
                    />
                </div>

                {/* Right side form */}
                <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
                    <h2 className="text-3xl font-semibold text-slate-800 mb-2">Register</h2>
                    <p className="text-slate-500 text-sm mb-6">
                        Create your admin account to access the dashboard
                    </p>

                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div>
                            <input
                                type="text"
                                placeholder="Name"
                                {...formik.getFieldProps("name")}
                                className={handleClass("name")}
                            />
                            {formik.touched.name && formik.errors.name && (
                                <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
                            )}
                        </div>

                        {/* Mobile */}
                        <div>
                            <input
                                type="text"
                                placeholder="Mobile"
                                {...formik.getFieldProps("mobile")}
                                className={handleClass("mobile")}
                            />
                            {formik.touched.mobile && formik.errors.mobile && (
                                <p className="text-red-500 text-xs mt-1">{formik.errors.mobile}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                {...formik.getFieldProps("email")}
                                className={handleClass("email")}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                {...formik.getFieldProps("password")}
                                className={handleClass("password")}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
                            )}
                        </div>

                        {/* Role */}
                        <div>
                            <select
                                {...formik.getFieldProps("role")}
                                className={handleClass("role")}
                            >
                                <option value="">Select role</option>
                                <option value="admin">Admin</option>
                                <option value="superadmin">Super Admin</option>
                                <option value="manager">Manager</option>
                            </select>
                            {formik.touched.role && formik.errors.role && (
                                <p className="text-red-500 text-xs mt-1">{formik.errors.role}</p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3 rounded-full text-white font-semibold transition ${isLoading
                                ? "bg-green-400 cursor-not-allowed"
                                : "bg-green-600 hover:bg-green-700"
                                }`}
                        >
                            {isLoading ? "Registering..." : "Register"}
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="text-center text-sm text-slate-500 mt-6">
                        Already have an account?{" "}
                        <Link
                            to="/admin-login"
                            className="text-emerald-700 font-medium hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    </>
}

export default AdminRegister
