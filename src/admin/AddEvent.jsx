import React, { useEffect, useState } from "react"
import { useFormik, FieldArray, FormikProvider } from "formik"
import * as yup from "yup"
import clsx from "clsx"
import { useAddEventMutation } from "../redux/api/eventBookApi"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const AddEvent = () => {
    const [addEvent, { isLoading, isError, error, isSuccess }] =
        useAddEventMutation()
    const navigate = useNavigate()
    const [coverPreview, setCoverPreview] = useState(null)
    const [organizerPreview, setOrganizerPreview] = useState(null)

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            coverImage: null,
            images: [],
            date: "",
            time: "",
            venue: { name: "", address: "", googleMapUrl: "" },
            ticketOptions: [{ name: "", price: "", availableQuantity: "" }],
            fees: { transactionFee: 2.14, convenienceFee: 1.0 },
            organizer: { name: "", company: "", image: null },
            tags: [""],
            category: "upcomingevent",
        },
        validationSchema: yup.object({
            name: yup.string().required("Event name is required"),
            description: yup.string().required("Description is required"),
            coverImage: yup.mixed().required("Cover image is required"),
            date: yup.date().required("Date is required"),
            time: yup.string().required("Time is required"),
            venue: yup.object({
                name: yup.string().required("Venue name is required"),
                address: yup.string().required("Address is required"),
                googleMapUrl: yup.string().url("Must be a valid URL"),
            }),
            organizer: yup.object({
                name: yup.string().required("Organizer name is required"),
                company: yup.string(),
            }),
            ticketOptions: yup.array().of(
                yup.object({
                    name: yup.string().required("Ticket type required"),
                    price: yup.number().required("Price required"),
                    availableQuantity: yup.number().required("Quantity required"),
                })
            ),
            category: yup
                .string()
                .oneOf(["upcomingevent", "featureEvent"])
                .required("Select category"),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const formData = new FormData()
                formData.append("name", values.name)
                formData.append("description", values.description)
                formData.append("date", values.date)
                formData.append("time", values.time)
                formData.append("category", values.category)
                formData.append("coverImage", values.coverImage)
                if (values.organizer.image) {
                    formData.append("organizerImage", values.organizer.image)
                }
                values.images.forEach((img) => {
                    formData.append("images", img)
                })
                formData.append("venue", JSON.stringify(values.venue))
                formData.append(
                    "organizer",
                    JSON.stringify({
                        name: values.organizer.name,
                        company: values.organizer.company,
                    })
                )
                formData.append("ticketOptions", JSON.stringify(values.ticketOptions))
                formData.append("tags", JSON.stringify(values.tags))
                formData.append("fees", JSON.stringify(values.fees))

                await addEvent(formData).unwrap()
                toast.success("🎉 Event added successfully!")
                resetForm()
                setCoverPreview(null)
                setOrganizerPreview(null)
            } catch (err) {
                console.error("Failed to add event: ", err)
            }
        },
    })

    const handleClass = (key) =>
        clsx(
            "w-full border rounded p-2 focus:outline-none focus:ring-2 transition-all",
            formik.touched[key] && formik.errors[key] && "border-red-500 focus:ring-red-400",
            formik.touched[key] && !formik.errors[key] && "border-green-500 focus:ring-green-400"
        )

    const handleCoverChange = (e) => {
        const file = e.currentTarget.files[0]
        formik.setFieldValue("coverImage", file)
        if (file) setCoverPreview(URL.createObjectURL(file))
    }

    // const handleOrganizerChange = (e) => {
    //     const file = e.currentTarget.files[0]
    //     formik.setFieldValue("organizer.image", file)
    //     if (file) setOrganizerPreview(URL.createObjectURL(file))
    // }

    const handleImagesChange = (e) => {
        const files = Array.from(e.currentTarget.files)
        formik.setFieldValue("images", files)
    }

    useEffect(() => {
        if (isSuccess) navigate("/admin/event-list")
    }, [isSuccess])

    return (
        <div className="md:ml-[250px] p-6">
            <h1 className="text-2xl font-bold">Add Event</h1>
            <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center">
                <div className="w-full max-w-7xl bg-white/90 backdrop-blur-xl shadow-2xl  p-10 border border-gray-200">
                    <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-12">
                        🎟️ Add New Event
                    </h2>

                    <form onSubmit={formik.handleSubmit} className="space-y-12">
                        {/* Event Info + Organizer + Venue */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {/* Event Info */}
                            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl shadow-md space-y-5">
                                <h3 className="text-lg font-semibold text-indigo-700 border-b pb-2">📌 Event Info</h3>
                                <input
                                    placeholder="Event Name"
                                    {...formik.getFieldProps("name")}
                                    className={handleClass("name")}
                                />
                                {formik.touched.name && formik.errors.name && (
                                    <p className="text-red-500 text-sm">{formik.errors.name}</p>
                                )}
                                <textarea
                                    rows={3}
                                    placeholder="Description"
                                    {...formik.getFieldProps("description")}
                                    className={handleClass("description")}
                                />
                                {formik.touched.description && formik.errors.description && (
                                    <p className="text-red-500 text-sm">{formik.errors.description}</p>
                                )}

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <input type="date" {...formik.getFieldProps("date")} className={handleClass("date")} />
                                        {formik.touched.date && formik.errors.date && (
                                            <p className="text-red-500 text-sm">{formik.errors.date}</p>
                                        )}
                                    </div>
                                    <div>
                                        <input type="time" {...formik.getFieldProps("time")} className={handleClass("time")} />
                                        {formik.touched.time && formik.errors.time && (
                                            <p className="text-red-500 text-sm">{formik.errors.time}</p>
                                        )}
                                    </div>
                                </div>

                                <select {...formik.getFieldProps("category")} className={handleClass("category")}>
                                    <option value="upcomingevent">Upcoming Event</option>
                                    <option value="featureEvent">Featured Event</option>
                                </select>

                                {/* Cover Image */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-600">Event Cover Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleCoverChange}
                                        className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                                    />
                                    {formik.touched.coverImage && formik.errors.coverImage && (
                                        <p className="text-red-500 text-sm">{formik.errors.coverImage}</p>
                                    )}
                                    {coverPreview && (
                                        <img
                                            src={coverPreview}
                                            alt="Cover Preview"
                                            className="mt-2 w-48 h-36 object-cover rounded-xl shadow-md"
                                        />
                                    )}
                                </div>

                                {/* Gallery Images */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-600">Detail Images</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImagesChange}
                                        className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                                    />
                                </div>

                            </div>

                            {/* Organizer + Venue */}
                            <div className="space-y-6">
                                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl shadow-md space-y-4">
                                    <h3 className="text-lg font-semibold text-purple-700 border-b pb-2">👤 Organizer</h3>
                                    <input placeholder="Organizer Name" {...formik.getFieldProps("organizer.name")} className={handleClass("organizer.name")} />
                                    {formik.touched.organizer?.name && formik.errors.organizer?.name && (
                                        <p className="text-red-500 text-sm">{formik.errors.organizer.name}</p>
                                    )}
                                    <input placeholder="Company" {...formik.getFieldProps("organizer.company")} className={handleClass("organizer.company")} />
                                    {/* <input type="file" accept="image/*" onChange={handleOrganizerChange} />
                                    {organizerPreview && <img src={organizerPreview} alt="Organizer Preview" className="mt-2 w-32 h-32 object-cover rounded-xl shadow-md" />} */}
                                </div>

                                <div className="bg-gradient-to-br from-pink-50 to-indigo-50 p-6 rounded-2xl shadow-md space-y-4">
                                    <h3 className="text-lg font-semibold text-pink-700 border-b pb-2">📍 Venue Details</h3>
                                    <input placeholder="Venue Name" {...formik.getFieldProps("venue.name")} className={handleClass("venue.name")} />
                                    {formik.touched.venue?.name && formik.errors.venue?.name && (
                                        <p className="text-red-500 text-sm">{formik.errors.venue.name}</p>
                                    )}
                                    <input placeholder="Address" {...formik.getFieldProps("venue.address")} className={handleClass("venue.address")} />
                                    {formik.touched.venue?.address && formik.errors.venue?.address && (
                                        <p className="text-red-500 text-sm">{formik.errors.venue.address}</p>
                                    )}
                                    <input placeholder="Google Map URL" {...formik.getFieldProps("venue.googleMapUrl")} className={handleClass("venue.googleMapUrl")} />
                                    {formik.touched.venue?.googleMapUrl && formik.errors.venue?.googleMapUrl && (
                                        <p className="text-red-500 text-sm">{formik.errors.venue.googleMapUrl}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Tickets + Tags (Side by Side) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Ticket Options */}
                            <FormikProvider value={formik}>
                                <FieldArray name="ticketOptions">
                                    {({ push, remove }) => (
                                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl shadow-md space-y-4">
                                            <h3 className="text-lg font-bold text-indigo-600 mb-2">🎫 Ticket Options</h3>
                                            {formik.values.ticketOptions.map((ticket, index) => (
                                                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                                                    <input placeholder="Type" {...formik.getFieldProps(`ticketOptions.${index}.name`)} className={handleClass(`ticketOptions.${index}.name`)} />
                                                    <input type="number" placeholder="Price" {...formik.getFieldProps(`ticketOptions.${index}.price`)} className={handleClass(`ticketOptions.${index}.price`)} />
                                                    <input type="number" placeholder="Quantity" {...formik.getFieldProps(`ticketOptions.${index}.availableQuantity`)} className={handleClass(`ticketOptions.${index}.availableQuantity`)} />
                                                    <div className="flex space-x-2">
                                                        <button type="button" className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg" onClick={() => push({ name: "", price: "", availableQuantity: "" })}>+</button>
                                                        {index > 0 && <button type="button" className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg" onClick={() => remove(index)}>-</button>}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </FieldArray>
                            </FormikProvider>

                            {/* Tags */}
                            <FormikProvider value={formik}>
                                <FieldArray name="tags">
                                    {({ push, remove }) => (
                                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl shadow-md space-y-4">
                                            <h3 className="text-lg font-bold text-purple-600 mb-2">🏷️ Tags</h3>
                                            {formik.values.tags.map((tag, index) => (
                                                <div key={index} className="flex space-x-2 items-center">
                                                    <input {...formik.getFieldProps(`tags.${index}`)} className={handleClass(`tags.${index}`)} />
                                                    <button type="button" className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg" onClick={() => push("")}>+</button>
                                                    {index > 0 && <button type="button" className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg" onClick={() => remove(index)}>-</button>}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </FieldArray>
                            </FormikProvider>
                        </div>


                        <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50">
                            {isLoading ? "Submitting..." : "🚀 Submit Event"}
                        </button>

                        {isError && <p className="text-red-500 mt-2">❌ {error?.data?.message || "Failed to add event"}</p>}
                        {isSuccess && <p className="text-green-500 mt-2">✅ Event added successfully!</p>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddEvent
