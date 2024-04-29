import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../common/Pagination";
import HttpClient from "../../Services/HttpClient";
import { baseUrl } from "../../const";

const httpClient = new HttpClient(baseUrl);

function ListComponent({ title }) {
  const userId = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).id
    : null;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [data, setData] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const totalPages = data ? Math.ceil(data.count / itemsPerPage) : 0;

  const fetchData = async () => {
    const url = `api/users/${userId}/cases?page=${currentPage}&page_size=${itemsPerPage}`;
    try {
      const response = await httpClient.get(url);
      setData(response.data);
      setTotalCount(response.data.count);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <div className="flex flex-col rounded-lg shadow-lg">
      <div className="flex justify-between items-center bg-ff_background_light dark:bg-ff_background_dark rounded-t-lg">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white p-4">
          {title}
        </h2>
        <div className="text-sm text-gray-700 dark:text-gray-300 p-4">
          You have: {totalCount} open cases
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-ff_bg_sidebar_dark dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-4">
                Case no
              </th>
              <th scope="col" className="px-6 py-4">
                Case name
              </th>
              <th scope="col" className="px-6 py-4">
                Status
              </th>
              <th scope="col" className="px-6 py-4">
                Latest update
              </th>
              <th scope="col" className="px-6 py-4 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              data.results.map((item, index) => (
                <tr
                  key={item.id}
                  className={`hover:bg-ff_bg_sidebar_dark dark:hover:bg-opacity-50 ${
                    index % 2 === 0 ? "ff-table-row-odd" : "ff-table-row-even"
                  }`}
                >
                  <td className="px-6 py-4 text-gray-900 dark:text-white">
                    {item.id}
                  </td>
                  <td className="px-6 py-4">{item.title}</td>
                  <td className="px-6 py-4">{item.case_status}</td>
                  <td className="px-6 py-4">{item.deadline}</td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/case/${item.id}`}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      View Case
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Loading...</td>
              </tr>
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

export default ListComponent;
