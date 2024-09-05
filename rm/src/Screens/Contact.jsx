import React, { useState } from 'react';
import Navbar from '../Components/NavBar';
import { useFrappeCreateDoc } from 'frappe-react-sdk';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name1: '',
    mail_id: '',
    subject: '',
    message: ''
  });

  const { createDoc } = useFrappeCreateDoc();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const doc = await createDoc('Support', formData);
      alert('Your message has been sent successfully!');
      setFormData({ name1: '', mail_id: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error creating support document:', error);
      alert('Failed to send your message. Please try again later.');
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
     
      <div className="container mx-auto px-6 py-16 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
        <p className="text-center mb-12 max-w-2xl">
          We'd love to hear from you! Reach out to us using the information below or send us a message using the form.
        </p>

        <div className="flex flex-wrap justify-center mb-16 w-full">
          {/* Phone, Email, Address Info Boxes */}
        </div>

        <div className="contact-form bg-gray-800 p-12 rounded-lg w-full max-w-lg">
          <h2 className="text-3xl font-semibold text-center mb-8">Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-6">
              <label htmlFor="name1" className="block mb-2 text-lg">Your Name</label>
              <input
                type="text"
                id="name1"
                name="name1"
                value={formData.name1}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400"
              />
            </div>
            <div className="form-group mb-6">
              <label htmlFor="mail_id" className="block mb-2 text-lg">Your Email</label>
              <input
                type="email"
                id="mail_id"
                name="mail_id"
                value={formData.mail_id}
                onChange={handleChange}
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
                value={formData.subject}
                onChange={handleChange}
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
                value={formData.message}
                onChange={handleChange}
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
