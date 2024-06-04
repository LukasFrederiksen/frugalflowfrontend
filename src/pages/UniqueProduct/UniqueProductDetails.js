import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TbFileDescription } from "react-icons/tb";
import { FaTimeline } from "react-icons/fa6";
import { BiSolidComponent } from "react-icons/bi";
import HttpClient from "../../Services/HttpClient";
import { baseUrl } from "../../const";

import InfoComponent from "../../components/Case/InfoComponent";
import { TabsWithIconComponent } from "../../components/Case/detail/TabsWithIconComponent";
import UniqueProductInfoComponent from "../../components/UniqueProduct/Detail/UniqueProductInfoComponent";


function UniqueProductDetails() {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const httpClient = new HttpClient(baseUrl);

  const fetchData = async () => {
    try {
      const response = await httpClient.get(`api/products/unique_product/${id}`);
      setProductData(response.data.product);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const refreshProductData = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const tabs = [
    {
      label: "Information",
      value: "information",
      icon: <TbFileDescription className="w-5 h-5" />,
      component: productData && <UniqueProductInfoComponent product={productData} />,
    },
    {
      label: "Stock",
      value: "stock",
      icon: <BiSolidComponent className="w-5 h-5" />,
      component: <InfoComponent title="Stock" text="Stock overview" />,
    },
    {
      label: "Timeline",
      value: "timeline",
      icon: <FaTimeline className="w-5 h-5" />,
      component: <InfoComponent title="Timeline" text="Timeline Information" />,
    },
    {
      label: "Settings",
      value: "settings",
      icon: <FaTimeline className="w-5 h-5" />,
      component: (
        <button onClick={() => setIsModalOpen(true)}>Edit Product</button>
      ),
    },
  ];

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading product details</p>;
  }

  return (
    <>
      <TabsWithIconComponent tabs={tabs} />
      {isModalOpen && (
        <UniqueProductDetails
          id={id}
          onClose={() => setIsModalOpen(false)}
          onUpdated={refreshProductData} // Pass the callback here
        />
      )}
    </>
  );
}

export default UniqueProductDetails;
