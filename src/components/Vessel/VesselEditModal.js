import React, { useState, useEffect } from "react";
import HttpClient from "../../Services/HttpClient";
import { showSuccessToast } from "../common/toast";
import { baseUrl } from "../../const";
import { toast } from "react-toastify";

const httpClient = new HttpClient(baseUrl);

export default function VesselEditModal({id, onClose, updateTableData}) {
    const [name, setName] = useState("");
    const [imo, setImo] = useState("");
    const [type, setType] = useState("");
    const [isDeleted, setIsDeleted] = useState(null);

    const toggleIsDeleted = () => {
        setIsDeleted(isDeleted === "true" ? "false" : "true");
    };

    useEffect(() => {
            if (!id) {
                toast.error("No vessel selected")
                return;
            }

        const fetchVesselData = async () => {
            try {
                const response = await httpClient.get(`api/vessels/${id}`);
                const data = response.data.vessel;
                setName(data.name);
                setImo(data.imo);
                setType(data.type);
                setIsDeleted(data.isDeleted || data.isDeleted === "true" ? "true" : "false");
            } catch (error) {

            }
        };
        fetchVesselData();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("imo", imo);
        formData.append("type", type);
        formData.append("isDeleted", isDeleted);

        try {
            const originalDataResponse = await httpClient.get(`api/vessels/${id}`);
            const originalData = originalDataResponse.data.vessel;
            const response = await httpClient.put(`api/vessels/${id}`, formData);

        if (response.data) {
            const changes = [];
            
            if (name !== originalData.name) {
                changes.push(`Name`);
            }
            if (imo !== originalData.imo) {
                changes.push(`IMO`);
            }
            if (type !== originalData.type) {
                changes.push(`Type`);
            }

            if (changes.length > 0) {
                showSuccessToast("Vessel changes: " + changes.join(", "));
            }
                onClose();
                setTimeout(() => {
                    updateTableData(id, formData);
                  }, 800);
            }
        } catch (error) {
            
        }
    };

    return (
        <div className="backdrop-blur-sm fixed inset-0 flex items-center justify-center z-50 bg-gray-600/30 dark:bg-black/30">
            <div className="bg-white w-full max-w-lg mx-auto p-6 rounded-lg shadow-lg z-50 dark:bg-ff_bg_continer_dark dark:text-white dark:shadow-dark">
                <form>
                    <p className="text-xl font-bold text-black dark:text-white">
                        Edit Vessel:
                    </p>
                    <p className="text-xl text-black dark:text-white mb-[30px]">
                        {name}
                    </p>
                    <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="mb-1 block text-sm text-left font-medium text-gray-700 dark:text-white"
                    > Name
                    </label>
                    <input 
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 p-2 border rounded w-full text-gray-700"
                        placeholder=""
                    />
                    </div>
                    <div className="mb-4">
                    <label
                        htmlFor="imo"
                        className="mb-1 block text-sm text-left font-medium text-gray-700 dark:text-white"
                    > Imo
                    </label>
                    <input 
                        type="text"
                        name="imo"
                        id="imo"
                        required
                        value={imo}
                        onChange={(e) => setImo(e.target.value)}
                        className="mt-1 p-2 border rounded w-full text-gray-700"
                        placeholder=""
                    />
                    </div>
                    <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="mb-1 block text-sm text-left font-medium text-gray-700 dark:text-white"
                    > Type
                    </label>
                    {/* <input 
                        type="text"
                        name="type"
                        id="type"
                        required
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="mt-1 p-2 border rounded w-full text-gray-700"
                        placeholder=""
                    /> */}
                    <select
                        id="type"
                        name="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="ff-input w-full"
                    >
                        <option value="">Select type</option>
                        <option value="Container Ship">Container ship</option>
                        <option value="Tanker Ship">Tanker ship</option>
                        <option value="Passenger Ship">Passenger ship</option>
                        <option value="War Ship">War ship</option>
                        <option value="Unspecified">Unspecified</option>
                    </select>
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="mb-2 block text-sm text-left font-medium text-gray-700 dark:text-white"
                        > Status
                        </label>
                        <button
                            type="button"
                            className={`mr-2 mb-[30px] px-2 py-2 rounded-md text-white font-semibold
                            ${isDeleted === "false"
                                ? "bg-lime-600 hover:bg-lime-700 text-black font-semibold"
                                : "bg-rose-700 hover:bg-rose-800 text-black font-semibold"}
                            `}
                            onClick={toggleIsDeleted}
                        >
                            {isDeleted === "true" ? "Inactive" : "Active"}
                        </button>
                    </div>
                    <button
                        type="button"
                        className="px-4 py-2 rounded-md bg-customYellow text-black font-semibold hover:bg-customYellowDark"
                        onClick={handleSubmit}
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        className="ml-2 px-4 py-2 rounded-md bg-customYellow hover:bg-red-600 text-black font-semibold"
                        onClick={() => {
                            onClose();
                        }}
                    >
                        Close
                    </button>
                </form>
            </div>
        </div>
    );
};