import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DropdownForm from "../common/DropDown";
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
    deadline: "",
    user_id: "",
    vessel_id: "",
    case_status: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDropdownVessel = (selectedOption) => {
    setFormData((prevState) => ({
      ...prevState,
      vessel_id: selectedOption.value,
    }));
  };
  const handleDropdownCaseManager = (selectedOption) => {
    setFormData((prevState) => ({
      ...prevState,
      user_id: selectedOption.value,
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

    const today = new Date();
    const deadline = new Date(formData.deadline);
    if (isNaN(deadline) || deadline < today) {
      Errors.deadline = "Select a valid date in the future.";
    }

    if (!formData.case_status) {
      Errors.case_status = "Select a case status.";
    }

    if (!formData.vessel_id) {
      Errors.vessel_id = "Select a vessel.";
    }

    if (!formData.user_id) {
      Errors.user_id = "Select a case manager.";
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
                {errors.vessel_id && (
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
            {/* Case Manager */}
            <div className="py-2">
              <label className="flex justify-between items-center mb-2 text-sm font-medium ff-text">
                Case Manager
                {errors.user_id && (
                  <p className="text-red-500 text-xs ml-auto">
                    {errors.user_id}
                  </p>
                )}
              </label>
              <DropdownForm
                endpoint="api/users?show_all=true"
                labelKey="first_name"
                valueKey="id"
                initialSelected=""
                onValueChange={handleDropdownCaseManager}
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
