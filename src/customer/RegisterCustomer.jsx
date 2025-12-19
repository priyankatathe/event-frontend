import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterCustomerMutation } from "../redux/api/customerApi";
import { toast } from "react-toastify";
import { useEffect } from "react";

const RegisterCustomer = () => {

    const navigate = useNavigate()
    const [registerCustomer, { isSuccess, isError, isLoading, error }] =
        useRegisterCustomerMutation()


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: "",
            mobile: "",
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Enter name"),
            mobile: yup
                .string()
                .matches(/^[0-9]{10}$/, "Enter valid 10-digit mobile")
                .required("Enter mobile"),
            email: yup.string().email("Invalid email").required("Enter email"),
            password: yup.string().min(6, "Min 6 characters").required("Enter password"),
        }),
        onSubmit: async (values) => {
            await registerCustomer(values)
        },
    });


    useEffect(() => {
        if (isSuccess) {
            toast.success("customer registered successfully!")
            navigate("/customer-login")
        }
        if (isError) {
            toast.error(error?.data?.message || "Registration failed!")
        }
    }, [isSuccess, isError, navigate, error])

    const handleClass = (key) => {
        if (formik.touched[key] && formik.errors[key]) {
            return "w-full px-4 py-3 border border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500";
        } else {
            return "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500";
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left side image */}
            <div className="md:w-1/2 w-full">
                <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1470&q=80"
                    alt="Register Background"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Right side form */}
            <div className="md:w-1/2 w-full flex items-center justify-center p-10 bg-gray-50">
                <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        Customer Registration
                    </h2>

                    <form onSubmit={formik.handleSubmit} className="space-y-5">
                        {/* Name */}
                        <div>
                            <label className="block text-gray-700 mb-2 font-medium">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                {...formik.getFieldProps("name")}
                                className={handleClass("name")}
                                placeholder="Enter your full name"
                            />
                            {formik.touched.name && formik.errors.name && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
                            )}
                        </div>

                        {/* Mobile */}
                        <div>
                            <label className="block text-gray-700 mb-2 font-medium">Mobile</label>
                            <input
                                type="text"
                                name="mobile"
                                {...formik.getFieldProps("mobile")}
                                className={handleClass("mobile")}
                                placeholder="Enter your mobile number"
                            />
                            {formik.touched.mobile && formik.errors.mobile && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.mobile}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-gray-700 mb-2 font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                {...formik.getFieldProps("email")}
                                className={handleClass("email")}
                                placeholder="Enter your email"
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-gray-700 mb-2 font-medium">Password</label>
                            <input
                                type="password"
                                name="password"
                                {...formik.getFieldProps("password")}
                                className={handleClass("password")}
                                placeholder="Enter your password"
                            />
                            {formik.touched.password && formik.errors.password && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
                            )}
                        </div>

                        {/* Role */}
                        {/* <div>
                            <label className="block text-gray-700 mb-2 font-medium">Role</label>
                            <select
                                name="role"
                                {...formik.getFieldProps("role")}
                                className={handleClass("role")}
                            >
                                <option value="">Select role</option>
                                <option value="customer">Customer</option>
                                <option value="admin">Admin</option>
                            </select>
                            {formik.touched.role && formik.errors.role && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.role}</p>
                            )}
                        </div> */}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
                        >
                            Register
                        </button>
                    </form>

                    <p className="mt-6 text-center text-gray-600">
                        Already have an account?{" "}
                        <Link to="/customer-login" className="text-green-600 font-medium hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterCustomer;
