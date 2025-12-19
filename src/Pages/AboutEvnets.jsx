import React, { useRef } from "react";
import Footer from "./Footer";

const AboutEvents = () => {
    const aboutRef = useRef(null);

    const handleScroll = () => {
        if (aboutRef.current) {
            aboutRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="w-full font-sans text-gray-800 overflow-x-hidden">
            {/* Hero Section */}
            <section
                className="relative min-h-screen flex items-center justify-center text-center bg-cover bg-center px-4"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2')",
                }}
            >
                <div className="absolute inset-0 bg-black/60" />

                {/* Purple Shapes (hide on mobile) */}
                <div className="hidden sm:block absolute left-0 top-1/4 w-40 h-40 md:w-52 md:h-52 bg-purple-500/60 rounded-full blur-2xl"></div>
                <div className="hidden sm:block absolute right-0 bottom-1/4 w-40 h-40 md:w-52 md:h-52 bg-purple-600/60 rounded-full blur-2xl"></div>

                {/* Content */}
                <div className="relative z-10 max-w-3xl px-4 md:px-6">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-snug md:leading-tight mb-6">
                        LET MUSIC FLOW IN YOUR HEART <br className="hidden sm:block" /> AND
                        ENRICH YOUR SOUL
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6">
                        An Annual Music And Arts Festival
                    </p>

                    {/* Down Arrow */}
                    <div className="mt-8 md:mt-12 animate-bounce flex justify-center">
                        <button
                            onClick={handleScroll}
                            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full border-2 border-white text-white hover:bg-white hover:text-black transition"
                        >
                            ↓
                        </button>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section
                ref={aboutRef}
                className="py-16 md:py-20 px-4 md:px-20 text-center bg-white relative overflow-hidden"
            >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-purple-700 mb-3">
                    ABOUT THE MUSIC FESTIVAL
                </h2>
                <p className="uppercase tracking-wider text-xs sm:text-sm text-gray-600 mb-6">
                    Experience Rock N Roll Like Never Before
                </p>

                <p className="max-w-3xl mx-auto text-gray-600 mb-10 text-sm sm:text-base leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus nec
                    feugiat in fermentum. Egestas diam in arcu cursus euismod quis. Ut
                    sem nulla pharetra, diam sit amet. Sed risus pretium quam vulputate.
                    Aliquet vestibulum sed arcu non. Amet facilisis magna etiam tempor
                    orci eu. Proin sed libero enim sed.
                </p>

                <button className="px-6 sm:px-8 py-2 sm:py-3 rounded-full bg-purple-700 text-white font-semibold shadow-md hover:bg-purple-800 transition">
                    REGISTER NOW
                </button>

                {/* Decorative Shapes Right Bottom (hide on mobile) */}
                <div className="hidden sm:block absolute right-0 bottom-0 w-40 h-40 md:w-60 md:h-60 opacity-10">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 200 200"
                        className="w-full h-full"
                    >
                        <polygon
                            points="50,0 100,100 0,100"
                            fill="purple"
                            opacity="0.4"
                        />
                        <polygon
                            points="150,50 200,150 100,150"
                            fill="purple"
                            opacity="0.6"
                        />
                    </svg>
                </div>
            </section>
        </div>
    );
};

export default AboutEvents;
