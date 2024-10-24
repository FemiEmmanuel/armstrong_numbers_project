def format_error_messages(errors):
    if isinstance(errors, dict):
        return {field: format_error_messages(error) for field, error in errors.items()}
    elif isinstance(errors, list):
        return errors[0] if errors else ""
    return str(errors)

def get_integrity_error_message(error_message):
    if 'username' in error_message.lower():
        return "Username already exists."
    elif 'email' in error_message.lower():
        return "Email already exists."
    return "This record already exists."