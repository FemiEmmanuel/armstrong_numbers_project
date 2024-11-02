import React, { useState } from "react";
import { useGetAttemptsQuery } from "../store/api";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import LoadingSpinner from "./LoadingSpinner";

function Attempts({ darkMode }) {
  const [page, setPage] = useState(1);
  const {
    data: attemptsData,
    isLoading,
    isFetching,
    error,
  } = useGetAttemptsQuery(page);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (isLoading) {
    return <LoadingSpinner darkMode={darkMode} />;
  }

  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  const { attempts, pagination } = attemptsData || {
    attempts: [],
    pagination: {},
  };
  const { totalCount, totalPages, nextPage, previousPage } = pagination;

  return (
    <div>
      <h2
        className={`font-bold mb-4 ${
          darkMode ? "text-white" : "text-[#003366]"
        }`}
      >
        Your Attempts
      </h2>
      {attempts.length > 0 ? (
        <>
          <div className="overflow-x-auto w-full md:w-full lg:w-[70%] shadow-md">
            <table
              className={`w-full ${darkMode ? "bg-gray-800" : "bg-white"}`}
            >
              <thead>
                <tr className={darkMode ? "bg-gray-700" : "bg-gray-100"}>
                  <th
                    className={`p-2 text-left ${
                      darkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Number
                  </th>
                  <th
                    className={`p-2 text-left ${
                      darkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Result
                  </th>
                  <th
                    className={`p-2 text-left ${
                      darkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody>
                {attempts.map((attempt) => (
                  <tr
                    key={attempt.id}
                    className={`border-b ${
                      darkMode
                        ? "border-gray-700 hover:bg-gray-700"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <td
                      className={`p-2 text-sm ${
                        darkMode ? "text-gray-200" : "text-gray-900"
                      }`}
                    >
                      {attempt.attempted_number}
                    </td>
                    <td className="p-2 text-sm">
                      <span
                        className={`px-2 py-1 rounded ${
                          attempt.is_armstrong
                            ? darkMode
                              ? "bg-green-900 text-green-100"
                              : "bg-green-100 text-green-800"
                            : darkMode
                            ? "bg-red-900 text-red-100"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {attempt.is_armstrong ? "Armstrong" : "Not Armstrong"}
                      </span>
                    </td>
                    <td
                      className={`p-2 text-sm ${
                        darkMode ? "text-gray-200" : "text-gray-900"
                      }`}
                    >
                      {new Date(attempt.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div
              className={`p-2 flex justify-between items-center ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={!previousPage || isFetching}
                className="px-4 py-2 rounded transition-colors bg-[#003366] text-white hover:bg-[#FF6F61] disabled:bg-gray-300"
              >
                <FaChevronLeft />
              </button>
              <span className={darkMode ? "text-gray-200" : "text-gray-700"}>
                Page {page} of {totalPages}
              </span>
              <span className="text-[#FF6F61]">
                Total Attempts: {totalCount}
              </span>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={!nextPage || isFetching}
                className="px-4 py-2 rounded transition-colors bg-[#003366] text-white hover:bg-[#FF6F61] disabled:bg-gray-300"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </>
      ) : (
        <p className={`italic ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          No attempts yet. Try checking some numbers!
        </p>
      )}
    </div>
  );
}

export default Attempts;
