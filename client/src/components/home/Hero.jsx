import React from "react";

const Hero = () => {
    return (
        <section className="bg-gray-100">
            <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 items-center gap-10">
                {/* Left content */}
                <div>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                        Discover the new{" "}
                        <span className="text-green-600">Product</span>
                    </h1>
                    <p className="mt-6 text-lg text-gray-600">
                        The latest smartwatch with a sleek design, advanced
                        features, 24/7 health monitoring, and up to 7 days of
                        battery life.
                    </p>
                    <button className="px-6 py-3 mt-6 rounded-2xl bg-green-600 text-white font-medium hover:bg-green-700 transition">
                        Get collection
                    </button>
                </div>

                {/* Right image */}
                <div className="flex justify-center">
                    <img
                        src="https://spencil.vn/wp-content/uploads/2024/11/chup-anh-san-pham-SPencil-Agency-1.jpg"
                        alt="Hero Illustration"
                        className="rounded-2xl shadow-lg"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;
