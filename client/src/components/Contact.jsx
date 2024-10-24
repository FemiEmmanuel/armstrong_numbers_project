import React from "react";
import { useSelector } from "react-redux";
import { Home, Phone, Mail } from "lucide-react";
import ErrorDisplay from "./ErrorDisplay";

const Contact = ({ darkMode }) => {
   const { info, error } = useSelector((state) => state.contactInfo);

   if (error) return <ErrorDisplay error={error} />;

   const contactInfo = (info && info[0]);

  return (
    <>
      <h2
        className={`font-bold mb-2 ${
          darkMode ? "text-white" : "text-[#003366]"
        }`}
      >
        Contact
      </h2>
      <div
        className={`max-w-2xl rounded-sm shadow-lg overflow-hidden ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className={`p-6 `}>
          <h3
            className={`text-2xl font-semibold mb-4 ${
              darkMode ? "text-white" : "text-[#003366]"
            }`}
          >
            Get In Touch With Us
          </h3>
          <p className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            For enquires, reach out to us
          </p>
          <div className="space-y-6">
            <ContactDetail
              Icon={Home}
              label="Our Location"
              value={contactInfo.address}
              darkMode={darkMode}
              iconColor={darkMode ? "#FF6F61" : "#003366"}
            />
            <ContactDetail
              Icon={Phone}
              label="Phone Number"
              value={contactInfo.contact_number}
              darkMode={darkMode}
              iconColor={darkMode ? "#FF6F61" : "#003366"}
            />
            <ContactDetail
              Icon={Mail}
              label="Email Address"
              value={contactInfo.email}
              darkMode={darkMode}
              iconColor={darkMode ? "#FF6F61" : "#003366"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const ContactDetail = ({ Icon, label, value, darkMode, iconColor }) => (
  <div
    className={`flex items-center ${
      darkMode ? "text-gray-300" : "text-gray-900"
    }`}
  >
    <div
      className={`w-12 h-12 rounded-full flex items-center justify-center ${
        darkMode ? "bg-gray-600" : "bg-[#F5F5F5]"
      }`}
    >
      <Icon size={24} style={{ color: iconColor }} />
    </div>
    <div className="ml-4">
      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
        {label}
      </p>
      <p className="text-lg font-medium">{value}</p>
    </div>
  </div>
);

export default Contact;
