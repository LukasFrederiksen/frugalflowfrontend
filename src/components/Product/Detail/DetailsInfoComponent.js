import React from "react";
import DetailSection from "./DetailsSection";
import DetailSectionDescription from "./DetailsDescription";

const ProductInfoPage = ({ product }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap bg-ff_bg_continer_light dark:bg-ff_bg_continer_dark">
        {/* Product Image and Title */}
        <div className="w-full md:w-1/2 md:border-b-0">
          <div className="flex justify-center">
            <img
              src="https://softsmarttech.co.za/wp-content/uploads/2018/06/image-not-found-1038x576.jpg"
              alt={product?.name}
              className="rounded-md"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 lg:pl-4 md:pl-4 ">
          <h2 className="text-2xl font-bold ff-text">{product?.name}</h2>
          <div className="flex items-center"></div>

          {/* id Section */}
          <div className="mt-6 space-y-4">
            <DetailSection title="Sku" detail={product?.sku} />
            <DetailSection
              title="Cost Price"
              detail={`${product?.cost_price},-`}
            />
            <DetailSection
              title="Retail Price"
              detail={`${product?.retail_price},-`}
            />
            <DetailSection
              title="Stock Overview"
              detail={`${product?.qty} units`}
            />
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="py-4">
        <DetailSectionDescription
          title="Description"
          detail={product?.description}
        />
      </div>
    </div>
  );
};

export default ProductInfoPage;
