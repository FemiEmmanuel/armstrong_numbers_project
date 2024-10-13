// import React, { useState, useEffect } from "react";
// import { getProfile, updateProfile } from "../store/api";

// function Profile() {
//   const [profile, setProfile] = useState(null);
//   const [editMode, setEditMode] = useState(false);

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     const data = await getProfile();
//     setProfile(data);
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     await updateProfile(profile);
//     setEditMode(false);
//   };

//   if (!profile) return <div>Loading...</div>;

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4">User Profile</h2>
//       {editMode ? (
//         <form onSubmit={handleUpdate} className="space-y-4">
//           <div>
//             <label className="block mb-1">First Name:</label>
//             <input
//               type="text"
//               value={profile.first_name}
//               onChange={(e) =>
//                 setProfile({ ...profile, first_name: e.target.value })
//               }
//               className="border rounded p-2 w-full"
//             />
//           </div>
//           <div>
//             <label className="block mb-1">Last Name:</label>
//             <input
//               type="text"
//               value={profile.last_name}
//               onChange={(e) =>
//                 setProfile({ ...profile, last_name: e.target.value })
//               }
//               className="border rounded p-2 w-full"
//             />
//           </div>
//           <div>
//             <label className="block mb-1">Email:</label>
//             <input
//               type="email"
//               value={profile.email}
//               onChange={(e) =>
//                 setProfile({ ...profile, email: e.target.value })
//               }
//               className="border rounded p-2 w-full"
//             />
//           </div>
//           <div>
//             <label className="block mb-1">Contact Number:</label>
//             <input
//               type="tel"
//               value={profile.contact_number}
//               onChange={(e) =>
//                 setProfile({ ...profile, contact_number: e.target.value })
//               }
//               className="border rounded p-2 w-full"
//             />
//           </div>
//           <div>
//             <label className="block mb-1">Address:</label>
//             <textarea
//               value={profile.address}
//               onChange={(e) =>
//                 setProfile({ ...profile, address: e.target.value })
//               }
//               className="border rounded p-2 w-full"
//             />
//           </div>
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             Save Changes
//           </button>
//         </form>
//       ) : (
//         <div className="space-y-2">
//           <p>
//             <strong>Name:</strong> {profile.full_name}
//           </p>
//           <p>
//             <strong>Email:</strong> {profile.email}
//           </p>
//           <p>
//             <strong>Contact Number:</strong> {profile.contact_number}
//           </p>
//           <p>
//             <strong>Address:</strong> {profile.address}
//           </p>
//           <button
//             onClick={() => setEditMode(true)}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
//           >
//             Edit Profile
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Profile;
