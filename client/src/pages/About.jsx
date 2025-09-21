import React from "react";

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-gray-900 text-white py-10 text-center">
        <h1 className="text-4xl font-bold">Fashion Shop</h1>
        <p className="text-gray-300 mt-2">Style for Everyone</p>
      </header>

      {/* About Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">
          About Us
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
            src="https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg"
            alt="Clothing Store"
            className="w-full md:w-1/2 rounded-2xl shadow-lg"
          />
          <div className="md:w-1/2 text-gray-700 space-y-4">
            <p>
              Welcome to <strong>Fashion Shop</strong>, your number one source
              for trendy and stylish clothing. We're dedicated to giving you the
              very best outfits, with a focus on quality, design, and uniqueness.
            </p>
            <p>
              Founded in 2020, our shop has come a long way from its beginnings
              as a small local store. Now, we serve customers all over the
              country and are thrilled to turn our passion for fashion into a
              brand you can trust.
            </p>
            <p>
              We hope you enjoy our collections as much as we enjoy offering
              them to you. If you have any questions, feel free to{" "}
              <a
                href="#"
                className="text-blue-600 hover:underline font-medium"
              >
                contact us
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-12">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">
          Meet Our Team
        </h2>
        <div className="flex flex-wrap justify-center gap-6 px-6">
          {/* Member 1 */}
          <div className="bg-gray-100 rounded-2xl shadow-md p-5 w-64 text-center">
            <img
              src="https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg"
              alt="Anna Smith"
              className="rounded-2xl mb-4 w-full h-64 object-cover"
            />
            <h3 className="text-lg font-semibold text-gray-800">Anna Smith</h3>
            <p className="text-gray-600">Founder & CEO</p>
          </div>

          {/* Member 2 */}
          <div className="bg-gray-100 rounded-2xl shadow-md p-5 w-64 text-center">
            <img
              src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
              alt="James Lee"
              className="rounded-2xl mb-4 w-full h-64 object-cover"
            />
            <h3 className="text-lg font-semibold text-gray-800">James Lee</h3>
            <p className="text-gray-600">Head of Design</p>
          </div>

          {/* Member 3 */}
          <div className="bg-gray-100 rounded-2xl shadow-md p-5 w-64 text-center">
            <img
              src="https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg"
              alt="Lisa Brown"
              className="rounded-2xl mb-4 w-full h-64 object-cover"
            />
            <h3 className="text-lg font-semibold text-gray-800">Lisa Brown</h3>
            <p className="text-gray-600">Marketing Manager</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6 mt-10">
        <p>&copy; 2025 Fashion Shop. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
