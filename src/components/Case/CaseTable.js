import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../common/Pagination";
import SearchComponent from "../common/SearchBar";
import { FiMoreHorizontal } from "react-icons/fi";
import HttpClient from "../../Services/HttpClient";
import { baseUrl } from "../../const";
import AscDescComponent from "../common/AscDescComponent";

const httpClient = new HttpClient(baseUrl);

function CasesTable() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortPriceTerm, setSortPriceTerm] = useState("");
  const [sortDeadlineTerm, setDeadlineTerm] = useState("");
  const itemsPerPage = 20;

  const fetchData = async () => {
    const url = `api/cases/?page=${currentPage}&search=${searchTerm}&sortprice=${sortPriceTerm}&sortdeadline=${sortDeadlineTerm}`;
    try {
      const response = await httpClient.get(url);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, searchTerm, sortPriceTerm, sortDeadlineTerm]);

  const togglePriceSort = (direction) => {
    setSortPriceTerm((prevSort) => (prevSort === direction ? null : direction));
  };

  const toggleDeadlineSort = (direction) => {
    setDeadlineTerm((prevSort) => (prevSort === direction ? null : direction));
  };

  const totalPages = data ? Math.ceil(data.count / itemsPerPage) : 0;

  const handleDetailsClick = (caseId) => {
    // naviger til /cases/:id
    navigate(`/case/${caseId}`);
    console.log("Clicked on details for case:", caseId);
  };

  return (
    <div className="cases-table-container">
      <div className="pb-5 flex flex-col md:flex-row justify-between items-start md:items-center bg-ff_background_light dark:bg-ff_background_dark rounded-t-lg">
        <div>
          <span className="text-3xl font-semibold text-gray-900 dark:text-white">
            Cases Overview
          </span>
          <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            A detailed list of cases and their respective details.
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-row">
          <SearchComponent
            placeholder="Search for cases..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => navigate("/add-case")}
            className="ml-2 px-4 py-2 rounded-md bg-customYellow text-ff_background_dark font-semibold hover:bg-customYellowDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-s text-gray-700 uppercase bg-gray-50 dark:bg-ff_bg_sidebar_dark dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-4">
                Title
              </th>
              <th scope="col" className="px-6 py-4">
                <div className="flex items-center">
                  Total Price
                  <AscDescComponent
                    className="pl-3"
                    currentSort={sortPriceTerm}
                    onToggleSort={togglePriceSort}
                  />
                </div>
              </th>
              <th scope="col" className="px-6 py-4">
                <div className="flex items-center">
                  Deadline
                  <AscDescComponent
                    className="pl-3"
                    currentSort={sortDeadlineTerm}
                    onToggleSort={toggleDeadlineSort}
                  />
                </div>
              </th>
              <th scope="col" className="px-6 py-4">
                Customer
              </th>
              <th scope="col" className="px-6 py-4">
                Status
              </th>
              <th scope="col" className="px-6 py-4">
                Payment Status
              </th>
              <th scope="col" className="px-6 py-4 text-right">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.results.map((caseItem, index) => (
                <tr
                  key={caseItem.id}
                  className={`text-left  hover:bg-ff_bg_sidebar_dark dark:hover:bg-opacity-50  ${
                    index !== itemsPerPage - 1 ? "border-b border-gray-600" : ""
                  } ${
                    index % 2 === 0 ? "ff-table-row-odd" : "ff-table-row-even"
                  }`}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {caseItem.title}
                  </th>
                  <td className="px-6 py-4">${caseItem.total_price}</td>
                  <td className="px-6 py-4">{caseItem.deadline}</td>
                  <td className="px-6 py-4">{caseItem.customer_data.name}</td>
                  <td className="px-6 py-4">{caseItem.case_status}</td>
                  <td className="px-6 py-4">{caseItem.payment_status}</td>
                  <td className="px-6 py-4 text-right">
                    {" "}
                    {/* Added cell for details button */}
                    <button onClick={() => handleDetailsClick(caseItem.id)}>
                      <FiMoreHorizontal className="h-5 w-5 text-black dark:text-white" />
                    </button>
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

export default CasesTable;
