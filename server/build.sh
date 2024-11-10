#!/usr/bin/env bash
# exit on error
set -o errexit

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate
python manage.py createsuperuser --noinput

# Collect static files
python manage.py collectstatic --no-input