import React, { useEffect } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import { Link, useNavigate } from "react-router-dom"
import { useLoginCustomerMutation } from "../redux/api/customerApi"
import { toast } from "react-toastify"

const LoginCustomer = () => {
    const navigate = useNavigate()
    const [customerLogin, { isSuccess, isError, isLoading, error }] =
        useLoginCustomerMutation()

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup.string().email("Invalid email").required("Enter email"),
            password: yup.string().required("Enter password"),
        }),
        onSubmit: async (values) => {
            await customerLogin(values)
        },
    })

    useEffect(() => {
        if (isSuccess) {
            toast.success("Customer Login Successfully ✅")
            navigate("/")
        }

        if (isError && error) {
            // console.log("CUSTOMER LOGIN ERROR 👉", error)

            const msg =
                error?.data?.message ||
                error?.data?.error ||
                error?.error ||
                error?.status ||
                "Login failed!"

            const lower = msg.toString().toLowerCase()

            if (lower.includes("not registered")) {
                toast.error("Please register first ❌")
            } else if (lower.includes("password")) {
                toast.error("Wrong password ❌")
            } else if (lower.includes("email")) {
                toast.error("Invalid email ❌")
            } else {
                toast.error(msg)
            }
        }
    }, [isSuccess, isError, error, navigate])

    const handleClass = (key) => {
        if (formik.touched[key] && formik.errors[key]) {
            return "w-full px-4 py-3 border border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        } else {
            return "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        }
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left side image */}
            <div className="md:w-1/2 w-full">
                <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1470&q=80"
                    alt="Login Background"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Right side form */}
            <div className="md:w-1/2 w-full flex items-center justify-center p-10 bg-gray-50">
                <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        Customer Login
                    </h2>

                    <form onSubmit={formik.handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-gray-700 mb-2 font-medium">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                {...formik.getFieldProps("email")}
                                className={handleClass("email")}
                                placeholder="Enter your email"
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {formik.errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-gray-700 mb-2 font-medium">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                {...formik.getFieldProps("password")}
                                className={handleClass("password")}
                                placeholder="Enter your password"
                            />
                            {formik.touched.password && formik.errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {formik.errors.password}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3 rounded-lg font-semibold text-white transition duration-300 ${isLoading
                                ? "bg-green-400 cursor-not-allowed"
                                : "bg-green-600 hover:bg-green-700"
                                }`}
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-gray-600">
                        Don't have an account?{" "}
                        <Link
                            to="/customer-register"
                            className="text-green-600 font-medium hover:underline"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginCustomer
