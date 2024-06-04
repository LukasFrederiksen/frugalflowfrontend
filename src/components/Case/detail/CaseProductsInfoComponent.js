import React from "react";

const CaseProductsInfoComponent = ({productsData}) => {
    return (
        <div className="font-medium ff-text rounded-lg p-3 bg-ff_background_light dark:bg-ff_background_dark">
            <h2 className="font-medium text-sm mb-3 text-left">Products</h2>
            {productsData ?
                <div>AAAAAAA</div> : <div>
                    <p className="text-justify text-sm font-extralight">No Products added to this case yet</p>
                </div>}
        </div>
    );
};

export default CaseProductsInfoComponent;
