import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FiMoreHorizontal } from "react-icons/fi";
import SearchComponent from "../common/SearchBar";
import HttpClient from "../../Services/HttpClient";
import { baseUrl } from "../../const";
import Pagination from "../common/Pagination";
import ProductEditModal from "../Product/ProductEditModal";
import {StandardCurrency} from "../../utils/utils";

const httpClient = new HttpClient(baseUrl);

function ProductTable() {
  const [products, setData] = useState(null);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = products ? Math.ceil(products.count / itemsPerPage) : 0;
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const updateTableData = (id, updatedData) => {
    fetchData();
  };

  const fetchData = useCallback(async () => {
    const url = `api/products/?page=${currentPage}&search=${searchTerm}`;
    try {
      const response = await httpClient.get(url);
      setData(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [currentPage, searchTerm]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleModalOpen = (id) => {
    setSelectedProduct((id = { id }));
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleDetailsClick = (productId) => {
    // naviger til /product/:id
    navigate(`/products/${productId}`);
  };

  return (
    <div className="products-table-container">
      <div className="pb-6 flex flex-col md:flex-row justify-between items-start md:items-center bg-ff_background_light dark:bg-ff_background_dark rounded-t-lg">
        <div>
          <span className="text-3xl font-semibold text-gray-900 dark:text-white">
            Products Overview
          </span>
          <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            A detailed list of products and their respective details.
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-row">
          <SearchComponent
            placeholder="Search serial#, name or sku"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="ml-2 px-4 py-2 rounded-md bg-customYellow text-ff_background_dark font-semibold hover:bg-customYellowDark"
            onClick={() => navigate("/add-product")}
          >
            New
          </button>
        </div>
      </div>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-s text-gray-700 uppercase bg-gray-50 dark:bg-ff_bg_sidebar_dark dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-4 w-[320px]">
              Name
            </th>
            <th scope="col" className="px-6 py-4 w-[260px]">
              Sku
            </th>
            <th scope="col" className="px-6 py-4 w-[260px]">
              Cost price
            </th>
            <th scope="col" className="px-6 py-4 w-[260px]">
              Retail price
            </th>
            <th scope="col" className="px-6 py-4 w-[260px]">
              Qty
            </th>
            <th scope="col" className="px-6 py-4 float-right">
              Details
            </th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.results.map((product, index) => (
              <tr
                key={product.id}
                className={`text-left hover:bg-slate-300 hover:bg-opacity-50 dark:hover:bg-opacity-10
                                ${
                                  index !== itemsPerPage - 1
                                    ? "border-b border-gray-600"
                                    : ""
                                }
                                ${
                                  index % 2 === 0
                                    ? "ff-table-row-odd"
                                    : "ff-table-row-even"
                                }
                                `}
              >
                <td
                  className={`py-4 px-6 text-gray-900  dark:text-gray-300 w-[320px] ${
                    product.isDeleted
                      ? "text-opacity-25 dark:text-opacity-25"
                      : ""
                  }`}
                >
                  {product.name}
                </td>
                <td
                  className={`py-4 px-6 text-gray-900  dark:text-gray-300 w-[260px] ${
                    product.isDeleted
                      ? "text-opacity-25 dark:text-opacity-25"
                      : ""
                  }`}
                >
                  {product.sku}
                </td>
                <td
                  className={`py-4 px-6 text-gray-900  dark:text-gray-300 w-[260px] ${
                    product.isDeleted
                      ? "text-opacity-25 dark:text-opacity-25"
                      : ""
                  }`}
                >
                  {product.cost_price} {StandardCurrency}
                </td>
                <td
                  className={`py-4 px-6 text-gray-900  dark:text-gray-300 w-[260px] ${
                    product.isDeleted
                      ? "text-opacity-25 dark:text-opacity-25"
                      : ""
                  }`}
                >
                  {product.retail_price} {StandardCurrency}
                </td>
                <td
                  className={`py-4 px-6 text-gray-900  dark:text-gray-300 w-[260px] ${
                    product.isDeleted
                      ? "text-opacity-25 dark:text-opacity-25"
                      : ""
                  }`}
                >
                  {product.qty}
                </td>
                <td className="py-4 mr-4 items-center justify-center float-right">
                  <button onClick={() => handleDetailsClick(product.id)}>
                    <FiMoreHorizontal className="h-5 w-5 text-black dark:text-white" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
export default ProductTable;
