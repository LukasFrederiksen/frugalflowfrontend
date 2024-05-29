import React, { useState, useEffect, useContext, useMemo } from "react";
import HttpClient from "../../Services/HttpClient";
import { baseUrl } from "../../const";
import Select from "react-select";
import { ThemeContext } from "../Theme/ThemeContext";

export default function DropdownForm({
  endpoint = "",
  labelKey = "name",
  valueKey = "id",
  initialSelected = "",
    useNone = false,
  onValueChange,
}) {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(initialSelected);

  const httpClient = useMemo(() => new HttpClient(baseUrl), []);
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
    let dataArray = []
    if (useNone) {
      let noneObject = {}
      noneObject[labelKey] = "None"
      noneObject[valueKey] = "None"
      dataArray.push(noneObject)
    }

    httpClient
      .get(endpoint)
      .then((response) => {
        if (Array.isArray(response.data)) {
          dataArray = dataArray.concat(response.data)
          console.log(dataArray)
          setData(dataArray);

        } else if (typeof response.data === "object") {
          // Convert object values into an array
          dataArray = dataArray.concat(Object.values(response.data.results))
          setData(dataArray);

        } else {
          console.warn("Fetched data is not recognized", response.data.results);
          setData(dataArray);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the data", error);
      });
  }, [endpoint, httpClient, useNone]);

  const options = data
    .filter((item) => item)
    .map((item) => ({
      value: item[valueKey],
      label: item[labelKey],
    }));

  const handleChange = (selectedOption) => {
    setSelected(selectedOption);
    onValueChange && onValueChange(selectedOption);
  };

  return (
    <Select
      value={selected}
      onChange={handleChange}
      options={options}
      styles={customStyles}
    />
  );
}
