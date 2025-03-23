FROM python:3.13.2-alpine3.21

WORKDIR /app

RUN python -m pip install --upgrade --force-reinstall pip

COPY requirements.txt .
RUN python -m pip install --no-cache-dir -r requirements.txt && \
    python -m pip install gunicorn

COPY . .

EXPOSE 5002

ENV FLASK_ENV=production

RUN chmod +x /app/entrypoint.sh && \
    sed -i 's/\r$//' entrypoint.sh

ENTRYPOINT ["/app/entrypoint.sh"]

# CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:${PORT:-5000}", "wsgi:app"]