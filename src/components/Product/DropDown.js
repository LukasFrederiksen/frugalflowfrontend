// DropdownComponent.js
import React, { useState, useEffect, useContext } from "react";
import HttpClient from "../../Services/HttpClient";
import { baseUrl } from "../../const";
import Select from "react-select";
import { ThemeContext } from "../Theme/ThemeContext";

export default function DropdownForm({
  endpoint = "",
  labelKey = "name",
  valueKey = "id",
  initialSelected = "",
  onValueChange,
}) {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(initialSelected);

  const httpClient = new HttpClient(baseUrl);
  const { theme } = useContext(ThemeContext);
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      outline: "none",
      backgroundColor: theme === "dark" ? "#1f2937" : "#FFFFFF",
      borderColor: state.isFocused ? "#e6d064" : "#e6d064",
      borderWidth: "0px",
      borderRadius: "0.375rem",
      padding: "0.4rem",
      color: theme === "dark" ? "#FFFFFF" : "#1f2937",
      boxShadow: state.isFocused ? "0 0 0 3px rgba(66, 153, 225, 0.5)" : null,
      "&:hover": {
        borderColor: "#e6d064",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: theme === "dark" ? "#FFFFFF" : "#1f2937",
    }),
    input: (provided) => ({
      ...provided,
      color: theme === "dark" ? "#FFFFFF" : "#1f2937",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "rgba(230, 208, 100, 0.5)"
        : state.isFocused
        ? theme === "dark"
          ? "#4A5568"
          : "#EBEBEB"
        : theme === "dark"
        ? "#1f2937"
        : "#FFFFFF",
      color: theme === "dark" || state.isSelected ? "#FFFFFF" : "#1f2937",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: theme === "dark" ? "#1f2937" : "#FFFFFF",
    }),
  };

  
  useEffect(() => {
    if (!endpoint) return;
  
    httpClient
      .get(endpoint)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else if (typeof response.data === 'object') {
          // Convert object values into an array
          setData(Object.values(response.data.results));
        } else {
          console.warn("Fetched data is not recognized", response.data.results);
          setData([]);  // Ensure .map() doesn't throw an error
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the data", error);
      });
  }, [endpoint]);
  
  const options = data.map((item) => ({
    value: item[valueKey],
    label: item[labelKey],
  }));
  
  // Tager den aktuelle værdi fra den række der er valgt og sætter ind i dropdownen (Manufacture)
  const initialSelectedOption = data.find(item => item[valueKey] === initialSelected);
  const initialSelectedFormatted = initialSelectedOption
    ? { value: initialSelectedOption[valueKey], label: initialSelectedOption[labelKey] }
    : null;
  
  const handleChange = (selectedOption) => {
    setSelected(selectedOption);
    onValueChange && onValueChange(selectedOption);
  };

return (
    <Select
      value={selected || initialSelectedFormatted}
      onChange={handleChange}
      options={options}
      styles={customStyles}
    />
);
}
