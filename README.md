# Armstrong Number Calculator

This web application allows users to check if a number is an Armstrong number and find Armstrong numbers within a given range. It's built with Django and provides user registration, profile management, and feedback submission features.

## Features

- User Registration and Authentication
- User Profile Management
- Armstrong Number Calculation
  - Check if a single number is an Armstrong number
  - Find Armstrong numbers within a specified range
- User Feedback Submission
- Responsive Design

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/armstrong-number-calculator.git
   cd armstrong-number-calculator
   ```

2. Create a virtual environment and activate it:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

4. Run migrations:
   ```
   python manage.py migrate
   ```

5. Create a superuser:
   ```
   python manage.py createsuperuser
   ```

6. Run the development server:
   ```
   python manage.py runserver
   ```

7. Open a web browser and navigate to `http://127.0.0.1:8000/`

## Usage

- Register a new account or log in with existing credentials.
- Use the calculator to check individual numbers or find Armstrong numbers within a range.
- Update your profile information as needed.
- Submit feedback about the application.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.