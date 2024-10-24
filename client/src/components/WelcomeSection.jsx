const WelcomeSection = () => (
  <div className="w-full h-full bg-[#003366] flex items-center justify-center">
    <div className="text-white max-w-md">
      <h2 className="text-3xl font-bold mb-4">
        Welcome to the Armstrong Number Calculator
      </h2>
      <p className="mb-4">
        An Armstrong number is a number that is equal to the sum of its own
        digits raised to the power of the number of digits.
      </p>
      <p className="mb-4">
        For example, 153 is an Armstrong number because: 1^3 + 5^3 + 3^3 = 1 +
        125 + 27 = 153
      </p>
      <p className="mb-4">
        Use our calculator to check if a number is an Armstrong number or find
        all Armstrong numbers within a given range!
      </p>
      <p className="font-medium text-[#FF6F61]">
        Register or Sign in to get started
      </p>
    </div>
  </div>
);

export default WelcomeSection;
