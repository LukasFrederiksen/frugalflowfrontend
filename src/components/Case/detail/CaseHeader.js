import React from "react";

export default function CaseHeader({ title, caseId }) {
  return (
    <>
      <div className="text-2xl font-bold mb-2 ff-text">{title}</div>
      <div className="text-lg font-medium ff-text">Case ID: {caseId}</div>
    </>
  );
}
