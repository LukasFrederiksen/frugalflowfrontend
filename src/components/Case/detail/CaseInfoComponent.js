import React from "react";
import IconAndText from "../../common/IconAndText";
import {GiCargoShip} from "react-icons/gi";
import {BsFileEarmarkTextFill} from "react-icons/bs";
import {FaBarsProgress} from "react-icons/fa6";
import {BsPeopleFill} from "react-icons/bs";
import DetailsSection from "../../UniqueProduct/Detail/DetailsSection";
import {StandardCurrency} from "../../../utils/utils";


const CaseInfoComponent = ({caseData}) => {
    console.log(caseData)
    return (
        <div className="w-full bg-white rounded-md dark:bg-ff_bg_continer_dark dark:text-white">
            <div className="flex flex-wrap">
                {/* Left Column */}
                <div className="w-full md:w-1/2 mb-6 md:pr-4">
                    <IconAndText icon={GiCargoShip} text="Vessel"/>
                    <div className="flex flex-col lg:flex-row  rounded-lg w-full ">
                        <img
                            className="rounded-lg  w-full lg:w-48"
                            src={"https://static.vesselfinder.net/ship-photo/9594145-538004239-fd74a0d6e6e8a9fb7042a0b5412e2bb5/1?v1"}
                            alt={"Picture of " + caseData.case.vessel.name}
                            style={{objectFit: "cover", height: "170%", width: "35%"}}
                        />
                        <div className="flex-grow flex flex-col justify-start lg:p-4 sm:pt-4">
                            <DetailsSection
                                title="Name"
                                detail={caseData.case.vessel.name}/>
                            <DetailsSection
                                title="IMO"
                                detail={caseData.case.vessel.imo}/>
                            <DetailsSection
                                title="Ship Owner"
                                detail={caseData.case.vessel.customer.name}/>
                        </div>
                    </div>

                    <IconAndText icon={BsFileEarmarkTextFill} text="Description"/>
                    <div>{caseData.case.description}</div>
                </div>

                {/* Right Column */}
                <div
                    className="w-full md:w-1/2 mb-6 md:border-l border-gray-200 dark:border-ff_background_dark md:pl-4">
                    <IconAndText icon={FaBarsProgress} text="Status"/>
                    <div>
                        <div>Total Price: {calculateTotalPrice(caseData.unique_products)} {StandardCurrency}</div>
                        Deadline: {new Date(caseData.case.deadline).toLocaleDateString()}
                    </div>
                    <div>Case Status: {caseData.case.case_status}</div>
                    <div>
                        Created At: {new Date(caseData.case.created_at).toLocaleString()}
                    </div>
                    <IconAndText icon={BsPeopleFill} text="Assigned Manager"/>
                    <div>Project Manager: {caseData.case.user.first_name} {caseData.case.user.last_name}</div>
                    <div>Email: {caseData.case.user.email}</div>
                    <div>Phone Number: {caseData.case.user.phone_number}</div>
                </div>
            </div>
        </div>
    );
};

function calculateTotalPrice(uniqueProducts){
    let total = 0
    uniqueProducts.forEach((product) => {
        if (product?.custom_price && product.custom_price >= 0){
            total += product.custom_price
        }else{
            total += product?.product?.retail_price
        }
    })

    return total
}

export default CaseInfoComponent;
