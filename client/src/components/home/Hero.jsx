import React from "react";
import heroImage from "../../assets/hero.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 items-center gap-10">
        {/* Left content */}
        <div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Elevate Your Style with{" "}
            <span className="text-green-600">New Arrivals</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Discover our latest clothing collection featuring modern designs,
            premium fabrics, and comfortable fits — perfect for every occasion.
          </p>
          <Link
            to="/collection"
            className="inline-block px-6 py-3 mt-6 rounded-2xl bg-green-600 text-white font-medium hover:bg-green-700 transition"
          >
            Shop Now
          </Link>
        </div>

        {/* Right image */}
        <div className="flex justify-center">
          <img
            src={heroImage}
            alt="Clothing Collection"
            className="rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
