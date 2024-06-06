import React, {useEffect, useState} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import HttpClient from "../../Services/HttpClient";
import {baseUrl} from "../../const";
import IconAndText from "../common/IconAndText";
import {BsInfoSquareFill} from "react-icons/bs";
import {BsPeopleFill} from "react-icons/bs";

import DropdownForm from "../common/DropDown";
import {showLoadingToast, updateToast} from "../common/toast";

const httpClient = new HttpClient(baseUrl);

const UniqueProductCreateForm = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [formData, setFormData] = useState({
        product_id: "",
        serial_number: "",
        case_id: "",
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
        handleDropDown(selectedOption, 'product_id')
    };

    const handleCaseChange = (selectedOption) => {
        handleDropDown(selectedOption, 'case_id')
    };
    const handleDropDown = (selectedOption, type) => {
        setFormData((prevState) => ({
            ...prevState,
            [type]: selectedOption.value,
        }));
    };

    const validateForm = () => {
        const Errors = {};

        if (!formData.product_id) {
            Errors.product_id = "Select a product type";
        }

        if (!formData.serial_number.trim()) {
            Errors.serial_number = "Serial number required"
        }

        if (!formData.case_id) {
            Errors.case_id = "Select a case";
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
                    location?.state?.previousUrl ? location.state.previousUrl : "/unique-products"
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
                                {errors.product_id && (
                                    <p className="text-red-500 text-xs ml-auto">
                                        {errors.product_id}</p>
                                )}
                            </label>
                            <DropdownForm
                                endpoint="api/products/is_unique/1"
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
                        {/* Case */}
                        <div className="py-2">
                            <label
                                htmlFor="case_id"
                                className="flex justify-between items-center mb-2 text-sm font-medium ff-text"
                            >
                                Case
                                {errors.case_id && (
                                    <p className="text-red-500 text-xs ml-auto">
                                        {errors.case_id}</p>
                                )}
                            </label>
                            <DropdownForm
                                endpoint="api/cases/"
                                labelKey="title"
                                valueKey="id"
                                initialSelected=""
                                useNone={true}
                                onValueChange={handleCaseChange}
                            />

                        </div>
                    </div>

                    {/* Right Column */}
                    <div
                        className="w-full md:w-1/2 px-3 mb-6 md:border-l border-gray-200 dark:border-ff_background_dark md:pl-10">
                        <IconAndText icon={BsPeopleFill} text="2"/>

                        {/* Status Shipping */}

                        <label className="flex justify-between items-center mb-2 text-sm font-medium ff-text">
                            Status Shipping
                            {errors.status_shipping && (
                                <p className="text-red-500 text-xs ml-auto">
                                    {errors.status_shipping}
                                </p>
                            )}
                        </label>
                        <select
                            id="status_shipping"
                            name="status_shipping"
                            value={formData.status_shipping}
                            onChange={handleInputChange}
                            className="ff-input w-full"
                        >
                            <option value="">Select a status</option>
                            <option value="Arrived">Arrived</option>
                            <option value="Shipping">Shipping</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Not Sent">Not Sent</option>
                        </select>
                        {/* Status Payment */}
                        <label className="flex justify-between items-center mb-2 text-sm font-medium ff-text">
                            Status Shipping
                            {errors.status_payment && (
                                <p className="text-red-500 text-xs ml-auto">
                                    {errors.status_payment}
                                </p>
                            )}
                        </label>
                        <select
                            id="status_payment"
                            name="status_payment"
                            value={formData.status_payment}
                            onChange={handleInputChange}
                            className="ff-input w-full"
                        >
                            <option value="">Select a status</option>
                            <option value="Paid">Paid</option>
                            <option value="Awaiting Payment">Awaiting Payment</option>
                            <option value="Invoice Sent">Invoice Sent</option>
                            <option value="Invoice Not Created">Invoice Not Created</option>
                        </select>
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

