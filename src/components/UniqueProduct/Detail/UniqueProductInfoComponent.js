import React from "react";
import UniqueProductDetailSection from "./UniqueProductDetailsSection";
import UniqueProductDetailSectionDescription from "./UniqueProductDetailsDescription";

const UniqueProductInfoComponent = ({product}) => {
    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-wrap bg-ff_bg_continer_light dark:bg-ff_bg_continer_dark">
                {/* Product Image and Title */}
                {/*<div className="w-full md:w-1/2 md:border-b-0">*/}
                {/*  <div className="flex justify-center">*/}
                {/*    <img*/}
                {/*      src="https://softsmarttech.co.za/wp-content/uploads/2018/06/image-not-found-1038x576.jpg"*/}
                {/*      alt={product?.name}*/}
                {/*      className="rounded-md"*/}
                {/*    />*/}
                {/*  </div>*/}
                {/*</div>*/}

                {/* Product Details */}
                <div className="w-full md:w-1/2 lg:pl-4 md:pl-4 ">
                    <h2 className="text-2xl font-bold ff-text">Unique Product - {product?.product?.name}</h2>
                    <div className="flex items-center"></div>

                    {/* id Section */}
                    <div className="mt-6 space-y-4">
                        <UniqueProductDetailSection title="Serial Number" detail={product?.serial_number}/>
                        <UniqueProductDetailSection
                            title="Custom Price"
                            detail={`${product?.custom_price},-`}
                        />
                        <UniqueProductDetailSection
                            title="Status Payment"
                            detail={`${product?.status_payment}`}
                        />
                        <UniqueProductDetailSection
                            title="Status Shipping"
                            detail={`${product?.status_shipping}`}
                        />
                    </div>
                </div>

                {/* Product Image and Title */}
                <div className="w-full md:w-1/2 lg:pl-4 md:pl-4 ">
                    <div className="flex justify-center">
                        {/* id Section */}
                        <h3 className="text-2xl font-bold ff-text">Case and Vessel</h3>
                        <div className="mt-6 space-y-4">
                            {product?.case ? <div>
                                <UniqueProductDetailSection title="Case Manager" detail={product?.case?.case_manager?.first_name + " " + product?.case?.case_manager?.last_name }/>
                                <UniqueProductDetailSection
                                    title="Vessel"
                                    detail={`${product?.case?.vessel?.name}`}
                                />
                                <UniqueProductDetailSection
                                    title="Vessel IMO"
                                    detail={`${product?.case?.vessel?.imo}`}
                                />
                                <UniqueProductDetailSection
                                    title="Fleet Owner"
                                    detail={`${product?.case?.vessel?.vessel_owner?.name}`}
                                />
                            </div> : <div>Product not assigned to case</div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* Description Section */}
            {/*<div className="py-4">*/}
            {/*  <UniqueProductDetailSectionDescription*/}
            {/*    title="Description"*/}
            {/*    detail={product?.description}*/}
            {/*  />*/}
            {/*</div>*/}
        </div>
    );
};

export default UniqueProductInfoComponent;