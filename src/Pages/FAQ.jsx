import React, { useState } from 'react'

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null)
    const toggle = (index) => setOpenIndex(openIndex === index ? null : index)


    const faqs = [
        {
            question: 'How do I purchase tickets?',
            answer: (
                <>
                    <p>There are several options when buying tickets:</p>
                    <p className="mt-2">
                        You can purchase any ticket to any events listed on our website. To buy, select the #
                        of tickets you want to purchase in the dropdown of a specific event and follow the
                        instructions.
                    </p>
                    <p className="mt-2">
                        <strong>Email:</strong> Not sure where to go or how to buy tickets? Email us at{' '}
                        <a href="mailto:us.sulekha@sulekha.com" className="text-blue-600 underline">
                            us.sulekha@sulekha.com
                        </a>.
                    </p>
                    <p className="mt-2">
                        <strong>Phone:</strong> You can purchase tickets over the phone{' '}
                        <a href="tel:1-512-788-5300" className="text-blue-600 underline">
                            1-512-788-5300
                        </a>{' '}
                        (Mon to Fri – 11am to 8pm – EST)
                    </p>
                </>
            ),
        },
        {
            question: "What is Sulekha's Refund Policy?",
            answer: (
                <>
                    <p>All sales are final.</p>
                    <p className="mt-2">
                        No refunds will be issued under any circumstance unless an event is canceled or rescheduled.
                    </p>
                    <p className="mt-2">
                        If your event is canceled, in most cases you won't need to do anything. We will inform you about the cancelation and the face value of the ticket will be refunded to your account, <strong>NOT</strong> the transaction fee.
                    </p>
                    <p className="mt-2">By purchasing tickets you are accepting these terms.</p>
                    <p className="mt-2">
                        If you have any questions, please email us at{' '}
                        <a href="mailto:us.sulekha@sulekha.com" className="text-blue-600 underline">
                            us.sulekha@sulekha.com
                        </a>{' '}
                        or call{' '}
                        <a href="tel:1-512-788-5300" className="text-blue-600 underline">
                            1-512-788-5300
                        </a>{' '}
                        (Mon to Fri - 11am to 8pm – EST).
                    </p>
                </>
            ),
        },
    ]
    return <>
        {/* FAQ */}
        <div className="bg-white border rounded shadow mb-5 p-3 max-w-7xl mx-auto">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-center md:text-left">FAQ's</h2>
            <hr />
            <div className="divide-y">
                {faqs.map((faq, index) => (
                    <div key={index} className="px-6 py-4">
                        <button
                            onClick={() => toggle(index)}
                            className="w-full text-left text-lg font-medium focus:outline-none"
                        >
                            {faq.question}
                        </button>
                        {openIndex === index && <div className="mt-2 text-gray-700 text-sm">{faq.answer}</div>}
                    </div>
                ))}
            </div>
        </div>
    </>
}

export default FAQ