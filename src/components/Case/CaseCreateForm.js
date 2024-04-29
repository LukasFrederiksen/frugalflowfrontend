import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DropdownForm from "./DropDown";
import DropdownFormMulti from "./MultiSelectDropdown";
import { BsInfoSquareFill } from "react-icons/bs"; // info icon
import { BsCalendarCheckFill } from "react-icons/bs"; // status icon
import { BsPeopleFill } from "react-icons/bs"; // people icon
import { baseUrl } from "../../const";
import HttpClient from "../../Services/HttpClient";
import { showLoadingToast, updateToast } from "../common/toast";
import InfoComponent from "./InfoComponent";
import IconAndText from "../common/IconAndText";

const httpClient = new HttpClient(baseUrl);

const CaseCreateForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    customer: "",
    total_price: "",
    deadline: "",
    product_owner: "",
    vessel: "",
    followers: [],
    case_status: "",
    payment_status: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDropdownProductOwner = (selectedOption) => {
    setFormData((prevState) => ({
      ...prevState,
      product_owner: selectedOption.value,
    }));
  };

  const handleDropdownVessel = (selectedOption) => {
    setFormData((prevState) => ({
      ...prevState,
      vessel: selectedOption.value,
    }));
  };

  const handleDropdownCustomer = (selectedOption) => {
    setFormData((prevState) => ({
      ...prevState,
      customer: selectedOption.value,
    }));
  };

  const handleDropdownFollowers = (selectedOptions) => {
    const followers = selectedOptions.map((option) => option.value);
    setFormData((prevState) => ({
      ...prevState,
      followers: followers,
    }));
  };

  const validateForm = () => {
    const Errors = {};

    if (!formData.title.trim()) {
      Errors.title = "Title is required.";
    }

    if (formData.description.length > 500) {
      // assuming a max length of 500
      Errors.description = "Description is too long.";
    }

    if (formData.total_price <= 0 || isNaN(formData.total_price)) {
      Errors.total_price = "Total price must be a positive number.";
    }

    const today = new Date();
    const deadline = new Date(formData.deadline);
    if (isNaN(deadline) || deadline < today) {
      Errors.deadline = "Select a valid date in the future.";
    }

    if (!formData.case_status) {
      Errors.case_status = "Select a case status.";
    }

    if (!formData.payment_status) {
      Errors.payment_status = "Select a payment status.";
    }

    if (!formData.vessel) {
      Errors.vessel = "Select a vessel.";
    }

    if (!formData.customer) {
      Errors.customer = "Select a customer.";
    }

    if (!formData.product_owner) {
      Errors.product_owner = "Select a product owner.";
    }

    if (formData.followers.length > 10) {
      Errors.followers = "Select up to 10 followers.";
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
      toastId = showLoadingToast("Creating case...");
      const response = await httpClient.post("api/cases/", formData);
      console.log("response -->" + response);
      console.log("response.ok -->" + response.ok);
      if (response.status === 201) {
        updateToast(toastId, "Case created successfully!", "success");
        console.log("Case created successfully!");
        navigate(
          location?.state?.prevoiusUrl ? location.state.prevoiusUrl : "/cases"
        );
      } else {
        updateToast(toastId, `Error creating case${response.error}`, "error");
        console.error("Error creating case:", response.error);
      }
    } catch (error) {
      updateToast(toastId, `Error creating case: ${error}`, "error");
      console.error("Error creating case:", error);
    }
  };

  useEffect(() => {}, [formData]);

  return (
    <div className="w-full bg-white rounded-md dark:bg-ff_bg_continer_dark dark:text-white p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap">
          {/* Left Column */}
          <div className="w-full md:w-1/2 px-3 md:mb-6 md:pr-10">
            <IconAndText icon={BsInfoSquareFill} text="General" />
            {/* Title */}
            <div className="py-2">
              <label
                htmlFor="title"
                className="flex justify-between items-center mb-2 text-sm font-medium ff-text"
              >
                Title
                {errors.title && (
                  <p className="text-red-500 text-xs ml-auto">{errors.title}</p>
                )}
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="ff-input w-full"
                placeholder="Case Title"
              />
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
                placeholder="Case Description"
                rows={10}
              ></textarea>
            </div>
            {/* Vessel */}
            <div className="py-2">
              <label
                htmlFor="vessel"
                className="flex justify-between items-center mb-2 text-sm font-medium ff-text"
              >
                Vessel
                {errors.vessel && (
                  <p className="text-red-500 text-xs ml-auto">
                    {errors.vessel}
                  </p>
                )}
              </label>
              <DropdownForm
                endpoint="api/vessels?show_all=true"
                labelKey="name"
                valueKey="id"
                initialSelected=""
                onValueChange={handleDropdownVessel}
              />
            </div>
            {/* Customer */}
            <div className="py-2">
              <label className="flex justify-between items-center mb-2 text-sm font-medium ff-text">
                Customer
                {errors.customer && (
                  <p className="text-red-500 text-xs ml-auto">
                    {errors.customer}
                  </p>
                )}
              </label>
              <DropdownForm
                endpoint="api/customers?show_all=true"
                labelKey="name"
                valueKey="id"
                initialSelected=""
                onValueChange={handleDropdownCustomer}
              />
            </div>
            {/* Total Price */}
            <div className="py-2">
              <label className="flex justify-between items-center mb-2 text-sm font-medium ff-text">
                Total Price
                {errors.total_price && (
                  <p className="text-red-500 text-xs ml-auto">
                    {errors.total_price}
                  </p>
                )}
              </label>
              <input
                type="number"
                id="total_price"
                name="total_price"
                value={formData.total_price}
                onChange={handleInputChange}
                className="ff-input w-full"
                placeholder="0.00"
              />
            </div>
            {/* Deadline */}
            <div className="py-2">
              <label className="flex justify-between items-center mb-2 text-sm font-medium ff-text">
                Deadline
                {errors.deadline && (
                  <p className="text-red-500 text-xs ml-auto">
                    {errors.deadline}
                  </p>
                )}
              </label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
                className="ff-input w-full"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full md:w-1/2 px-3 mb-6 md:border-l border-gray-200 dark:border-ff_background_dark md:pl-10">
            <IconAndText icon={BsPeopleFill} text="Stakeholders" />
            {/* Product owner */}
            <div className="py-2">
              <label className="flex justify-between items-center mb-2 text-sm font-medium ff-text">
                Product Owner
                {errors.product_owner && (
                  <p className="text-red-500 text-xs ml-auto">
                    {errors.product_owner}
                  </p>
                )}
              </label>
              <DropdownForm
                endpoint="api/users?show_all=true"
                labelKey="first_name"
                valueKey="id"
                initialSelected=""
                onValueChange={handleDropdownProductOwner}
              />
            </div>
            {/* Followers */}
            <div className="py-2">
              <label className="flex justify-between items-center mb-2 text-sm font-medium ff-text">
                Employees to follow updates:
              </label>
              <DropdownFormMulti
                endpoint="api/users?show_all=true"
                labelKey="first_name"
                valueKey="id"
                initialSelected={[]}
                onValueChange={handleDropdownFollowers}
              />
            </div>
            <IconAndText icon={BsCalendarCheckFill} text="Status" />
            {/* Case Status */}
            <div className="py-2">
              <label className="flex justify-between items-center mb-2 text-sm font-medium ff-text">
                Case Status
                {errors.case_status && (
                  <p className="text-red-500 text-xs ml-auto">
                    {errors.case_status}
                  </p>
                )}
              </label>
              <select
                id="case_status"
                name="case_status"
                value={formData.case_status}
                onChange={handleInputChange}
                className="ff-input w-full"
              >
                <option value="">Select a status</option>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="setup">Setup in Progress</option>
                <option value="closed">Closed</option>
                <option value="cancelled">Cancelled</option>
                <option value="on_hold">On Hold</option>
                <option value="done">Done</option>
              </select>
            </div>
            {/* Payment Status */}
            <div className="py-2">
              <label className="flex justify-between items-center mb-2 text-sm font-medium ff-text">
                Payment Status
                {errors.payment_status && (
                  <p className="text-red-500 text-xs ml-auto">
                    {errors.payment_status}
                  </p>
                )}
              </label>
              <select
                id="payment_status"
                name="payment_status"
                value={formData.payment_status}
                onChange={handleInputChange}
                className="ff-input w-full"
              >
                <option value="">Select a payment status</option>
                <option value="unpaid">Unpaid</option>
                <option value="partial">Partially Paid</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
                <option value="overpaid">Overpaid</option>
                <option value="cancelled">Cancelled</option>
                <option value="refunded">Refunded</option>
                <option value="partially_refunded">Partially Refunded</option>
                <option value="courtesy">Courtesy</option>
              </select>
            </div>
            <div className="py-3">
              <InfoComponent
                title="Important"
                text="Later you can add products to this case. Follow the progress of the case and add notes. See a timeline of events and more."
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-4"
        >
          Create new case
        </button>
      </form>
    </div>
  );
};

export default CaseCreateForm;
