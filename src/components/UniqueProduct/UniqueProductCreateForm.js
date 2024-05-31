import React, {useEffect, useState} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import HttpClient from "../../Services/HttpClient";
import {baseUrl} from "../../const";
import IconAndText from "../common/IconAndText";
import {BsInfoSquareFill} from "react-icons/bs";
import {BsPeopleFill} from "react-icons/bs";

import DropdownForm from "../Case/DropDown";
import {showLoadingToast, updateToast} from "../common/toast";

const httpClient = new HttpClient(baseUrl);

const UniqueProductCreateForm = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [formData, setFormData] = useState({
        product_type: "",
        serial_number: "",
        vessel: "",
        status_shipping: "",
        status_payment: "",
        custom_price: ""
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleProductTypeChange = (selectedOption) => {
        handleDropDown(selectedOption, 'product_type')
    };

    const handleVesselChange = (selectedOption) => {
        handleDropDown(selectedOption, 'vessel')
    };
    const handleStatusShippingChange = (selectedOption) => {
        handleDropDown(selectedOption, 'status_shipping')
    };
    const handleStatusPaymentChange = (selectedOption) => {
        handleDropDown(selectedOption, 'status_payment')
    };
    const handleDropDown = (selectedOption, type) => {
        setFormData((prevState) => ({
            ...prevState,
            [type]: selectedOption.value,
        }));
    };

    const validateForm = () => {
        const Errors = {};

        if (!formData.product_type) {
            Errors.product_type = "Select a product type";
        }

        if (!formData.serial_number.trim()) {
            Errors.serial_number = "Serial number required"
        }

        if (!formData.vessel) {
            Errors.vessel = "Select a vessel";
        }

        if (!formData.status_shipping) {
            Errors.status_shipping = "Select a shipping status";
        }

        if (!formData.status_payment) {
            Errors.status_payment = "Select a payment status";
        }

        if (formData.custom_price <= 0 || isNaN(formData.custom_price)) {
            Errors.custom_price = "Custom price must be a positive number";
        }

        return Errors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        console.log("Form data submitted:", formData);

        let toastId;
        try {
            toastId = showLoadingToast("Creating unique product...");
            const response = await httpClient.post("api/unique_products/", formData);
            if (response.status === 201) {
                updateToast(toastId, "Unique product created successfully!", "success");
                navigate(
                    location?.state?.previousUrl ? location.state.previousUrl : "/unique_products"
                );
            } else {
                updateToast(toastId, `Error creating unique product: ${response.error}`, "error");
            }
        } catch (error) {
            updateToast(toastId, `Error creating unique product: ${error}`, "error");
        }
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    return (
        <div className="w-full bg-white rounded-md dark:bg-ff_bg_continer_dark dark:text-white p-4">
            <form onSubmit={handleSubmit}>
                <div className="flex flex wrap">
                    {/* Left coloumn*/}
                    <div className="w-full md:w-1/2 px-3 md:mb-6 md:pr-10">
                        <IconAndText icon={BsInfoSquareFill} text="1"/>

                        {/* Product */}
                        <div className="py-2">
                            <label
                                htmlFor="product-type"
                                className="flex justify-between items-center mb-2 text-sm font-medium ff-text"
                            >
                                Product Type
                                {errors.product_type && (
                                    <p className="text-red-500 text-xs ml-auto">
                                        {errors.product_type}</p>
                                )}
                            </label>
                            <DropdownForm
                                endpoint="api/products/?show_all=true"
                                labelKey="name"
                                valueKey="id"
                                initialSelected=""
                                useNone={false}
                                onValueChange={handleProductTypeChange}
                            />
                        </div>

                        {/* Serial number*/}
                        <div className="py-2">
                            <label
                                htmlFor="serial_number"
                                className="flex justify-between items-center mb-2 text-sm font-medium ff-text"
                            >
                                Serial number
                                {errors.serial_number && (
                                    <p className="text-red-500 text-xs ml-auto">
                                        {errors.serial_number}
                                    </p>
                                )}
                            </label>
                            <input
                                type="text"
                                id="serial_number"
                                name="serial_number"
                                value={formData.serial_number}
                                onChange={handleInputChange}
                                className="ff-input w-full"
                                placeholder="Serial number"
                            >
                            </input>
                        </div>
                        {/* Vessel */}
                        <div className="py-2">
                            <label
                                htmlFor="Vessel"
                                className="flex justify-between items-center mb-2 text-sm font-medium ff-text"
                            >
                                Vessel
                                {errors.vessel && (
                                    <p className="text-red-500 text-xs ml-auto">
                                        {errors.vessel}</p>
                                )}
                            </label>
                            <DropdownForm
                                endpoint="api/vessels/?show_all=true"
                                labelKey="name"
                                valueKey="id"
                                initialSelected=""
                                useNone={true}
                                onValueChange={handleVesselChange}
                            />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div
                        className="w-full md:w-1/2 px-3 mb-6 md:border-l border-gray-200 dark:border-ff_background_dark md:pl-10">
                        <IconAndText icon={BsPeopleFill} text="2"/>

                        {/* Status Shipping */}
                        <div className="py-2">
                            <label
                                htmlFor="status_shipping"
                                className="flex justify-between items-center mb-2 text-sm font-medium ff-text"
                            >
                                Status Shipping
                                {errors.status_shipping && (
                                    <p className="text-red-500 text-xs ml-auto">
                                        {errors.status_shipping}
                                    </p>
                                )}
                            </label>
                            <DropdownForm
                                endpoint="api/manufactures?show_all=true"
                                labelKey="name"
                                valueKey="id"
                                initialSelected=""
                                onValueChange={handleStatusShippingChange}
                            />
                            {/* Status Payment */}
                            <div className="py-2">
                                <label
                                    htmlFor="status_payment"
                                    className="flex justify-between items-center mb-2 text-sm font-medium ff-text"
                                >
                                    Status Payment
                                    {errors.status_payment && (
                                        <p className="text-red-500 text-xs ml-auto">
                                            {errors.status_payment}
                                        </p>
                                    )}
                                </label>
                                <DropdownForm
                                    endpoint="api/manufactures?show_all=true"
                                    labelKey="name"
                                    valueKey="id"
                                    initialSelected=""
                                    onValueChange={handleStatusPaymentChange}
                                />
                            </div>
                            {/* Custom price */}
                            <div className="py-2">
                                <label
                                    className="flex justify-between items-center mb-2 text-sm font-medium ff-text">
                                    Custom price
                                    {errors.custom_price && (
                                        <p className="text-red-500 text-xs ml-auto">
                                            {errors.custom_price}
                                        </p>
                                    )}
                                </label>
                                <input
                                    type="number"
                                    id="custom_price"
                                    name="custom_price"
                                    value={formData.custom_price}
                                    onChange={handleInputChange}
                                    className="ff-input w-full"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>
                    </div>

                </div>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-4"
                >
                    Create new product
                </button>
            </form>
        </div>
    )

};

export default UniqueProductCreateForm;

