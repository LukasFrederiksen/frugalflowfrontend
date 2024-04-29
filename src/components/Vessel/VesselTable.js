import React, { useState, useEffect, useCallback } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { BiSolidCircle } from "react-icons/bi";
import SearchComponent from "../common/SearchBar";
import HttpClient from "../../Services/HttpClient";
import { baseUrl } from "../../const";
import Pagination from "../common/Pagination";
import { useNavigate } from "react-router-dom";
import VesselEditModal from "../Vessel/VesselEditModal"

const httpClient = new HttpClient(baseUrl);

function VesselTable() {

    const [vessels, setData] = useState(null);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [isActiveTerm, setIsActiveTerm] = useState("true")
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = vessels ? Math.ceil(vessels.count / itemsPerPage) : 0;
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedVessel, setSelectedVessel] = useState(null);

    const updateTableData = (id, updatedData) => {
        fetchData();
    }

    const fetchData = useCallback(async () => {
        const url = `api/vessels/?page=${currentPage}&search=${searchTerm}&isActive=${isActiveTerm}`;
        try {
          const response = await httpClient.get(url);
          setData(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
        }, [currentPage, searchTerm, isActiveTerm]
    );

      useEffect(() => {
        fetchData();
      }, [fetchData]);

      const handleIsActiveSort = (value) => {
        setCurrentPage(1);
        setIsActiveTerm(value);
      };

      const handleModalOpen = (id) => {
        setSelectedVessel(id = { id });
        setModalOpen(true);
      };

      const handleModalClose = () => {
        setModalOpen(false);
      };

    return (
        <div className="cases-table-container">
            
            <div className="pb-6 flex flex-col md:flex-row justify-between items-start md:items-center bg-ff_background_light dark:bg-ff_background_dark rounded-t-lg">
                <div>
                    <span className="text-3xl font-semibold text-gray-900 dark:text-white">
                        Vessels Overview
                    </span>
                    <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                        A detailed list of vessels and their respective details.
                    </p>
                </div>
                <div className="mt-4 md:mt-0 flex flex-row">
                    <SearchComponent
                        placeholder="Search name or imo"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {/* New button here */}
                    <button 
                        className="ml-2 px-4 py-2 rounded-md bg-customYellow text-ff_background_dark font-semibold hover:bg-customYellowDark"
                        onClick={() => navigate("/add-vessel")}
                    >
                        New
                    </button>
                </div>
            </div>

            <div className="relative overflow-x-auto shadow-md rounded-lg">
                <div className="mb-4 flex float-right">
                    <div>
                        {/* Show all button here */}
                    <button
                            className={`px-2 py-2 mr-2 rounded-md bg-customYellow text-ff_background_dark font-semibold hover:bg-customYellowDark
                                ${isActiveTerm === ""
                                ? ""
                                : "dark:bg-gray-400 bg-gray-300"
                                }`}
                                onClick={() => handleIsActiveSort("")}
                        >
                            All
                        </button>
                        {/* Show active button here */}
                        <button
                            className={`px-2 py-2 mr-2 rounded-md bg-customYellow text-ff_background_dark font-semibold hover:bg-customYellowDark
                                ${isActiveTerm === "true"
                                ? ""
                                : "dark:bg-gray-400 bg-gray-300"
                                }`}
                                onClick={() => handleIsActiveSort("true")}
                        >
                            Active
                        </button>
                        {/* Show inactive button here */}
                        <button
                            className={`px-2 py-2 rounded-md bg-customYellow text-ff_background_dark font-semibold hover:bg-customYellowDark
                            ${isActiveTerm === "false"
                            ? ""
                            : "dark:bg-gray-400 bg-gray-300"
                            }`}
                            onClick={() => handleIsActiveSort("false")}
                        >
                            Inactive
                        </button>
                    </div>
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-s text-gray-700 uppercase bg-gray-50 dark:bg-ff_bg_sidebar_dark dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-4 w-[120px]">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-4 w-[300px]">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-4 w-[220px]">
                                Imo
                            </th>
                            <th scope="col" className="px-6 py-4 w-[220px]">
                                Type
                            </th>
                            <th scope="col" className="px-6 py-4 float-right">
                                Details
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {vessels &&
                            vessels.results.map((vessel, index) => (
                        <tr key={vessel.id}
                            className={`text-left hover:bg-slate-300 hover:bg-opacity-50 dark:hover:bg-opacity-10
                                ${index !== itemsPerPage - 1 ? 'border-b border-gray-600' : ''}
                                ${index % 2 === 0 ? 'ff-table-row-odd' : 'ff-table-row-even'}
                                `}>
                            <td className={`w-[150px] pl-9 px-6 ${vessel.isDeleted ? 'text-red-500 dark:text-red-500' : 'text-green-600 dark:text-green-600'}`}>
                                
                            <div className="tooltip">
                                <span className={`tooltiptext ${vessel.isDeleted ? 'bg-slate-300 dark:bg-gray-800 text-red-500 dark:text-red-500' : 'bg-slate-300 dark:bg-gray-800 text-green-600 dark:text-green-600'}`}>
                                    {vessel.isDeleted ? 'Inactive' : 'Active' }
                                </span>
                                <BiSolidCircle className="h-3 w-3" /> 
                            </div>

                            </td>
                            <td className={`py-4 px-6 text-gray-900 dark:text-gray-300 w-[120px] ${vessel.isDeleted ? 'text-opacity-25 dark:text-opacity-25' : ''}`}>
                                {vessel.name}
                            </td>
                            <td className={`py-4 px-6 text-gray-900  dark:text-gray-300 w-[300px] ${vessel.isDeleted ? 'text-opacity-25 dark:text-opacity-25' : ''}`}>
                                {vessel.imo}
                            </td>
                            <td className={`py-4 px-6 text-gray-900  dark:text-gray-300 w-[220px] ${vessel.isDeleted ? 'text-opacity-25 dark:text-opacity-25' : ''}`}>
                                {vessel.type}
                            </td>
                            <td className="py-4 mr-4 items-center justify-center float-right">
                                <button onClick={() => handleModalOpen(vessel.id)}>
                                    <FiMoreHorizontal className="h-5 w-5 text-black dark:text-white" />
                                </button>
                                {modalOpen && selectedVessel.id === vessel.id && (
                                    <VesselEditModal
                                    id={vessel.id}
                                    onClose={handleModalClose}
                                    updateTableData={updateTableData}/>
                                )}
                            </td>
                        </tr>
                        ))}
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

export default VesselTable;