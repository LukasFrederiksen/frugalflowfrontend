import React, { useEffect, useState } from "react";
import CounterWidget from "../components/Dashboard/counter_component";
import { RiShipFill } from "react-icons/ri";
import { IoMdPerson } from "react-icons/io";
import { FaGear } from "react-icons/fa6";
import { BsBriefcaseFill } from "react-icons/bs";
import ChartComponent from "../components/Dashboard/linechart_component";
import PieChartComponent from "../components/Dashboard/piechart_component";
import ListComponent from "../components/Dashboard/list_component";
import HttpClient from "../Services/HttpClient";
import { baseUrl } from "../const";

const httpClient = new HttpClient(baseUrl);

function Dashboard() {
  const [totalCases, setTotalCases] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalVessels, setTotalVessels] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  const data = [
    { name: "Cases", value: totalCases },
    { name: "Customers", value: totalCustomers },
    { name: "Vessels", value: totalVessels },
    { name: "Products", value: totalProducts },
  ];

  const getTotalCases = async () => {
    const url = `api/cases/count`;
    try {
      const response = await httpClient.get(url);
      setTotalCases(response.data.count);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getTotalCustomers = async () => {
    const url = `api/customers/count`;
    try {
      const response = await httpClient.get(url);
      setTotalCustomers(response.data.count);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getTotalVessels = async () => {
    const url = `api/vessels/count?is_deleted=false`;
    try {
      const response = await httpClient.get(url);
      setTotalVessels(response.data.count);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getTotalProducts = async () => {
    const url = `api/products/count`;
    try {
      const response = await httpClient.get(url);
      setTotalProducts(response.data.count);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getTotalCases();
    getTotalCustomers();
    getTotalVessels();
    getTotalProducts();
  }, []);

  return (
    <div className="dark:text-white p-4 bg-dark-mode">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </header>

      {/* Her smider vi counters, til den første row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <CounterWidget
          title="Total Cases"
          count={totalCases}
          icon={BsBriefcaseFill}
        />
        <CounterWidget
          title="Total Products"
          count={totalProducts}
          icon={FaGear}
        />
        <CounterWidget
          title="Total Customers"
          count={totalCustomers}
          icon={IoMdPerson}
        />
        <CounterWidget
          title="Total Vessels"
          count={totalVessels}
          icon={RiShipFill}
        />
      </div>

      {/* Chart og List  */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <div className="lg:col-span-2">
          <ChartComponent />
        </div>
        <div className="lg:col-span-1">
          <PieChartComponent title={"Numbers chart"} data={data} />
        </div>
      </div>

      {/* ikke generisk List Component */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 mb-8">
        <div className="lg:col-span-2">
          <ListComponent title={"Your cases"} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
