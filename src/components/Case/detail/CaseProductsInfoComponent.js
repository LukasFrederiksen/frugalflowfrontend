import React from "react";
import {FiMoreHorizontal} from "react-icons/fi";
import {useNavigate} from "react-router-dom";
import {StandardCurrency} from "../../../utils/utils";


function CaseProductsInfoComponent(productsData) {
    let products = productsData.productsData
    console.log(products)
    const navigate = useNavigate();

    const handleDetailsClick = (productId) => {
        navigate(`/unique-products/${productId}`);
    };

    return (
        <div className="font-medium ff-text rounded-lg p-3 bg-ff_background_light dark:bg-ff_background_dark">
            <h2 className="font-medium text-sm mb-3 text-left">Products</h2>
            {productsData ?
                <div className="unique-products-table-container">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead
                            className="text-s text-gray-700 uppercase bg-gray-50 dark:bg-ff_bg_sidebar_dark dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-4 w-[320px]">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-4 w-[260px]">
                                Serial number
                            </th>
                            <th scope="col" className="px-6 py-4 w-[260px]">
                                Status Shipping
                            </th>
                            <th scope="col" className="px-6 py-4 w-[260px]">
                                Status Payment
                            </th>
                            <th scope="col" className="px-6 py-4 w-[260px]">
                                Vessel
                            </th>
                            <th scope="col" className="px-6 py-4 w-[260px]">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-4 float-right">
                                Details
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {products &&
                            products.map((product, index) => (
                                <tr
                                    key={product.id}
                                    className={`text-left hover:bg-slate-300 hover:bg-opacity-50 dark:hover:bg-opacity-10
                                ${
                                        index !== product.length - 1
                                            ? "border-b border-gray-600"
                                            : ""
                                    }
                                ${
                                        index % 2 === 0
                                            ? "ff-table-row-odd"
                                            : "ff-table-row-even"
                                    }
                                `}
                                >
                                    <td
                                        className={`py-4 px-6 text-gray-900  dark:text-gray-300 w-[320px] ${
                                            product.isDeleted
                                                ? "text-opacity-25 dark:text-opacity-25"
                                                : ""
                                        }`}
                                    >
                                        {product.product.name}
                                    </td>
                                    <td
                                        className={`py-4 px-6 text-gray-900 dark:text-gray-300 w-[260px] ${
                                            product.isDeleted
                                                ? "text-opacity-25 dark:text-opacity-25"
                                                : ""
                                        }`}
                                    >
                                        {product.serial_number}
                                    </td>

                                    <td
                                        className={`py-4 px-6 text-gray-900  dark:text-gray-300 w-[260px] ${
                                            product.isDeleted
                                                ? "text-opacity-25 dark:text-opacity-25"
                                                : ""
                                        }`}
                                    >
                                        {product.status_shipping}
                                    </td>
                                    <td
                                        className={`py-4 px-6 text-gray-900  dark:text-gray-300 w-[260px] ${
                                            product.isDeleted
                                                ? "text-opacity-25 dark:text-opacity-25"
                                                : ""
                                        }`}
                                    >
                                        {product.status_payment}
                                    </td>
                                    <td
                                        className={`py-4 px-6 text-gray-900  dark:text-gray-300 w-[320px] ${
                                            product.isDeleted
                                                ? "text-opacity-25 dark:text-opacity-25"
                                                : ""
                                        }`}
                                    >
                                        {product.case === null ? "None" : product.case.vessel.name}
                                    </td>
                                    <td
                                        className={`py-4 px-6 text-gray-900  dark:text-gray-300 w-[320px] ${
                                            product.isDeleted
                                                ? "text-opacity-25 dark:text-opacity-25"
                                                : ""
                                        }`}
                                    >
                                        { product.custom_price === null ? `${product?.product?.cost_price} ${StandardCurrency}` : `${product?.custom_price} ${StandardCurrency}`}
                                    </td>
                                    <td className="py-4 mr-4 items-center justify-center float-right">
                                        <button onClick={() => handleDetailsClick(product.unique_product_id)}>
                                            <FiMoreHorizontal className="h-5 w-5 text-black dark:text-white"/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                : <div>
                    <p className="text-justify text-sm font-extralight">No Products added to this case yet</p>
                </div>}
        </div>
    );
}

export default CaseProductsInfoComponent;
