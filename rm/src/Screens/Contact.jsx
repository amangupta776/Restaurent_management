import React from 'react';
import Navbar from '../Components/NavBar'; 

const ContactUs = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto px-6 py-16 flex flex-col items-center"> 
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
        <p className="text-center mb-12 max-w-2xl">
          We'd love to hear from you! Reach out to us using the information below or send us a message using the form.
        </p>

        <div className="flex flex-wrap justify-center mb-16 w-full">
          <div className="info-box bg-gray-800 p-8 m-4 rounded-lg text-center transform transition-transform hover:-translate-y-2 w-full md:w-1/3 max-w-sm">
            <i className="fas fa-phone-alt text-3xl mb-4 text-pink-500"></i>
            <h3 className="text-xl font-semibold mb-2">Phone</h3>
            <p className="text-gray-400">+1 (555) 123-4567</p>
          </div>
          <div className="info-box bg-gray-800 p-8 m-4 rounded-lg text-center transform transition-transform hover:-translate-y-2 w-full md:w-1/3 max-w-sm">
            <i className="fas fa-envelope text-3xl mb-4 text-pink-500"></i>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-gray-400">info@example.com</p>
          </div>
          <div className="info-box bg-gray-800 p-8 m-4 rounded-lg text-center transform transition-transform hover:-translate-y-2 w-full md:w-1/3 max-w-sm">
            <i className="fas fa-map-marker-alt text-3xl mb-4 text-pink-500"></i>
            <h3 className="text-xl font-semibold mb-2">Address</h3>
            <p className="text-gray-400">1234 Street Name,<br />City, State, 12345</p>
          </div>
        </div>

        <div className="contact-form bg-gray-800 p-12 rounded-lg w-full max-w-lg">
          <h2 className="text-3xl font-semibold text-center mb-8">Send Us a Message</h2>
          <form action="#" method="POST">
            <div className="form-group mb-6">
              <label htmlFor="name" className="block mb-2 text-lg">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                required
                className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400"
              />
            </div>
            <div className="form-group mb-6">
              <label htmlFor="email" className="block mb-2 text-lg">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400"
              />
            </div>
            <div className="form-group mb-6">
              <label htmlFor="subject" className="block mb-2 text-lg">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Enter subject"
                required
                className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400"
              />
            </div>
            <div className="form-group mb-6">
              <label htmlFor="message" className="block mb-2 text-lg">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                placeholder="Enter your message"
                required
                className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-3 rounded-lg text-lg transition-colors hover:bg-pink-600"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
