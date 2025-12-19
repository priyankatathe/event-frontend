import React from 'react'

const TermAndCon = () => {
    return <>
        <div className="bg-white border rounded shadow mb-5 p-3 max-w-7xl mx-auto">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-center md:text-left">Terms & Conditions</h2>
            <hr />
            <div className="mt-4 text-sm md:text-base text-gray-700 space-y-2 px-4 md:px-6">
                <ol className="list-decimal space-y-2 pl-4">
                    <li>Tickets once purchased cannot be modified or cancelled. Refunds will be initiated only in case of event cancellation.</li>
                    <li>Transaction fee per ticket may be levied. Please check the total amount before payment.</li>
                    <li>Organizers hold the right to deny late entry to the event. Hence, we recommend reaching the venue an hour before the event starts to ensure smooth entry.</li>
                    <li>If an event is canceled/postponed, Sulekha will refund only the face value of the ticket and NOT the transaction fee.</li>
                    <li>Every venue has its own rules and regulations. They hold the right to deny entry on the basis of the same.</li>
                    <li>These terms and conditions are subject to change from time to time at the discretion of the organiser.</li>
                    <li><strong>Important Alert:</strong> Tickets purchased from third parties are not authorized by Sulekha and will be denied entry. Buy only from Sulekha to ensure valid access.</li>
                </ol>
            </div>
        </div>
    </>
}

export default TermAndCon