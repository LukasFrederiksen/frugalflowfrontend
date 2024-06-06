import React, {useState} from "react";
import HttpClient from "../../Services/HttpClient";
import {baseUrl} from "../../const";
import {showLoadingToast, updateToast} from "../common/toast";
import DropdownForm from "../common/DropDown";

const AddManufacture = (props) => {
    const [cvr, setCvr] = useState("");
    const [name, setName] = useState("");
    const [contactPerson, setContactPerson] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState("");
    const [picture_logo, setPictureLogo] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const httpClient = new HttpClient(baseUrl);

    const handleImageChange = (e) => {
        const selectedImage = e.target.value;
        setPictureLogo(selectedImage);

        setPreviewImage(selectedImage);
    };

    const handleDropDownContactPerson = (selectedOption) => {
        setContactPerson(selectedOption.value)
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("cvr", cvr);
        formData.append("name", name);
        formData.append("phone", phone);
        formData.append("email", email);
        formData.append("website", website);
        formData.append("contact_person_id", contactPerson);

        if (picture_logo) {
            formData.append("picture_logo", picture_logo);
        }

        var toastId;
        try {
            toastId = showLoadingToast("Creating manufacturer...");
            console.log(formData)
            const response = await httpClient.post(`api/manufactures/`, formData);
            console.log(response);
            if (response && response.data) {
                updateToast(toastId, "Manufacturer created successfully!", "success");
                props.onClose();
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
                    `Error creating manufacturer: ${error.message}`,
                    "error"
                );
            }
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-white/30">
            <div
                className="bg-white w-full sm:w-4/5 md:w-3/5 lg:w-2/5 p-6 md:p-8 lg:p-10 rounded-lg shadow-lg z-50 dark:bg-ff_bg_continer_dark dark:text-white dark:shadow-dark overflow-hidden">
                <div className="max-h-screen overflow-y-auto">
                    <div className="flex justify-between items-center pb-3">
                        <p className="text-2xl font-bold text-gray-700 dark:text-white">
                            Fill In Manufacturer Information
                        </p>
                        <div className="cursor-pointer" onClick={props.onHide}>
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
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="cvr"
                                className="block text-sm font-medium text-gray-700 dark:text-white"
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
                                className="block text-sm font-medium text-gray-700 dark:text-white"
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
                        {/* Contact Person */}
                        <div className="mb-4">
                            <label
                                htmlFor="contact_person"
                                className="mb-1 block text-sm text-left font-medium text-gray-700 dark:text-white"
                            >
                                Contact Person
                            </label>
                            <DropdownForm
                                endpoint="api/contact_persons/"
                                labelKey="email"
                                valueKey="id"
                                initialSelected={contactPerson}
                                onValueChange={handleDropDownContactPerson}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-gray-700 dark:text-white"
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
                                className="block text-sm font-medium text-gray-700 dark:text-white"
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
                                className="block text-sm font-medium text-gray-700 dark:text-white"
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
                                htmlFor="picture_logo"
                                className="block text-sm font-medium text-gray-700 dark:text-white"
                            >
                                Logo
                            </label>
                            <input
                                type="text"
                                name="picture_logo"
                                id="picture_logo"
                                value={picture_logo}
                                className="mt-1 p-2 border rounded w-full text-gray-700"
                                placeholder="Fx - www.Frugal.com/Billede"
                                onChange={handleImageChange}
                            />
                            <div className="mt-2">
                                {previewImage && (
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                                            Choosen Logo
                                        </label>
                                        <img
                                            src={previewImage}
                                            alt="Preview"
                                            style={{width: "100px", height: "auto"}}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="text-center mt-6">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-customYellow text-ff_background_dark font-semibold rounded hover:bg-customYellowDark focus:outline-none focus:ring focus:ring-blue-300"
                            >
                                Submit
                            </button>
                            <button
                                className="bg-customYellow text-ff_background_dark font-semibold px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-blue-300 ml-2"
                                type="button"
                                onClick={props.onClose}
                            >
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddManufacture;
