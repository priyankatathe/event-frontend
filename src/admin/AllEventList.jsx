import React, { useEffect, useState } from "react"
import { useGetAuthEventQuery } from "../redux/api/authApi"
import { useDeleteEventMutation, useUpdateEventMutation } from "../redux/api/eventBookApi"
import { toast } from "react-toastify"
import { FieldArray, FormikProvider, useFormik } from "formik"
import * as yup from "yup"
import clsx from "clsx"
import BookTicketList from "./BookTicketList"

const AllEventList = () => {
    const { data, isLoading, refetch, isError } = useGetAuthEventQuery()
    const [deleteEvent,
        { isLoading: isDeleteLoading, isSuccess: isDeleteSuccess }
    ] = useDeleteEventMutation()
    const [updateEvent, { isSuccess: isUpdateSuccess, refetch: updateRefetch }] = useUpdateEventMutation()

    const [editItem, setEditItem] = useState(null)
    const [selectedEvent, setSelectedEvent] = useState(null)

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: editItem?.name || "",
            description: editItem?.description || "",
            date: editItem?.date?.slice(0, 10) || "",
            time: editItem?.time || "",
            venue: editItem?.venue?.name || "",
            address: editItem?.venue?.address || "",
            fees: editItem?.fees?.transactionFee || "",
            convenienceFee: editItem?.fees?.convenienceFee || "",
            coverImage: "",
            tags: editItem?.tags || [], // ✅ array not string
            ticketOptions:
                editItem?.ticketOptions?.map((t) => ({
                    name: t.name,
                    price: t.price,
                    availableQuantity: t.availableQuantity,
                })) || [], // ✅ array of objects
        },
        validationSchema: yup.object({
            name: yup.string().required("Enter event name"),
            description: yup.string().required("Enter description"),
            date: yup.string().required("Enter date"),
            time: yup.string().required("Enter time"),
            venue: yup.string().required("Enter venue name"),
            address: yup.string().required("Enter address"),
            fees: yup.number().required("Enter transaction fee"),
            convenienceFee: yup.number().required("Enter convenience fee"),
            coverImage: yup.mixed().notRequired(),
            tags: yup.array().of(yup.string()).notRequired(),
            ticketOptions: yup.array().of(
                yup.object({
                    name: yup.string().required(),
                    price: yup.number().required(),
                    availableQuantity: yup.number().required(),
                })
            ),
        }),
        onSubmit: (values, { resetForm }) => {
            const fd = new FormData();
            fd.append("name", values.name);
            fd.append("description", values.description);
            fd.append("date", values.date);
            fd.append("time", values.time);
            fd.append(
                "venue",
                JSON.stringify({ name: values.venue, address: values.address })
            );
            fd.append(
                "fees",
                JSON.stringify({
                    transactionFee: values.fees,
                    convenienceFee: values.convenienceFee,
                })
            );

            if (values.coverImage)
                fd.append("coverImage", values.coverImage);

            // ✅ tags already array
            if (values.tags.length > 0) {
                fd.append("tags", JSON.stringify(values.tags));
            }

            // ✅ tickets already array of objects
            if (values.ticketOptions.length > 0) {
                fd.append("ticketOptions", JSON.stringify(values.ticketOptions));
            }

            updateEvent({ id: editItem._id, data: fd });
            resetForm();
            refetch();
            setEditItem(null);
            document.getElementById("my_modal_5").close();
        },
    });


    const handleClass = (field) =>
        clsx({
            "input w-full border rounded px-3 py-2": true,
            "input-error": formik.touched[field] && formik.errors[field],
            "input-success": formik.touched[field] && !formik.errors[field],
        });

    useEffect(() => {
        if (isUpdateSuccess) {
            toast.success("Event updated successfully")
            document.getElementById("my_modal_5").close()
        }
    }, [isUpdateSuccess]);

    useEffect(() => {
        if (isDeleteSuccess) {
            toast.success("Event deleted successfully")
            refetch()
        }
    }, [isDeleteSuccess]);

    if (isLoading) return <p className="text-center text-gray-500 text-lg py-10">Loading events...</p>;
    if (isError) return <p className="text-center text-red-500 text-lg py-10">Failed to load events</p>;

    return <>
        <div className="md:ml-[250px] p-8 bg-gradient-to-br from-gray-100 via-purple-50 to-blue-100 min-h-screen">
            <h1 className="text-2xl font-bold">All Events & BOOKINGS</h1>
            {/* ✅ Show BookTicketList if event selected */}
            {selectedEvent ? (
                <div>
                    <button
                        className="mb-6 flex items-center gap-2 bg-gradient-to-r from-gray-700 to-gray-900 text-white px-5 py-2 rounded-lg shadow hover:scale-105 transition"
                        onClick={() => setSelectedEvent(null)}
                    >
                        ⬅ Back to Events
                    </button>

                    {selectedEvent && (
                        <>
                            {/* {console.log("Selected Event Props:", selectedEvent)} */}
                            <BookTicketList
                                eventId={selectedEvent._id}
                                adminId={selectedEvent.adminId?._id}
                            />
                        </>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data?.map(event => (
                        <div
                            key={event._id}
                            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 overflow-hidden transform hover:-translate-y-1 transition duration-300 p-6 flex flex-col gap-5 cursor-pointer"
                            onClick={() => setSelectedEvent(event)} // ✅ select event
                        >
                            {/* Cover */}
                            <div className="relative">
                                <img
                                    src={event.coverImage || "https://via.placeholder.com/400x200"}
                                    alt="cover"
                                    className="w-full h-48 object-cover rounded-xl shadow-sm"
                                />
                                <span className="absolute top-3 right-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
                                    {new Date(event.date).toLocaleDateString()}
                                </span>
                            </div>

                            {/* Details */}
                            <div className="space-y-2 text-sm text-gray-700">
                                <p><span className="font-semibold text-gray-600">🎉 Name:</span> {event.name}</p>
                                <p><span className="font-semibold text-gray-600">📝 Description:</span> {event.description}</p>
                                <p><span className="font-semibold text-gray-600">⏰ Time:</span> {event.time}</p>
                                <p><span className="font-semibold text-gray-600">📍 Venue:</span> {event.venue?.name}, {event.venue?.address}</p>
                                <p><span className="font-semibold text-gray-600">💰 Fees:</span> ₹{event.fees?.transactionFee} + ₹{event.fees?.convenienceFee}</p>
                            </div>

                            {/* Tags */}
                            {event.tags?.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {event.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full shadow-sm"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Tickets */}
                            {event.ticketOptions?.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {event.ticketOptions.map((ticket, i) => (
                                        <span
                                            key={i}
                                            className="bg-indigo-50 text-indigo-700 text-xs px-3 py-1 rounded-md border shadow-sm"
                                        >
                                            🎟 {ticket.name} - ₹{ticket.price} ({ticket.availableQuantity})
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex gap-3 mt-4">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setEditItem(event);
                                        document.getElementById("my_modal_5").showModal();
                                    }}
                                    className="flex-1  text-black bg-amber-300 hover:bg-amber-500    py-2 rounded-lg text-sm font-semibold shadow-md transition"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        deleteEvent(event._id)
                                    }}
                                    disabled={isDeleteLoading}
                                    className={`flex-1 ${isDeleteLoading
                                        ? "bg-red-300 cursor-not-allowed"
                                        : "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700"
                                        } text-white py-2 rounded-lg text-sm font-semibold shadow-md transition`}
                                >
                                    {isDeleteLoading ? "Deleting..." : " Delete"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}


            {/* Modal */}
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box rounded-2xl shadow-2xl border border-gray-200 max-w-3xl w-full">
                    <h3 className="font-bold text-2xl mb-6 text-center text-indigo-700">
                        ✏️ Edit Event
                    </h3>

                    <form onSubmit={formik.handleSubmit} className="space-y-5">
                        {/* Name & Description */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Event Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter event name"
                                    className={`${handleClass("name")} input input-bordered w-full`}
                                    {...formik.getFieldProps("name")}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
                                <input
                                    type="text"
                                    name="description"
                                    placeholder="Short description"
                                    className={`${handleClass("description")} input input-bordered w-full`}
                                    {...formik.getFieldProps("description")}
                                />
                            </div>
                        </div>

                        {/* Date & Time */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    className={`${handleClass("date")} input input-bordered w-full`}
                                    {...formik.getFieldProps("date")}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Time</label>
                                <input
                                    type="time"
                                    name="time"
                                    className={`${handleClass("time")} input input-bordered w-full`}
                                    {...formik.getFieldProps("time")}
                                />
                            </div>
                        </div>

                        {/* Venue & Address */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Venue Name</label>
                                <input
                                    type="text"
                                    name="venue"
                                    placeholder="Venue"
                                    className={`${handleClass("venue")} input input-bordered w-full`}
                                    {...formik.getFieldProps("venue")}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Address"
                                    className={`${handleClass("address")} input input-bordered w-full`}
                                    {...formik.getFieldProps("address")}
                                />
                            </div>
                        </div>

                        {/* Fees */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Transaction Fee</label>
                                <input
                                    type="number"
                                    name="fees"
                                    placeholder="Transaction Fee"
                                    className={`${handleClass("fees")} input input-bordered w-full`}
                                    {...formik.getFieldProps("fees")}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Convenience Fee</label>
                                <input
                                    type="number"
                                    name="convenienceFee"
                                    placeholder="Convenience Fee"
                                    className={`${handleClass("convenienceFee")} input input-bordered w-full`}
                                    {...formik.getFieldProps("convenienceFee")}
                                />
                            </div>
                        </div>

                        {/* Cover Image */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Cover Image</label>
                            <input
                                type="file"
                                name="coverImage"
                                className={`${handleClass("coverImage")} file-input file-input-bordered w-full`}
                                onChange={(e) => formik.setFieldValue("coverImage", e.currentTarget.files[0])}
                            />
                        </div>

                        {/* Tags & Tickets */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Tags */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Tags
                                </label>
                                <FormikProvider value={formik}>
                                    <FieldArray
                                        name="tags"
                                        render={(arrayHelpers) => (
                                            <div className="space-y-2">
                                                {formik.values.tags.map((tag, index) => (
                                                    <div key={index} className="flex items-center gap-2">
                                                        <input
                                                            type="text"
                                                            className="input input-bordered w-full"
                                                            value={formik.values.tags[index]}
                                                            onChange={(e) =>
                                                                formik.setFieldValue(`tags[${index}]`, e.target.value)
                                                            }
                                                        />
                                                        <button
                                                            type="button"
                                                            className="btn btn-error btn-sm"
                                                            onClick={() => arrayHelpers.remove(index)}
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    className="btn btn-primary btn-sm"
                                                    onClick={() => arrayHelpers.push("")}
                                                >
                                                    + Add Tag
                                                </button>
                                            </div>
                                        )}
                                    />
                                </FormikProvider>
                            </div>

                            {/* Tickets */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Tickets
                                </label>
                                <FormikProvider value={formik}>
                                    <FieldArray
                                        name="ticketOptions"
                                        render={(arrayHelpers) => (
                                            <div className="space-y-3">
                                                {formik.values.ticketOptions.map((ticket, index) => (
                                                    <div
                                                        key={index}
                                                        className="grid grid-cols-3 gap-2 items-center"
                                                    >
                                                        <input
                                                            type="text"
                                                            placeholder="Name"
                                                            className="input input-bordered w-full"
                                                            value={ticket.name}
                                                            onChange={(e) =>
                                                                formik.setFieldValue(
                                                                    `ticketOptions[${index}].name`,
                                                                    e.target.value
                                                                )
                                                            }
                                                        />
                                                        <input
                                                            type="number"
                                                            placeholder="Price"
                                                            className="input input-bordered w-full"
                                                            value={ticket.price}
                                                            onChange={(e) =>
                                                                formik.setFieldValue(
                                                                    `ticketOptions[${index}].price`,
                                                                    e.target.value
                                                                )
                                                            }
                                                        />
                                                        <input
                                                            type="number"
                                                            placeholder="Qty"
                                                            className="input input-bordered w-full"
                                                            value={ticket.availableQuantity}
                                                            onChange={(e) =>
                                                                formik.setFieldValue(
                                                                    `ticketOptions[${index}].availableQuantity`,
                                                                    e.target.value
                                                                )
                                                            }
                                                        />
                                                        <button
                                                            type="button"
                                                            className="btn btn-error btn-sm col-span-3"
                                                            onClick={() => arrayHelpers.remove(index)}
                                                        >
                                                            ✕ Remove
                                                        </button>
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    className="btn btn-primary btn-sm"
                                                    onClick={() =>
                                                        arrayHelpers.push({
                                                            name: "",
                                                            price: "",
                                                            availableQuantity: "",
                                                        })
                                                    }
                                                >
                                                    + Add Ticket
                                                </button>
                                            </div>
                                        )}
                                    />
                                </FormikProvider>
                            </div>
                        </div>


                        {/* Actions */}
                        <div className="modal-action flex flex-wrap justify-end gap-4 mt-6">
                            <button
                                type="submit"
                                className="btn bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 shadow hover:scale-105 transition"
                            >
                                ✅ Update
                            </button>
                            <form method="dialog">
                                <button className="btn btn-outline px-6">❌ Close</button>
                            </form>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>


    </>
};

export default AllEventList;


