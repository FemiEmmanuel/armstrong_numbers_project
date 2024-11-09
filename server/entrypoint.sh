#!/bin/sh

# Wait for a moment to ensure all services are ready
sleep 2

# Create data directory
mkdir -p /app/data

# Run migrations
python manage.py migrate

# Start development server
python manage.py runserver 0.0.0.0:8000