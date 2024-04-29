import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { showLoadingToast, updateToast } from "../common/toast";
import HttpClient from "../../Services/HttpClient";
import { baseUrl } from "../../const";
import { BsFillTrash3Fill } from "react-icons/bs";

const httpClient = new HttpClient(baseUrl);

export default function EditManufacture({ id, onClose }) {
  console.log("id er ---->" + id);
  const [cvr, setCvr] = useState("");
  const [name, setName] = useState("");
  const [contactperson, setContactperson] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [isdeleted, setIsInactive] = useState(null);
  const [picture_logo, setPictureLogo] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const toggleIsInactive = () => {
    setIsInactive(isdeleted === "true" ? "false" : "true");
  };

  useEffect(() => {
    if (!id) {
      toast.error("ManufactureId is missing.");
      console.error("ManufactureId is missing.");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await httpClient.get(`api/manufactures/${id}`);
        const data = response.data.manufacture;
        setCvr(data.cvr);
        setName(data.name);
        setContactperson(data.contactperson);
        setPhone(data.phone);
        setEmail(data.email);
        setWebsite(data.website);
        setIsInactive(
          data.isdeleted || data.isdeleted === "true" ? "true" : "false"
        );
        setPictureLogo(data.picture_logo);
        setPreviewImage(data.picture_logo);
      } catch (error) {
        toast.error("Error fetching manufacturer data.");
        console.error("Error fetching manufacturer data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("cvr", cvr);
    formData.append("name", name);
    formData.append("contactperson", contactperson);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("website", website);
    formData.append("isdeleted", isdeleted);

    if (picture_logo) {
      formData.append("picture_logo", picture_logo);
    }

    var toastId;
    try {
      toastId = showLoadingToast("Updating manufacturer...");
      const response = await httpClient.put(
        `api/manufactures/${id}/`,
        formData
      );
      console.log(response);
      if (response.data && response.data) {
        updateToast(toastId, "Manufacturer updated successfully!", "success");
        onClose();
        setTimeout(() => {
          window.location.reload();
        }, 4500);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        updateToast(toastId, error.response.data.error, "error");
      } else {
        updateToast(
          toastId,
          `Error editing manufacturer: ${error.message}`,
          "error"
        );
      }
    }

    if (!validateForm()) {
      return;
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this manufacturer?"
    );
    if (confirmed) {
      var toastId;
      try {
        toastId = showLoadingToast("Deleting manufacture...");

        const response = await httpClient.delete(`api/manufactures/${id}`);

        if (response.status === 204) {
          updateToast(toastId, "Manufacturer deleted successfully!", "success");
          onClose();
          setTimeout(() => {
            window.location.reload();
          }, 4500);
        }
      } catch (error) {
        updateToast(toastId, "Error deleting manufacturer.", "error");
        console.error("Error deleting manufacturer:", error);
      }
    }
  };

  const validateForm = () => {
    if (!cvr) {
      toast.error("Cvr is required.");
      return;
    }
    if (!name) {
      toast.error("Name is required.");
      return;
    }
    if (!contactperson) {
      toast.error("Contactperson is required.");
      return;
    }
    if (!phone) {
      toast.error("Phone is required.");
      return;
    }
    if (!email) {
      toast.error("Email is required.");
      return;
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.value;
  
    setPictureLogo(selectedImage);
  
    const isValidUrl =
      selectedImage.startsWith("http") || selectedImage.startsWith("https");
  
    setPreviewImage(isValidUrl ? selectedImage : null);
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-white/30">
      <div className="bg-white w-full sm:w-4/5 md:w-3/5 lg:w-2/5 p-6 md:p-8 lg:p-10 rounded-lg shadow-lg z-50 dark:bg-ff_bg_continer_dark dark:text-white dark:shadow-dark overflow-hidden">
        <div className="max-h-screen overflow-y-auto">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold text-gray-700 dark:text-white">
              Edit Manufacturer Information
            </p>
            <div className="cursor-pointer">
              <svg
                className="fill-current text-gray-500 w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M18 6L6 18M6 6l12 12"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <form>
            <div className="mb-4">
              <label
                htmlFor="cvr"
                className="block text-sm text-left font-medium text-gray-700 dark:text-white"
              >
                Cvr
              </label>
              <input
                type="text"
                name="cvr"
                id="cvr"
                required
                value={cvr}
                onChange={(e) => setCvr(e.target.value)}
                className="mt-1 p-2 border rounded w-full text-gray-700"
                placeholder="Fx - 12345678"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm text-left font-medium text-gray-700 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 p-2 border rounded w-full text-gray-700"
                placeholder="Fx - Vessel Technology"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="contactperson"
                className="block text-sm text-left font-medium text-gray-700 dark:text-white"
              >
                Contactperson
              </label>
              <input
                type="text"
                name="contactperson"
                id="contactperson"
                required
                value={contactperson}
                onChange={(e) => setContactperson(e.target.value)}
                className="mt-1 p-2 border rounded w-full text-gray-700"
                placeholder="Fx - Hans Hansen"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm text-left font-medium text-gray-700 dark:text-white"
              >
                Phone
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 p-2 border rounded w-full text-gray-700"
                placeholder="Fx - 20202020"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm text-left font-medium text-gray-700 dark:text-white"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 border rounded w-full text-gray-700"
                placeholder="Fx - Mail@mail.com"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="website"
                className="block text-sm text-left font-medium text-gray-700 dark:text-white"
              >
                Website
              </label>
              <input
                type="text"
                name="website"
                id="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="mt-1 p-2 border rounded w-full text-gray-700"
                placeholder="Fx - www.Frugal.com"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="isdeleted"
                className="block text-sm text-left font-medium text-gray-700 dark:text-white"
              >
                Status
              </label>
            </div>
            <div className="flex flex-col">
              <div className="mb-4">
                <button
                  type="button"
                  className={`float-left p-2 border rounded max-w-xs text-gray-700 ${
                    isdeleted === "false"
                      ? "bg-green-500 text-ff_background_dark font-semibold"
                      : "bg-red-500 text-ff_background_dark font-semibold"
                  }`}
                  onClick={toggleIsInactive}
                >
                  {isdeleted === "true" ? "InActive" : "Active"}
                </button>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="picture_logo"
                  className="block text-sm text-left font-medium text-gray-700 dark:text-white"
                >
                  Logo
                </label>
                <input
                  type="text"
                  name="picture_logo"
                  id="picture_logo"
                  value={picture_logo}
                  className="mt-1 p-2 border rounded w-full text-gray-700 mb-2"
                  placeholder="Fx - www.Frugal.com/Billede"
                  onChange={handleImageChange}
                />
                <div className="mt-2">
                  {previewImage && (
                    <div className="mb-4">
                      <label className="block text-sm text-left font-medium text-gray-700 dark:text-white mb-2">
                        Choosen Logo
                      </label>
                      <img
                        src={previewImage}
                        alt="Preview"
                        style={{ width: "100px", height: "auto" }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="text-center mt-6">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-customYellow text-ff_background_dark font-semibold rounded hover:bg-customYellowDark focus:outline-none focus:ring focus:ring-blue-300"
                >
                  Save
                </button>
                <button
                  className="bg-customYellow text-ff_background_dark font-semibold px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-blue-300 ml-2 relative"
                  type="button"
                  onClick={handleDelete}
                >
                  <BsFillTrash3Fill className="w-4 h-4 inline mr-2" />
                  Delete
                </button>

                <button
                  className="bg-customYellow text-ff_background_dark font-semibold px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-blue-300 ml-2"
                  type="button"
                  onClick={() => {
                    onClose();
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
