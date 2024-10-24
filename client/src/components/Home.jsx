import React from "react";
import armstrong3 from "../assets/armstrong3.jpg";
import armstrong4 from "../assets/armstrong4.jpg";
import armstrong2 from "../assets/armstrong2.png";
import armstrong1 from "../assets/armstrong1.jpg";
import armstrong5 from "../assets/armstrong5.jpg";
import armstrong6 from "../assets/armstrong6.jpg";
import armstrong7 from "../assets/armstrong7.png";
import armstrong8 from "../assets/armstrong8.jpg";
import Armstrong from "../assets/Armstrong.mp4"

const ArmstrongNumbersPage = ({ darkMode }) => {
  const images = [
    { src: armstrong1, alt: "Armstrong Number" },
    { src: armstrong2, alt: "Armstrong Number" },
    { src: armstrong3, alt: "Armstrong Number" },
    { src: armstrong4, alt: "Armstrong Number" },
    { src: armstrong5, alt: "Armstrong Number" },
    { src: armstrong6, alt: "Armstrong Number" },
    { src: armstrong7, alt: "Armstrong Number" },
    { src: armstrong8, alt: "Armstrong Number" },
  ];

  return (
    <div className={darkMode ? "bg-gray-800" : "bg-gray-100"}>
      <div className="max-w-4xl p-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2
                className={`text-2xl font-bold mb-4 ${
                  darkMode ? "text-white" : "text-[#003366]"
                }`}
              >
                What is an Armstrong Number?
              </h2>
              <p
                className={`mb-4 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                An Armstrong number (also known as a narcissistic number) is a
                number that is equal to the sum of its own digits, each raised
                to the power of the number of digits.
              </p>
              <p
                className={`mb-4 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                For instance, for a 3-digit number, each digit is raised to the
                power of 3 and the sum equals the number itself.
              </p>
              <h3
                className={`text-xl font-bold mb-4 ${
                  darkMode ? "text-white" : "text-[#003366]"
                }`}
              >
                Examples of Armstrong Numbers:
              </h3>
              <ul
                className={`list-disc pl-6 mb-4 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <li>
                  <strong>153</strong> = 1³ + 5³ + 3³ = 153
                </li>
                <li>
                  <strong>370</strong> = 3³ + 7³ + 0³ = 370
                </li>
                <li>
                  <strong>407</strong> = 4³ + 0³ + 7³ = 407
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h3
                className={`text-xl font-bold mb-4 ${
                  darkMode ? "text-white" : "text-[#003366]"
                }`}
              >
                Watch the Video to Learn More
              </h3>
              <div
                className={`w-full max-w-md border-4 rounded-lg overflow-hidden ${
                  darkMode ? "border-gray-700" : "border-gray-300"
                }`}
              >
                <div className="relative pb-[56.25%] overflow-hidden">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={Armstrong}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative pb-[100%] overflow-hidden rounded-lg border-4 ${
                darkMode ? "border-gray-700" : "border-gray-300"
              }`}
            >
              <img
                className="absolute top-0 left-0 w-full h-full object-fill"
                src={image.src}
                alt={image.alt}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArmstrongNumbersPage;
