import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUpdateUserMutation, useDeleteUserMutation } from "../store/api";
import { FormInput, SubmitButton } from "./FormInput";
import ErrorDisplay from "./ErrorDisplay";
import { User, Mail, Phone, MapPin, Edit2, X, Trash2 } from "lucide-react";

function Profile({ darkMode }) {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [updateUser, { isLoading, error }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: userDeleteLoading }] =
    useDeleteUserMutation();
  const [editMode, setEditMode] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [editedProfile, setEditedProfile] = useState(currentUser || {});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({ ...editedProfile, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUser(editedProfile).unwrap();
      setEditMode(false);
    } catch (error) {}
  };

  const handleDelete = async () => {
    try {
      const userId = currentUser.id;
      await deleteUser(userId).unwrap();
      setShowDeleteDialog(false);
      navigate("/");
    } catch (error) {}
  };

  const displayProfile = editMode ? editedProfile : currentUser;

  return (
    <>
      <h2
        className={`font-bold mb-2 ${
          darkMode ? "text-white" : "text-[#003366]"
        }`}
      >
        User Profile
      </h2>
      <div
        className={`max-w-2xl rounded-sm shadow-lg overflow-hidden ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => setShowDeleteDialog(true)}
            className={`px-4 py-2 rounded-full transition duration-300 flex items-center ${
              darkMode
                ? "bg-red-900/60 text-white hover:bg-red-800"
                : "bg-red-50 text-red-600 hover:bg-red-100"
            }`}
          >
            <Trash2 size={18} className="mr-2" /> Delete Account
          </button>
          <button
            onClick={() => setEditMode(!editMode)}
            className={`px-4 py-2 rounded-full transition duration-300 flex items-center ${
              darkMode
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-white text-[#003366] hover:bg-[#F5F5F5]"
            }`}
          >
            {editMode ? (
              <>
                <X size={18} className="mr-2" /> Cancel
              </>
            ) : (
              <>
                <Edit2 size={18} className="mr-2" /> Edit Profile
              </>
            )}
          </button>
        </div>
        <div className="flex items-center p-3">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center ${
              darkMode ? "bg-gray-700" : "bg-[#F5F5F5]"
            }`}
          >
            <User
              size={48}
              className={darkMode ? "text-[#FF6F61]" : "text-[#003366]"}
            />
          </div>
          <div className="ml-6">
            <h3
              className={`text-2xl font-semibold ${
                darkMode ? "text-white" : "text-[#003366]"
              }`}
            >
              {displayProfile.full_name ||
                `${displayProfile.first_name} ${displayProfile.last_name}`}
            </h3>
            <p className="text-[#FF6F61]">{displayProfile.email}</p>
          </div>
        </div>
        <div className={`p-6 ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
          {editMode ? (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      darkMode ? "text-gray-200" : "text-[#003366]"
                    }`}
                  >
                    First Name
                  </label>
                  <FormInput
                    type="text"
                    name="first_name"
                    value={editedProfile.first_name || ""}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    required
                    darkMode={darkMode}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      darkMode ? "text-gray-200" : "text-[#003366]"
                    }`}
                  >
                    Last Name
                  </label>
                  <FormInput
                    type="text"
                    name="last_name"
                    value={editedProfile.last_name || ""}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    required
                    darkMode={darkMode}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      darkMode ? "text-gray-200" : "text-[#003366]"
                    }`}
                  >
                    Email
                  </label>
                  <FormInput
                    type="email"
                    name="email"
                    value={editedProfile.email || ""}
                    onChange={handleInputChange}
                    placeholder="Email"
                    required
                    darkMode={darkMode}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      darkMode ? "text-gray-200" : "text-[#003366]"
                    }`}
                  >
                    Contact
                  </label>
                  <FormInput
                    type="tel"
                    name="contact_number"
                    value={editedProfile.contact_number || ""}
                    onChange={handleInputChange}
                    placeholder="Contact Number"
                    darkMode={darkMode}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      darkMode ? "text-gray-200" : "text-[#003366]"
                    }`}
                  >
                    Address
                  </label>
                  <FormInput
                    type="text"
                    name="address"
                    value={editedProfile.address || ""}
                    onChange={handleInputChange}
                    placeholder="Address"
                    darkMode={darkMode}
                  />
                </div>
                <SubmitButton
                  isLoading={isLoading}
                  label={isLoading ? "Updating..." : "Save Changes"}
                  className="w-full"
                />
              </div>
              <ErrorDisplay error={error} />  
            </form>
          ) : (
            <div className={`space-y-6 ${darkMode ? "text-gray-300" : ""}`}>
              <InfoItem
                icon={Mail}
                label="Email"
                value={displayProfile.email}
                darkMode={darkMode}
                iconColor={darkMode ? "#FF6F61" : "#003366"}
              />
              <InfoItem
                icon={Phone}
                label="Contact Number"
                value={displayProfile.contact_number || "Not provided"}
                darkMode={darkMode}
                iconColor={darkMode ? "#FF6F61" : "#003366"}
              />
              <InfoItem
                icon={MapPin}
                label="Address"
                value={displayProfile.address || "No Address added"}
                darkMode={darkMode}
                iconColor={darkMode ? "#FF6F61" : "#003366"}
              />
            </div>
          )}
        </div>
      </div>

      {showDeleteDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowDeleteDialog(false)}
          />
          <div
            className={`relative rounded-lg shadow-2xl w-full max-w-md mx-4 transform transition-all ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <button
              onClick={() => setShowDeleteDialog(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>

            <div className="p-6">
              <div className="text-center mb-6">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                  <Trash2 className="h-6 w-6 text-red-600" />
                </div>

                <h3
                  className={`text-2xl font-bold mb-2 ${
                    darkMode ? "text-white" : "text-[#003366]"
                  }`}
                >
                  Delete Account
                </h3>
                <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                  Are you sure you want to delete your account? This action
                  cannot be undone.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowDeleteDialog(false)}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transform transition-all duration-200 ${
                    darkMode
                      ? "bg-gray-700 text-white hover:bg-gray-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={userDeleteLoading}
                  className="flex-1 py-3 px-4 bg-[#FF6F61] text-white rounded-lg font-medium hover:bg-[#ff8578] transform transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#FF6F61] focus:ring-offset-2 disabled:opacity-50"
                >
                  {userDeleteLoading ? "Deleting..." : "Delete Account"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const InfoItem = ({ icon: Icon, label, value, darkMode, iconColor }) => (
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

export default Profile;
