import React, { useState, useEffect } from "react";
import HttpClient from "../../Services/HttpClient";
import { showSuccessToast } from "../common/toast";
import { baseUrl } from "../../const";
import { toast } from "react-toastify";
import DropdownForm from "../common/DropDown";

const httpClient = new HttpClient(baseUrl);

export default function ProductEditModal({ id, onClose, onUpdated }) {
  const [prevName, setPrevName] = useState("");
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [qty, setQty] = useState("");
  const [description, setDescription] = useState("");
  const [cost_price, setCostPrice] = useState("");
  const [retail_price, setRetailPrice] = useState("");
  const [manufacture, setManufacture] = useState("");
  const [selectedManufacture, setSelectedManufacture] = useState("");
  const [is_deleted, setDeleted] = useState("");
  const [isUnique, setIsUnique] = useState(false)

  useEffect(() => {
    if (!id) {
      toast.error("No product selected");
      return;
    }

    const fetchProductData = async () => {
      try {
        const response = await httpClient.get(`api/products/${id}`);
        const data = response.data.product;
        console.log("Product data:", data);
        setPrevName(data.name);
        setName(data.name);
        setSku(data.sku);
        setQty(data.qty);
        setDescription(data.description);
        setCostPrice(data.cost_price);
        setRetailPrice(data.retail_price);
        setManufacture(data.manufacture);
        setDeleted(
          data.is_deleted || data.is_deleted === "true" ? "true" : "false"
        );
        setIsUnique(
          data.is_unique
        );
        setSelectedManufacture(data.manufacture);
      } catch (error) {}
    };
    fetchProductData();
  }, [id]);

  const handleDropDownManufacturer = (selectedOption) => {
    setManufacture(selectedOption.value);
    setSelectedManufacture(selectedOption.value);
    console.log("Manufacture selected:", selectedOption.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("sku", sku);
    formData.append("qty", qty);
    formData.append("description", description);
    formData.append("cost_price", cost_price);
    formData.append("retail_price", retail_price);
    formData.append("manufacture", manufacture);
    formData.append("is_deleted", is_deleted);

    try {
      const originalDataResponse = await httpClient.get(`api/products/${id}`);
      const originalData = originalDataResponse.data.product;
      const response = await httpClient.put(`api/products/${id}`, formData);

      if (response.data) {
        const changes = [];

        if (name !== originalData.name) {
          changes.push(`Name`);
        }
        if (sku !== originalData.sku) {
          changes.push(`Sku`);
        }
        if (!isUnique && qty !== originalData.qty) {
          changes.push(`Qty`);
        }
        if (description !== originalData.description) {
          changes.push(`Description`);
        }
        if (cost_price !== originalData.cost_price) {
          changes.push(`Cost price`);
        }
        if (retail_price !== originalData.retail_price) {
          changes.push(`Retail price`);
        }
        if (manufacture !== originalData.manufacture) {
          changes.push(`Manufacture`);
        }

        if (changes.length > 0) {
          showSuccessToast("Product changes: " + changes.join(", "));
        }
        onUpdated();
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="backdrop-blur-sm fixed inset-0 flex items-center justify-center z-50 bg-gray-600/30 dark:bg-black/30">
      {selectedManufacture !== "" && <div className="bg-white w-11/12 md:w-3/4 lg:max-w-lg mx-auto p-6 rounded-lg shadow-lg z-50 dark:bg-ff_bg_continer_dark dark:text-white dark:shadow-dark">
        <form>
          <p className="text-xl font-bold text-black dark:text-white">
            Edit Product:
          </p>
          <p className="text-xl text-black dark:text-white mb-[15px]">
            {prevName}
          </p>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="mb-1 block text-sm text-left font-medium text-gray-700 dark:text-white"
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
              placeholder=""
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="sku"
              className="mb-1 block text-sm text-left font-medium text-gray-700 dark:text-white"
            >
              SKU
            </label>
            <input
              type="text"
              name="sku"
              id="sku"
              required
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="mt-1 p-2 border rounded w-full text-gray-700"
              placeholder=""
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="cost_price"
              className="mb-1 block text-sm text-left font-medium text-gray-700 dark:text-white"
            >
              Cost price
            </label>
            <input
              type="text"
              name="cost_price"
              id="cost_price"
              required
              value={cost_price}
              onChange={(e) => setCostPrice(e.target.value)}
              className="mt-1 p-2 border rounded w-full text-gray-700"
              placeholder=""
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="retail_price"
              className="mb-1 block text-sm text-left font-medium text-gray-700 dark:text-white"
            >
              Retail price
            </label>
            <input
              type="text"
              name="retail_price"
              id="retail_price"
              required
              value={retail_price}
              onChange={(e) => setRetailPrice(e.target.value)}
              className="mt-1 p-2 border rounded w-full text-gray-700"
              placeholder=""
            />
          </div>

          {!isUnique && <div className="mb-4">
            <label
              htmlFor="qty"
              className="mb-1 block text-sm text-left font-medium text-gray-700 dark:text-white"
            >
              Quantity
            </label>
            <input
              type="text"
              name="qty"
              id="qty"
              required
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              className="mt-1 p-2 border rounded w-full text-gray-700"
              placeholder=""
            />
          </div>}

          <div className="mb-4">
            <label
              htmlFor="description"
              className="mb-1 block text-sm text-left font-medium text-gray-700 dark:text-white"
            >
              Description
            </label>
            <input
              type="text"
              name="description"
              id="description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 p-2 border rounded w-full text-gray-700"
              placeholder=""
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="manufacture"
              className="mb-1 block text-sm text-left font-medium text-gray-700 dark:text-white"
            >
              Manufacture
            </label>
            <DropdownForm
              endpoint="api/manufactures?show_all=true"
              labelKey="name"
              valueKey="id"
              initialSelected={selectedManufacture}
              onValueChange={handleDropDownManufacturer}
            />
          </div>

          <button
            type="button"
            className="px-4 py-2 rounded-md bg-customYellow text-black font-semibold hover:bg-customYellowDark"
            onClick={handleSubmit}
          >
            Save
          </button>
          <button
            type="button"
            className="ml-2 px-4 py-2 rounded-md bg-customYellow hover:bg-red-600 text-black font-semibold"
            onClick={() => {
              onClose();
            }}
          >
            Close
          </button>
        </form>
      </div>}
    </div>
  );
}
