import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TbFileDescription } from "react-icons/tb";
import { FaTimeline } from "react-icons/fa6";
import { BiSolidComponent } from "react-icons/bi";
import { LiaCommentDollarSolid } from "react-icons/lia";
import { LuSettings } from "react-icons/lu";
import { GoTasklist } from "react-icons/go";
import HttpClient from "../../Services/HttpClient";
import { baseUrl } from "../../const";

import InfoComponent from "../../components/Case/InfoComponent";
import CaseInfoComponent from "../../components/Case/detail/CaseInfoComponent";
import { TabsWithIconComponent } from "../../components/Case/detail/TabsWithIconComponent";

function CaseDetails() {
  const { id } = useParams();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const httpClient = new HttpClient(baseUrl);

  const fetchData = async () => {
    try {
      const response = await httpClient.get(`api/cases/${id}`);
      setCaseData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const tabs = [
    {
      label: "Information",
      value: "information",
      icon: <TbFileDescription className="w-5 h-5" />,
      component: caseData && <CaseInfoComponent caseData={caseData} />,
    },
    {
      label: "Products",
      value: "products",
      icon: <BiSolidComponent className="w-5 h-5" />,
      component: <InfoComponent title="Products" text="Products Information" />,
    },
    {
      label: "Timeline",
      value: "timeline",
      icon: <FaTimeline className="w-5 h-5" />,
      component: <InfoComponent title="Timeline" text="Timeline Information" />,
    },
    {
      label: "Tasks",
      value: "tasks",
      icon: <GoTasklist className="w-5 h-5" />,
      component: <InfoComponent title="Tasks" text="Tasks Information" />,
    },
    {
      label: "Payments",
      value: "payments",
      icon: <LiaCommentDollarSolid className="w-5 h-5" />,
      component: <InfoComponent title="Settings" text="Settings Information" />,
    },
    {
      label: "Settings",
      value: "settings",
      icon: <LuSettings className="w-5 h-5" />,
      component: <InfoComponent title="Settings" text="Settings Information" />,
    },
  ];

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading case details</p>;
  }

  return (
    <TabsWithIconComponent
      title={caseData?.title}
      caseId={caseData?.id}
      tabs={tabs}
    />
  );
}

export default CaseDetails;
