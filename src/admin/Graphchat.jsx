// Graphchat.jsx
import React, { useMemo } from "react"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts"

const Graphchat = ({ tickets = [] }) => {
    // ✅ Monthly earnings chart data
    const monthlyData = useMemo(() => {
        const monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ]
        const counts = {}

        tickets.forEach(ticket => {
            if (!ticket.createdAt) return
            const date = new Date(ticket.createdAt)
            const month = monthNames[date.getMonth()]
            counts[month] = (counts[month] || 0) + (ticket.totalAmount || 0)
        })

        return monthNames.map(m => ({
            month: m,
            value: counts[m] || 0,
        }))
    }, [tickets])

    if (!tickets.length) {
        return <p className="text-gray-500">No earnings data available</p>
    }

    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
                📊 Event Earnings Statistics
            </h2>
            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip formatter={(val) => `₹ ${val.toLocaleString()}`} />
                    <Bar dataKey="value" fill="#43a047" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Graphchat
