import React, { useState, useEffect } from "react";
import Pagination from "../common/Pagination";
import SearchComponent from "../common/SearchBar";
import { FiMoreHorizontal } from "react-icons/fi";
import HttpClient from "../../Services/HttpClient";
import { baseUrl } from "../../const";
import AscDescComponent from "../common/AscDescComponent";

import EditManufacturers from "../../components/Manufacture/EditManufacturers";
import AddManufacture from "../../components/Manufacture/AddManufacturers";

const httpClient = new HttpClient(baseUrl);

function ManufactureTable() {
  const [data, setData] = useState(null);
  const [manufactureCount, setManufactureCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortNameTerm, setSortNameTerm] = useState("");
  const [isDeletedTerm, setIsDeletedTerm] = useState("");
  const [selectedManufacture, setSelectedManufacture] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [addManufactureOpen, setAddManufactureOpen] = useState(false);
  const itemsPerPage = 20;

  const fetchData = async () => {
    const url = `api/manufactures/?page=${currentPage}&search=${searchTerm}&sortname=${sortNameTerm}&isdeleted=${isDeletedTerm}`;
    try {
      const response = await httpClient.get(url);
      setData(response.data);
      setManufactureCount(response.data ? response.data.count : 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, searchTerm, sortNameTerm, isDeletedTerm]);

  const toggleNameSort = (direction) => {
    setSortNameTerm((prevSort) => (prevSort === direction ? null : direction));
  };

  const handleIsdeletedSort = (value) => {
    setCurrentPage(1);
    setIsDeletedTerm(value);
  };

  const totalPages = data ? Math.ceil(data.count / itemsPerPage) : 0;

  const handleDetailsClick = (id) => {
    setSelectedManufacture((id = { id }));
    setModalOpen(true);
    console.log("Clicked on details for manufacturers:", id);
  };

  const closeEditForm = () => {
    setModalOpen(false);
  };

  return (
    <div className="cases-table-container">
      <div className="pb-5 flex flex-col md:flex-row justify-between items-start md:items-center bg-ff_background_light dark:bg-ff_background_dark rounded-t-lg">
        <div>
          <span className="text-3xl font-semibold text-gray-900 dark:text-white">
            Manufacturer Overview
          </span>
          <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            A detailed list of Manufacturers and their respective details.
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-row">
          <SearchComponent
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {addManufactureOpen ? (
            <AddManufacture onClose={() => setAddManufactureOpen(false)} />
          ) : (
            <button
              className="ml-2 px-4 py-2 rounded-md bg-customYellow text-ff_background_dark font-semibold hover:bg-customYellowDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => setAddManufactureOpen(true)}
            >
              Add
            </button>
          )}
        </div>
      </div>

      <div className="my-3 flex justify-between">
        <div>
          <p className="text-sm font-semibold py-2 text-gray-500 dark:text-gray-400">
            Manufacturers on list: {manufactureCount}
          </p>
        </div>
        <div>
          <button
            className={`px-2 py-2 mr-2 rounded-md bg-customYellow text-ff_background_dark font-semibold hover:bg-customYellowDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
              isDeletedTerm === ""
                ? "bg-blue-500 text-ff_background_dark"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleIsdeletedSort("")}
          >
            All
          </button>
          <button
            className={`px-2 py-2 mr-2 rounded-md bg-customYellow text-ff_background_dark font-semibold hover:bg-customYellowDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
              isDeletedTerm === "false"
                ? "bg-blue-500 text-ff_background_dark"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleIsdeletedSort("false")}
          >
            Active
          </button>
          <button
            className={`px-2 py-2 rounded-md bg-customYellow text-ff_background_dark font-semibold hover:bg-customYellowDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
              isDeletedTerm === "true"
                ? "bg-blue-500 text-ff_background_dark"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleIsdeletedSort("true")}
          >
            Inactive
          </button>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-s text-gray-700 uppercase bg-gray-50 dark:bg-ff_bg_sidebar_dark dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-4">
                ID
              </th>
              <th scope="col" className="px-6 py-4">
                Current In Use
              </th>
              <th scope="col" className="px-6 py-4">
                <div className="flex items-center">
                  Manufacturer Name
                  <AscDescComponent
                    className="pl-3"
                    currentSort={sortNameTerm}
                    onToggleSort={toggleNameSort}
                  />
                </div>
              </th>

              <th scope="col" className="px-6 py-4">
                Contact Person
              </th>
              <th scope="col" className="px-6 py-4">
                Email
              </th>
              <th scope="col" className="px-6 py-4">
                Phone
              </th>
              <th scope="col" className="px-6 py-4">
                Logo
              </th><th scope="col" className="px-6 py-4">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {data && data.results.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  style={{ fontWeight: "bold", padding: "10px 0" }}
                >
                  No Manufacturers matches the criteria.
                </td>
              </tr>
            ) : (
              data &&
              data.results.map((MenuItem, index) => (
                <tr
                  key={MenuItem.id}
                  className={`text-left hover:bg-ff_bg_sidebar_dark hover:bg-opacity-30 dark:hover:bg-ff_bg_sidebar_dark dark:hover:bg-opacity-70  ${
                    index !== itemsPerPage - 1 ? "border-b border-gray-600" : ""
                  } ${
                    index % 2 === 0 ? "ff-table-row-odd" : "ff-table-row-even"
                  }`}
                >
                  <td className="px-6 py-4">{MenuItem.id}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`${
                        MenuItem.isdeleted ? "bg-red-500" : "bg-green-500"
                      } h-2 w-2 rounded-full inline-block mr-2`}
                    ></span>
                    {MenuItem.isdeleted ? "No" : "Yes"}
                  </td>
                  <td className="px-6 py-4">{MenuItem.name}</td>
                  <td className="px-6 py-4">{MenuItem.contact_person.email}</td>
                  <td className="px-6 py-4">{MenuItem.email}</td>
                  <td className="px-6 py-4">{MenuItem.phone}</td>
                  <td className="px-6 py-2">
                    <img
                      src={
                        MenuItem.picture_logo.startsWith("http") ||
                        MenuItem.picture_logo.startsWith("https")
                          ? MenuItem.picture_logo
                          : ""
                      }
                      alt="picture_logo"
                      style={{ width: "100px", height: "auto" }}
                    />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDetailsClick(MenuItem.id)}>
                      <FiMoreHorizontal className="h-5 w-5 text-black dark:text-white" />
                    </button>
                    {modalOpen && selectedManufacture.id === MenuItem.id && (
                      <EditManufacturers
                        id={MenuItem.id}
                        onClose={closeEditForm}
                      />
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
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

export default ManufactureTable;
