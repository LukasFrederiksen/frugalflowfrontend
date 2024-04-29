import React from "react";

const InfoComponent = ({ title, text }) => {
  return (
    <div className="font-medium ff-text rounded-lg p-3 bg-ff_background_light dark:bg-ff_background_dark">
      <h2 className="font-medium text-sm mb-3 text-left">{title}</h2>
      <p className="text-justify text-sm font-extralight">{text}</p>
    </div>
  );
};

export default InfoComponent;
