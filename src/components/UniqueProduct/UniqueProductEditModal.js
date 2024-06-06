import React, { useState, useEffect } from "react";
import HttpClient from "../../Services/HttpClient";
import { showSuccessToast } from "../common/toast";
import { baseUrl } from "../../const";
import { toast } from "react-toastify";
import DropdownForm from "../common/DropDown";

const httpClient = new HttpClient(baseUrl);

export default function UniqueProductEditModal({ id, onClose, onUpdated }) {
  const [serialNumber, setSerialNumber] = useState("");
  const [description, setDescription] = useState("");
  const [isDeleted, setDeleted] = useState("");
  const [customPrice, setCustomPrice] = useState("");
  const [product, setProduct] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [productCase, setProductCase] = useState({});
  const [selectedCase, setSelectedCase] = useState({});

  useEffect(() => {
    if (!id) {
      toast.error("No product selected");
      return;
    }

    const fetchProductData = async () => {
      try {
        const response = await httpClient.get(`api/unique_products/${id}`);
        const data = response.data.product;
        // console.log("Product data:", data);
        setSerialNumber(data.serial_number);
        setDescription(data.product.description);
        setCustomPrice(data.custom_price);
        setSelectedProduct(data.product);
        setProduct(data.product);
        setProductCase(data.case);
        setSelectedCase(data.case);
      } catch (error) {}
    };
    fetchProductData();
  }, [id]);

  const handleDropDownProduct = (selectedOption) => {
    setProduct(selectedOption.value);
    setSelectedProduct(selectedOption.value);
    console.log("Product selected:", selectedOption.value);
  };
  const handleDropDownCase = (selectedOption) => {
    setProductCase(selectedOption.value);
    setSelectedCase(selectedOption.value);
    console.log("Case selected:", selectedOption.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("serial_number", serialNumber);
    formData.append("product", product);
    formData.append("case", productCase);
    formData.append("custom_price", customPrice);
    formData.append("description", description);
    formData.append("is_deleted", isDeleted);

    try {
      const originalDataResponse = await httpClient.get(`api/unique_products/${id}`);
      const originalData = originalDataResponse.data.product;
      const response = await httpClient.put(`api/unique_products/${id}`, formData);

      if (response.data) {
        const changes = [];

        if (serialNumber !== originalData.serial_number) {
          changes.push(`Serial number`);
        }
        if (productCase !== originalData.case) {
          changes.push(`Case`);
        }
        if (product !== originalData.product) {
          changes.push(`Product`);
        }
        if (customPrice !== originalData.custom_price) {
          changes.push(`Custom Price`);
        }
        if (description !== originalData.description) {
          changes.push(`Description`);
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
      {selectedProduct && selectedCase &&
        <div className="bg-white w-11/12 md:w-3/4 lg:max-w-lg mx-auto p-6 rounded-lg shadow-lg z-50 dark:bg-ff_bg_continer_dark dark:text-white dark:shadow-dark">
        <form>
          <p className="text-xl font-bold text-black dark:text-white">
            Edit Product:
          </p>

          <div className="mb-4">
            <label
              htmlFor="product"
              className="mb-1 block text-sm text-left font-medium text-gray-700 dark:text-white"
            >
              Product
            </label>
            <DropdownForm
              endpoint="api/products/is_unique/1"
              labelKey="name"
              valueKey="id"
              initialSelected={selectedProduct}
              onValueChange={handleDropDownProduct}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="serial_number"
              className="mb-1 block text-sm text-left font-medium text-gray-700 dark:text-white"
            >
              Serial number
            </label>
            <input
              type="text"
              name="serial_number"
              id="serial_number"
              required
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              className="mt-1 p-2 border rounded w-full text-gray-700"
              placeholder=""
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="custom_price"
              className="mb-1 block text-sm text-left font-medium text-gray-700 dark:text-white"
            >
              Custom price
            </label>
            <input
              type="number"
              name="custom_price"
              id="custom_price"
              required
              value={customPrice}
              onChange={(e) => setCustomPrice(e.target.value)}
              className="mt-1 p-2 border rounded w-full text-gray-700"
              placeholder=""
            />
          </div>

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
              htmlFor="case"
              className="mb-1 block text-sm text-left font-medium text-gray-700 dark:text-white"
            >
              Case
            </label>
            <DropdownForm
              endpoint="api/cases/"
              labelKey="title"
              valueKey="id"
              useNone= {true}
              initialSelected={selectedCase}
              onValueChange={handleDropDownCase}
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
