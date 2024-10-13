// import React, { useState } from "react";
// import { submitFeedback } from "../store/api";

// function Feedback() {
//   const [content, setContent] = useState("");
//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await submitFeedback(content);
//     setContent("");
//     setSubmitted(true);
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Submit Feedback</h2>
//       {submitted ? (
//         <p className="text-green-600">Thank you for your feedback!</p>
//       ) : (
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="feedback" className="block mb-1">
//               Your Feedback:
//             </label>
//             <textarea
//               id="feedback"
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               className="border rounded p-2 w-full h-32"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             Submit Feedback
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }

// export default Feedback;
