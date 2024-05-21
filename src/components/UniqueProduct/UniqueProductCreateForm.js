import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HttpClient from "../../Services/HttpClient";
import { baseUrl } from "../../const";
import IconAndText from "../common/IconAndText";
import { BsInfoSquareFill } from "react-icons/bs"; 
import { BsPeopleFill } from "react-icons/bs"; 

import DropdownForm from "../Case/DropDown";
import { showLoadingToast, updateToast } from "../common/toast";

const httpClient = new HttpClient(baseUrl);

const UniqueProductCreateForm = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [formData, setFormData] = useState({
        name: "",
        serial_number: "",
        sku: "",
        qty: "",
        description: "",
        manufacturer: "",
        cost_price: "",
        retail_price: "",
    });

    const [errors, setErrors] =useState({});

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handDropDownManufacturer= (selectedOption) => {
        setFormData((prevState) => ({
            ...prevState,
            manufacturer: selectedOption.value,
        }));
    };

    const validateForm = () => {
        const Errors = {};

        if (!formData.name.trim()) {
            Errors.name = "Name is required"
        }

        if (!formData.serial_number.trim()) {
            Errors.serial_number = "Serial number required"
        }

        if (formData.description.length > 500) {
            // Max length 500
            Errors.description = "Description is too long"
        }

        if (!formData.sku.trim()) {
            Errors.sku = "SKU required"
        }

        if (!formData.qty.trim()) {
            Errors.qty = "quantity is required"
        }

        if (!formData.manufacturer) {
            Errors.manufacturer = "Select a manufacturer";
        }

        if (formData.cost_price <= 0 || isNaN(formData.cost_price)) {
            Errors.cost_price = "Cost price must be a positive number";
        }

        if (formData.retail_price <= 0 || isNaN(formData.retail_price)) {
            Errors.retail_price = "Retail price must be a positive number";
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
          toastId = showLoadingToast("Creating product...");
          const response = await httpClient.post("api/products/", formData);
          if (response.status === 201) {
            updateToast(toastId, "Product created successfully!", "success");
            navigate(
              location?.state?.prevoiusUrl ? location.state.prevoiusUrl : "/products"
            );
          } else {
            updateToast(toastId, `Error creating product: ${response.error}`, "error");
          }
        } catch (error) {
          updateToast(toastId, `Error creating product: ${error}`, "error");
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
            <IconAndText icon={BsInfoSquareFill} text="1" />

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
                    placeholder="Product name"
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

            {/* Description */}
            <div className="py-2">
                <label
                htmlFor="description"
                className="flex justify-between items-center mb-2 text-sm font-medium ff-text"
                >
                Description
                {errors.description && (
                    <p className="text-red-500 text-xs ml-auto">
                        {errors.description}
                    </p>
                )}
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="ff-input w-full"
                    placeholder="Product description"
                    rows={10}
                ></textarea>
            </div>
            </div>

                      {/* Right Column */}
          <div className="w-full md:w-1/2 px-3 mb-6 md:border-l border-gray-200 dark:border-ff_background_dark md:pl-10">
            <IconAndText icon={BsPeopleFill} text="2" />

            {/* SKU */}
            <div className="py-2">
                <label
                htmlFor="sku"
                className="flex justify-between items-center mb-2 text-sm font-medium ff-text"
                >
                    SKU
                    {errors.sku && (
                        <p className="text-red-500 text-xs ml-auto">
                        {errors.sku}</p>
                    )}
                </label>
                <input
                    type="text"
                    id="sku"
                    name="sku"
                    value={formData.sku}
                    onChange={handleInputChange}
                    className="ff-input w-full"
                    placeholder="Product SKU"
                />
            </div>

              {/* Quantity */}
            <div className="py-2">
                <label
                htmlFor="Quantity"
                className="flex justify-between items-center mb-2 text-sm font-medium ff-text"
                >
                    Quantity
                    {errors.qty && (
                        <p className="text-red-500 text-xs ml-auto">
                        {errors.qty}</p>
                    )}
                </label>
                <input
                    type="text"
                    id="qty"
                    name="qty"
                    value={formData.qty}
                    onChange={handleInputChange}
                    className="ff-input w-full"
                    placeholder="Product quantity"
                />
            </div>

            {/* Manufacturer */}
            <div className="py-2">
                <label
                htmlFor="Manufacturer"
                className="flex justify-between items-center mb-2 text-sm font-medium ff-text"
                >
                    Manufacturer
                    {errors.manufacturer && (
                        <p className="text-red-500 text-xs ml-auto">
                            {errors.manufacturer}
                        </p>
                    )}
                </label>
                <DropdownForm
                    endpoint="api/manufactures?show_all=true"
                    labelKey="name"
                    valueKey="id"
                    initialSelected=""
                    onValueChange={handDropDownManufacturer}
                />
            </div>
                {/* Cost price */}
                <div className="py-2">
              <label className="flex justify-between items-center mb-2 text-sm font-medium ff-text">
                Cost price
                {errors.cost_price && (
                    <p className="text-red-500 text-xs ml-auto">
                        {errors.cost_price}
                    </p>
                )}
                    </label>
                    <input
                        type="number"
                        id="cost_price"
                        name="cost_price"
                        value={formData.cost_price}
                        onChange={handleInputChange}
                        className="ff-input w-full"
                        placeholder="0.00"
                        />
                </div>
                {/* Retail price */}
                <div className="py-2">
              <label className="flex justify-between items-center mb-2 text-sm font-medium ff-text"/>
                    Retail price
                    {errors.retail_price && (
                        <p className="text-red-500 text-xs ml-auto">
                            {errors.retail_price}
                        </p>
                    )}
                <label/>
                <input
                    type="number"
                    id="retail_price"
                    name="retail_price"
                    value={formData.retail_price}
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

