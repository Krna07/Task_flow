import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_h04mhgh", "template_0n68tag", form.current, {
        publicKey: "zFUyf9-RAXn1NgxcL",
      })
      .then(
        () => {
          alert("✅ Message sent successfully!");
        },
        (error) => {
          alert("❌ Failed to send message. Please try again.");
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-6">
      <form
        ref={form}
        onSubmit={sendEmail}
        className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-8 w-full max-w-md transition-transform duration-300 hover:scale-[1.02]"
      >
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
          ✉️ Contact Us
        </h2>

        <label className="block mb-2 text-gray-700 font-medium">Name</label>
        <input
          type="text"
          name="user_name"
          required
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder="Your Name"
        />

        <label className="block mb-2 text-gray-700 font-medium">Email</label>
        <input
          type="email"
          name="user_email"
          required
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder="you@example.com"
        />

        <label className="block mb-2 text-gray-700 font-medium">Message</label>
        <textarea
          name="message"
          required
          className="w-full mb-6 p-3 border border-gray-300 rounded-lg h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder="Write your message..."
        ></textarea>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-300"
        >
          🚀 Send Message
        </button>
      </form>
    </div>
  );
};
