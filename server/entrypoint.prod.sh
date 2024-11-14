#!/bin/sh

# Wait for a moment to ensure all services are ready
sleep 2

# Create data directory if it doesn't exist
mkdir -p /app/data

# Run migrations
python manage.py migrate --no-input

# Start gunicorn
gunicorn --bind 0.0.0.0:8000 --workers 4 --threads 4 armstrong.wsgi:application