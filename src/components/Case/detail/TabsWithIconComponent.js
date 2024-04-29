import React, { useState } from "react";

export function TabsWithIconComponent({ title, caseId, tabs }) {
  const [activeTab, setActiveTab] = useState(tabs[0].value);

  return (
    <div>
      {title && caseId ? (
        <>
          <div>
            <div className="text-2xl font-medium ff-text">{title}</div>
            <div className="text-xs font-medium ff-text mb-1">
              Id: #{caseId}
            </div>
          </div>
        </>
      ) : null}

      <div className="grid grid-cols-2 lg:flex gap-2 mb-2 lg:mb-0 lg:justify-end">
        {tabs.map(({ label, value, icon }) => (
          <button
            key={value}
            className={`w-full lg:w-auto py-2 px-4 transition duration-300 ease-in-out rounded lg:rounded-t-lg lg:rounded-b-none text-sm ${
              activeTab === value
                ? "bg-ff_bg_continer_light dark:bg-ff_bg_continer_dark text-white lg:text-white lg:font-medium"
                : "text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 lg:rounded-none lg:hover:bg-transparent"
            }`}
            onClick={() => setActiveTab(value)}
          >
            <div className="flex items-center gap-2 justify-center">
              {icon}
              {label}
            </div>
          </button>
        ))}
      </div>
      <div
        className={`p-4 bg-ff_bg_continer_light dark:bg-ff_bg_continer_dark rounded-lg ${
          activeTab === tabs[tabs.length - 1].value ? "lg:rounded-tr-none" : ""
        }`}
      >
        {tabs.map(
          ({ value, component }, index) => activeTab === value && component
        )}
      </div>
    </div>
  );
}
