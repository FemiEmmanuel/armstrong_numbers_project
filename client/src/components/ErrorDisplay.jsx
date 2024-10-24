import React from "react";

const ErrorDisplay = ({ error, field = null }) => {
  // If no error, don't render anything
  if (!error) return null;

  // Handle field-specific errors when field prop is provided
  if (field) {
    // Check if error has data.errors structure (form validation errors)
    if (error.data?.errors?.[field]?.[0]) {
      return (
        <p className="mt-1 text-sm text-red-600">
          {error.data.errors[field][0]}
        </p>
      );
    }
    // Check for field-specific detail errors
    if (error.data?.detail?.[field]) {
      return (
        <p className="mt-1 text-sm text-red-600">{error.data.detail[field]}</p>
      );
    }
    return null;
  }

  // Handle general errors when no field is specified
  if (!field) {
    // Check for string detail
    if (typeof error.data?.detail === "string") {
      return <p className="mt-1 text-sm text-red-600">{error.data.detail}</p>;
    }
    // Check for object detail
    if (
      typeof error.data?.detail === "object" &&
      !Array.isArray(error.data?.detail)
    ) {
      return (
        <div className="mt-1">
          {Object.entries(error.data.detail).map(([fieldName, message]) => (
            <p key={fieldName} className="text-sm text-red-600">
              {`${message}`}
            </p>
          ))}
        </div>
      );
    }
    // Check for general errors array
    if (error.data?.errors && typeof error.data.errors === "object") {
      return (
        <div className="mt-1">
          {Object.entries(error.data.errors).map(([fieldName, messages]) => (
            <p key={fieldName} className="text-sm text-red-600">
              {`${messages[0]}`}
            </p>
          ))}
        </div>
      );
    }
  }

  return null;
};

export default ErrorDisplay;
