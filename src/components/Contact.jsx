import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useMainServices } from "./services/index";
const services = [
  "Deep Cleaning",
  "Movers & Packers",
  "Electrical Repairs",
  "Plumbing Services",
  "Carpentry Services",
  "Civil Work",
  "Car Maintenance",
  "Society Management",
];

const Contact = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNo: "",
    email: "",
    services: [],
    message: "",
  });

  //! validation form
  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("Full name is required");
      return false;
    }

    if (!formData.mobileNo.trim()) {
      toast.error("Mobile number is required");
      return false;
    }

    if (!/^[0-9]{10}$/.test(formData.mobileNo)) {
      toast.error("Enter valid 10 digit mobile number");
      return false;
    }

    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast.error("Enter valid email address");
      return false;
    }

    return true;
  };

  // ! handlechange function for contact form
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  //! submit for contact form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:4000/api/contact",
        formData,
      );

      if (res.data.success) {
        toast.success("Message sent successfully 🚀");

        setFormData({
          fullName: "",
          mobileNo: "",
          email: "",
          services: [],
          message: "",
        });

        setSelectedServices([]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  // const { data: services = [], isLoading } = useMainServices();
  // console.log(11111111, services);
  const toggleService = (service) => {
    let updatedServices;

    if (selectedServices.includes(service)) {
      updatedServices = selectedServices.filter((s) => s !== service);
    } else {
      updatedServices = [...selectedServices, service];
    }

    setSelectedServices(updatedServices);

    setFormData({
      ...formData,
      services: updatedServices,
    });
  };

  return (
    <section
      id="contact"
      className="bg-gradient-to-br from-gray-50 to-purple-50 py-20 px-4 scroll-mt-12"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <h2 className="mb-4 text-center text-4xl md:text-5xl font-bold">
          <span className="text-black">Get In Touch</span>
        </h2>

        <p className="mb-16 text-center text-base md:text-xl text-gray-600">
          We're here to help with all your property maintenance needs
        </p>

        {/* Grid Layout */}
        <div className="grid gap-12 md:grid-cols-2">
          {/* ================= Contact Form ================= */}
          <div className="rounded-3xl bg-white p-8 shadow-xl">
            <h3 className="mb-6 text-2xl font-bold text-black">
              Send Us a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  required
                  placeholder="Enter mobile number"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email (optional)"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
                />
              </div>

              {/* Services Selection */}
              <div>
                <label className="mb-3 block font-medium text-gray-700">
                  Services Interested In
                </label>

                <div className="grid grid-cols-2 gap-3">
                  {services.map((service) => {
                    const active = selectedServices.includes(service);

                    return (
                      <button
                        type="button"
                        key={service}
                        onClick={() => toggleService(service)}
                        className={`rounded-lg border px-4 py-3 text-sm font-medium transition
                        ${
                          active
                            ? "bg-black text-white border-black shadow-md"
                            : "bg-white text-gray-700 border-gray-300 hover:border-black hover:shadow"
                        }`}
                      >
                        {service}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Write your message..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-black px-6 py-4 text-lg font-semibold text-white transition hover:bg-gray-800 disabled:opacity-70"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* ================= Contact Info ================= */}
          <div className="space-y-6">
            {/* Info Card */}
            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <h3 className="mb-6 text-2xl font-bold text-black">
                Contact Information
              </h3>

              <div className="space-y-6">
                <InfoItem
                  icon="fa-phone"
                  title="Phone"
                  lines={["+91 98765 43210", "+91 98765 43211"]}
                />

                <InfoItem
                  icon="fa-envelope"
                  title="Email"
                  lines={[
                    "info@eliteproperty.care",
                    "support@eliteproperty.care",
                  ]}
                />

                <InfoItem
                  icon="fa-map-marker-alt"
                  title="Head Office"
                  lines={[
                    "123 Business Park, Sector 15",
                    "Delhi NCR, India - 110001",
                  ]}
                />

                <InfoItem
                  icon="fa-clock"
                  title="Working Hours"
                  lines={[
                    "Mon - Sat: 8:00 AM - 8:00 PM",
                    "Sun: 9:00 AM - 6:00 PM",
                    "24/7 Emergency Service",
                  ]}
                  highlightLast
                />
              </div>
            </div>

            {/* Social Media */}
            <div className="rounded-3xl bg-black p-8 text-white shadow-xl">
              <h3 className="mb-4 text-2xl font-bold">Follow Us</h3>
              <p className="mb-6">Stay connected for updates and offers</p>

              <div className="flex flex-wrap gap-4">
                {[
                  "facebook-f",
                  "instagram",
                  "twitter",
                  "linkedin-in",
                  "whatsapp",
                ].map((icon) => (
                  <a
                    key={icon}
                    href="#"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition hover:bg-gray-200"
                  >
                    <i className={`fab fa-${icon} text-xl`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ================= Reusable Info Item ================= */
const InfoItem = ({ icon, title, lines, highlightLast }) => (
  <div className="flex items-start">
    <i className={`fas ${icon} mr-4 mt-1 text-2xl`}></i>
    <div>
      <h4 className="text-lg font-bold">{title}</h4>
      {lines.map((line, i) => (
        <p
          key={i}
          className={`${
            highlightLast && i === lines.length - 1
              ? "font-medium"
              : "text-gray-600"
          }`}
        >
          {line}
        </p>
      ))}
    </div>
  </div>
);

export default Contact;
