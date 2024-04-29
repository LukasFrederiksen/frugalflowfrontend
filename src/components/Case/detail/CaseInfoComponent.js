import React from "react";
import IconAndText from "../../common/IconAndText";
import { GiCargoShip } from "react-icons/gi";
import { BsFileEarmarkTextFill } from "react-icons/bs";
import { FaBarsProgress } from "react-icons/fa6";
import { BsPeopleFill } from "react-icons/bs";


const CaseInfoComponent = ({ caseData }) => {
  return (
    <div className="w-full bg-white rounded-md dark:bg-ff_bg_continer_dark dark:text-white">
      <div className="flex flex-wrap">
        {/* Left Column */}
        <div className="w-full md:w-1/2 mb-6 md:pr-4">
          <IconAndText icon={GiCargoShip} text="Customer" />
          <div className="flex flex-col lg:flex-row  rounded-lg w-full ">
            <img
              className="rounded-lg  w-full lg:w-48"
              src={caseData.customer_data?.customer_picture}
              alt="Description of image"
              style={{ objectFit: "cover", height: "170%", width: "35%" }}
            />
            <div className="flex-grow flex flex-col justify-start lg:p-4 sm:pt-4">
              <div>{caseData.customer_data?.name}</div>
              <div>{caseData.customer_data?.email}</div>
              <div>{caseData.customer_data?.phone}</div>
              <div>{caseData.customer_data?.address}</div>
            </div>
          </div>

          <IconAndText icon={BsFileEarmarkTextFill} text="Description" />
          <div>{caseData.description}</div>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-1/2 mb-6 md:border-l border-gray-200 dark:border-ff_background_dark md:pl-4">
          <IconAndText icon={FaBarsProgress} text="Status" />
          <div>
            <div>Total Price: ${caseData.total_price}</div>
            Deadline: {new Date(caseData.deadline).toLocaleDateString()}
          </div>
          <div>Case Status: {caseData.case_status}</div>
          <div>Payment Status: {caseData.payment_status}</div>
          <div>
            Created At: {new Date(caseData.created_at).toLocaleString()}
          </div>
          <IconAndText icon={BsPeopleFill} text="Status" />
          <div>Product Owner: {caseData.product_owner}</div>
        </div>
      </div>
    </div>
  );
};

export default CaseInfoComponent;
