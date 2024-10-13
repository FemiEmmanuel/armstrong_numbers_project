// import React, { useState, useEffect } from "react";
// import { getAttempts } from "../store/api";

// function Attempts() {
//   const [attempts, setAttempts] = useState([]);

//   useEffect(() => {
//     fetchAttempts();
//   }, []);

//   const fetchAttempts = async () => {
//     const data = await getAttempts();
//     setAttempts(data);
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Your Attempts</h2>
//       {attempts.length > 0 ? (
//         <table className="w-full">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="p-2 text-left">Number</th>
//               <th className="p-2 text-left">Result</th>
//               <th className="p-2 text-left">Timestamp</th>
//             </tr>
//           </thead>
//           <tbody>
//             {attempts.map((attempt) => (
//               <tr key={attempt.id} className="border-b">
//                 <td className="p-2">{attempt.number}</td>
//                 <td className="p-2">
//                   {attempt.is_armstrong ? "Armstrong" : "Not Armstrong"}
//                 </td>
//                 <td className="p-2">
//                   {new Date(attempt.timestamp).toLocaleString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No attempts yet.</p>
//       )}
//     </div>
//   );
// }

// export default Attempts;
