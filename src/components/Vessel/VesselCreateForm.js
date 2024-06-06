import React, {useState} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import HttpClient from "../../Services/HttpClient";
import {baseUrl} from "../../const";
import IconAndText from "../common/IconAndText";
import {BsInfoSquareFill} from "react-icons/bs";
import {updateToast, showSuccessToast} from "../common/toast";
import DropdownForm from "../common/DropDown";

const httpClient = new HttpClient(baseUrl);

const VesselCreateForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        name: "",
        imo: 0,
        type: "",
        customer_id: "",
    });

    const [errors, setErrors] = useState({});

    const handleDropDownVesselOwner= (selectedOption) => {
        setFormData((prevState) => ({
            ...prevState,
            customer_id: selectedOption.value,
        }));
    };

    const handleInputChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const validateForm = () => {
        const Errors = {};
        if (!formData.name.trim()) {
            Errors.name = "Name is required"
        }

        if (formData.imo <= 0 || isNaN(formData.imo)) {
            Errors.imo = "Imo is required"
        }

        if (!formData.type.trim()) {
            Errors.type = "Type is required"
        }

        if (!formData.customer_id) {
            Errors.customer_id = "Vessel owner is required"
        }

        return Errors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        let toastId;
        try {
            const response = await httpClient.post("api/vessels/", formData);
            if (response.status === 201) {
                showSuccessToast("Vessel " + formData.name + " created!");
                navigate(
                    location?.state?.prevoiusUrl ? location.state.prevoiusUrl : "/vessels"
                );
            } else {
                updateToast(toastId, `Error creating vessel: ${response.error}`, "error");
            }
        } catch (error) {
            updateToast(toastId, `Error creating vessel: ${error}`, "error");
        }
    };

    return (
        <div className="w-full bg-white rounded-md dark:bg-ff_bg_continer_dark dark:text-white p-4">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap">
                    {/* Left coloumn */}
                    <div className="w-full md:w-1/2 px-3 md:mb-6 md:pr-10">
                        <IconAndText icon={BsInfoSquareFill} text="General information"/>
                        {/* Name */}
                        <div className="py-2">
                            <label
                                htmlFor="name"
                                className="flex justify-between items-center mb-2 text-sm font-medium ff-text"
                            >
                                Name
                                {errors.name && (
                                    <p className="text-red-500 text-xs ml-auto">
                                        {errors.name}</p>
                                )}
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="ff-input w-full"
                                placeholder="Vessel name"
                            />
                        </div>
                        {/* Imo */}
                        <div className="py-2">
                            <label
                                htmlFor="imo"
                                className="flex justify-between items-center mb-2 text-sm font-medium ff-text"
                            >
                                Imo
                                {errors.imo && (
                                    <p className="text-red-500 text-xs ml-auto">
                                        {errors.imo}</p>
                                )}
                            </label>
                            <input
                                type="number"
                                id="imo"
                                name="imo"
                                value={formData.imo}
                                onChange={handleInputChange}
                                className="ff-input w-full"
                                placeholder="Vessel imo"
                            />
                        </div>
                        {/* Vessel Owner */}
                        <div className="mb-4">
                            <label
                                htmlFor="customer_id"
                                className="mb-1 block text-sm text-left font-medium text-gray-700 dark:text-white"
                            >
                                Vessel Owner
                            </label>
                            <DropdownForm
                                endpoint="api/customers"
                                labelKey="name"
                                valueKey="id"
                                initialSelected={formData.customer_id}
                                onValueChange={handleDropDownVesselOwner}
                            />
                        </div>
                        {/* Type */}
                        <div className="py-2">
                            <label
                                htmlFor="type"
                                className="flex justify-between items-center mb-2 text-sm font-medium ff-text"
                            >
                                Type
                                {errors.type && (
                                    <p className="text-red-500 text-xs ml-auto">
                                        {errors.type}</p>
                                )}
                            </label>
                            <select
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleInputChange}
                                className="ff-input w-full"
                            >
                                <option value="">Select type</option>
                                <option value="Container Ship">Container ship</option>
                                <option value="Tanker Ship">Tanker ship</option>
                                <option value="Passenger Ship">Passenger ship</option>
                                <option value="War Ship">War ship</option>
                                <option value="Unspecified">Unspecified</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="mt-8 px-4 py-2 rounded-md bg-customYellow text-ff_background_dark font-semibold hover:bg-customYellowDark h-[40px]"
                        >
                            Create new vessel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default VesselCreateForm;