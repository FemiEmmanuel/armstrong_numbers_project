import React from "react";

const ErrorDisplay = ({ error }) => {
  if (!error) return null;

  if (error.data?.error) {
    
    return <p className="text-red-500 mt-2 text-center">{error.data.error}</p>;
  } else if (error.data?.details) {
    
    return (
      <ul className="text-red-500 mt-2 text-center list-disc list-inside">
        {Object.entries(error.data.details).map(([field, errors]) => (
          <li key={field}>{`${field}: ${errors.join(", ")}`}</li>
        ))}
      </ul>
    );
  }

  return (
    <p className="text-red-500 mt-2 text-center">
      An unexpected error occurred
    </p>
  );
};

export default ErrorDisplay;
