const SubmitButton = ({ isLoading, label }) => (
  <button
    type="submit"
    disabled={isLoading}
    className={`w-full p-3 text-white bg-[#003366] rounded hover:bg-[#FF6F61] transition duration-300 font-bold ${
      isLoading ? "opacity-50 cursor-not-allowed" : ""
    }`}
  >
    {isLoading ? `${label}ing...` : label}
  </button>
);

export default SubmitButton;
