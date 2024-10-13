import React from "react";
import { useGetContactInfoQuery } from "../store/api";
import { useSelector } from "react-redux";
import { Home, Phone, Mail } from "lucide-react";

const Contact = () => {
  const { data, error, isLoading } = useGetContactInfoQuery();
  const contactInfo = useSelector((state) => state.contactInfo.info); // Fetch from Redux store

  // Use fetched data if store data is not available
  const effectiveContactInfo = contactInfo || data;

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return (
      <div className="text-center py-8 text-red-600">
        Error loading contact information.
      </div>
    );

  return (
    <div className="bg-white p-8 max-w-2xl mx-auto">
      <h3 className="text-indigo-700 font-semibold mb-2">Contact Us</h3>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Get In Touch With Us
      </h2>
      <p className="text-gray-600 mb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>

      <div className="space-y-6">
        <ContactDetail
          icon={<Home />}
          title="Our Location"
          detail={effectiveContactInfo?.address}
        />
        <ContactDetail
          icon={<Phone />}
          title="Phone Number"
          detail={effectiveContactInfo?.contact_number}
        />
        <ContactDetail
          icon={<Mail />}
          title="Email Address"
          detail={effectiveContactInfo?.email}
        />
      </div>
    </div>
  );
};

const ContactDetail = ({ icon, title, detail }) => (
  <div className="flex items-center">
    <div className="bg-indigo-700 p-3 rounded-lg mr-4">{icon}</div>
    <div>
      <h4 className="font-semibold text-gray-800">{title}</h4>
      <p className="text-gray-600">{detail}</p>
    </div>
  </div>
);

export default Contact;
