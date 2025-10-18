import React, { useEffect } from "react";

// Header Component
const Header = () => {
  useEffect(() => {
    const header = document.getElementById("header");
    const handleScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add("py-2", "shadow-xl");
        header.classList.remove("py-4");
      } else {
        header.classList.remove("py-2", "shadow-xl");
        header.classList.add("py-4");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      id="header"
      className="bg-white/90 backdrop-blur-md fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300"
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">TaskFlow</h1>
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#features"
            className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
          >
            How It Works
          </a>
          <a
            href="/"
            className="bg-indigo-600 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-indigo-700 transition-transform transform hover:scale-105"
          >
            Get Started
          </a>
        </nav>
        <button className="md:hidden text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

// Hero Component
const Hero = () => (
  <section className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-center py-28 md:py-36">
    <div className="container mx-auto px-6">
      <h2
        style={{ animationDelay: "0.2s" }}
        className="animate-fadeIn text-4xl md:text-6xl font-extrabold leading-tight mb-6"
      >
        Collaborate, Manage, and Conquer Your Tasks
      </h2>
      <p
        style={{ animationDelay: "0.4s" }}
        className="animate-fadeIn text-lg md:text-xl max-w-3xl mx-auto opacity-90 mb-10"
      >
        The ultimate platform for admins to assign tasks and for users to manage
        them effortlessly. Boost productivity and streamline your workflow.
      </p>
      <a
        href="#cta"
        style={{ animationDelay: "0.6s" }}
        className="animate-fadeIn inline-block bg-white text-indigo-600 font-bold py-3 px-8 rounded-lg shadow-xl text-lg hover:bg-gray-100 transition-transform transform hover:scale-105"
      >
        Launch Your Dashboard
      </a>
    </div>
  </section>
);

// Feature Card Component
const FeatureCard = ({ icon, title, description, color }) => (
  <div className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 feature-card">
    <div className={`${color} rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-6`}>
      {icon}
    </div>
    <h4 className="text-xl font-semibold mb-3">{title}</h4>
    <p className="text-gray-600">{description}</p>
  </div>
);

// Features Component
const Features = () => (
  <section id="features" className="py-20 bg-white">
    <div className="container mx-auto px-6 text-center">
      <h3 className="text-3xl font-bold mb-4">Why TaskFlow?</h3>
      <p className="text-gray-600 max-w-2xl mx-auto mb-12">
        Everything you need to drive productivity and ensure accountability in
        one place.
      </p>
      <div className="grid md:grid-cols-3 gap-10">
        <FeatureCard
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 11a4 4 0 110-5.292M12 4.354a4 4 0 000 5.292"
              />
            </svg>
          }
          title="Admin Dashboard"
          description="A powerful and intuitive dashboard for admins to assign, track, and manage all tasks seamlessly."
          color="bg-indigo-100"
        />
        <FeatureCard
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
          }
          title="User Task Management"
          description="A personal, organized space for users to view assigned tasks, categorize their work, and stay on top of deadlines."
          color="bg-green-100"
        />
        <FeatureCard
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          }
          title="Real-Time Notifications"
          description="Stay updated instantly. Users receive real-time notifications for newly assigned tasks, ensuring nothing is missed."
          color="bg-purple-100"
        />
      </div>
    </div>
  </section>
);

// Step Component
const Step = ({ number, title, description }) => (
  <div className="step text-center max-w-xs p-6">
    <div className="text-5xl font-extrabold text-indigo-200 mb-4">{number}</div>
    <h4 className="text-xl font-semibold mb-2">{title}</h4>
    <p className="text-gray-600">{description}</p>
  </div>
);

// Steps Component
const Steps = () => (
  <section id="how-it-works" className="py-20 bg-gray-50">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold mb-4">Simple Steps to Success</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get up and running with TaskFlow in minutes.
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-10">
        <Step
          number="1"
          title="Admin Assigns"
          description="Admins log in to their dashboard, create a new task, and assign it to a user via email."
        />
        <div className="hidden md:block text-indigo-300 text-3xl">&rarr;</div>
        <Step
          number="2"
          title="User Notified"
          description='The assigned user instantly sees the new task in their dedicated "Assigned Tasks" section.'
        />
        <div className="hidden md:block text-indigo-300 text-3xl">&rarr;</div>
        <Step
          number="3"
          title="Task Managed"
          description="Users manage their personal and assigned tasks, categorizing and tracking their progress."
        />
      </div>
    </div>
  </section>
);

// CTA Component
const CTA = () => (
  <section className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-center py-20">
    <div className="container mx-auto px-6">
      <h3 className="text-3xl font-bold mb-4">Ready to Supercharge Your Workflow?</h3>
      <p className="mt-4 text-lg opacity-90 mb-6">Join now and experience a new level of productivity and team collaboration.</p>
      <a
        href="#"
        className="inline-block bg-white text-indigo-600 font-bold py-3 px-8 rounded-lg shadow-xl text-lg hover:bg-gray-100 transition-transform transform hover:scale-105"
      >
        Get Started for Free
      </a>
    </div>
  </section>
);

// Footer Component
const Footer = () => (
  <footer className="bg-gray-800 text-white py-8">
    <div className="container mx-auto px-6 text-center">
      <p>&copy; 2025 TaskFlow. All rights reserved.</p>
    </div>
  </footer>
);

const LandingPage = () => {
  useEffect(() => {
    // IntersectionObserver for fade-in animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("animate-fadeIn");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".feature-card, .step").forEach((el) =>
      observer.observe(el)
    );
    return () => observer.disconnect();
  }, []);

  return (
    <div className="scroll-smooth font-inter">
      <Header />
      <Hero />
      <Features />
      <Steps />
      <CTA />
      <Footer />
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
