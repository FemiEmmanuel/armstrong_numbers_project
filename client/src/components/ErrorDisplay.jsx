import React from "react";

const ErrorDisplay = ({ error, field = null }) => {
  if (!error || !error.data || !error.data.detail) return null;

  const { detail } = error.data;

  if (field && typeof detail === "object" && detail[field]) {
    return <p className="text-red-500 text-sm mt-1">{detail[field]}</p>;
  }

  if (!field && typeof detail === "string") {
    return <p className="text-red-500 mt-2 text-center">{detail}</p>;
  }

  if (!field && typeof detail === "object" && !Array.isArray(detail)) {
    return (
      <ul className="text-red-500 mt-2 text-center list-disc list-inside">
        {Object.entries(detail).map(([fieldName, message]) => (
          <li key={fieldName}>{`${fieldName}: ${message}`}</li>
        ))}
      </ul>
    );
  }

  return null;
};

export default ErrorDisplay;
