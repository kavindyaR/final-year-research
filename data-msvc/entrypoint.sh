#!/bin/sh

# Start Gunicorn
# exec gunicorn --bind 0.0.0.0:${PORT:5000} wsgi:app
exec gunicorn -w 4 -b 0.0.0.0:${PORT:-5000} wsgi:app
