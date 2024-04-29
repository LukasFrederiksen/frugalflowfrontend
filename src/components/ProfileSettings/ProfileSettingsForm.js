import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../../Services/AuthService";
import { baseUrl } from "../../const";
import placeholderImage from "../../assets/logos/NoImage.png";
import { toast } from "react-toastify";
import { showLoadingToast, updateToast } from "../common/toast";
import HttpClient from "../../Services/HttpClient";

const httpClient = new HttpClient(baseUrl);

export default function ProfileSettingsForm() {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [profileImage, setProfileImage] = useState(null);
  const [newProfileImage, setNewProfileImage] = useState(null);

  const currentUser = getCurrentUser();
  const userId = currentUser ? currentUser.id : null;

  useEffect(() => {
    if (!userId) {
      toast.error("UserId is missing.");
      console.error("UserId is missing.");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await httpClient.get(`api/users/${userId}`);
        const data = response.data;
        setUserName(data.user.username);
        setFirstName(data.user.first_name);
        setLastName(data.user.last_name);
        setEmail(data.user.email);
        setPhone(data.user.phone_number);
        setProfileImage(baseUrl + data.user.profile_picture);
      } catch (error) {
        toast.error("Error fetching user data.");
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Form data to be sent
    const formData = new FormData();
    formData.append("username", userName);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("phone_number", phone);

    if (newProfileImage) {
      formData.append("profile_picture", newProfileImage);
    }
    var toastId;
    try {
      toastId = showLoadingToast("Updating profile...");
      const response = await httpClient.put(`api/users/${userId}`, formData);
      if (!response.ok && response.data.user) {
        updateToast(toastId, "Profile updated successfully!", "success");
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } else {
        updateToast(
          toastId,
          `Error updating profile: ${response.error}`,
          "error"
        );
        console.error("Error updating profile:", response.error);
      }
    } catch (error) {
      updateToast(toastId, `Error updating profile: ${error}`, "error");
      console.error("Error updating profile:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
      setNewProfileImage(file);
    }
  };

  return (
    <div className="w-full p-6 bg-white rounded-md shadow-lg dark:bg-ff_bg_continer_dark dark:text-white dark:shadow-dark">
      <h2 className="text-2xl font-bold mb-5 text-gray-700 dark:text-white">
        Update Profile
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-wrap -mx-3">
        <div className="w-full md:w-1/2 px-3 mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium ff-text mb-2">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full ff-input"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium ff-text mb-2">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full ff-input"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium ff-text mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full ff-input"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium ff-text mb-2">
              Phone
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full ff-input"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 px-3 mb-6 md:border-l border-gray-200 pl-6">
          <div className="mb-4">
            <label className="block text-sm font-medium ff-text mb-2">
              Profile Picture
            </label>
            <img
              src={profileImage || placeholderImage}
              alt="Profile Preview"
              className="mb-2 w-32 h-32 rounded-md object-cover"
            />
          </div>

          <div className="relative inline-block">
            <input
              type="file"
              id="file-input"
              onChange={handleImageChange}
              className="absolute opacity-0 w-full h-full top-0 left-0 cursor-pointer"
            />
            <label
              htmlFor="file-input"
              className="p-2 border rounded-md cursor-pointer bg-blue-500 text-white hover:bg-blue-600"
            >
              Change profile picture
            </label>
          </div>
        </div>

        <div className="w-full mt-6">
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
