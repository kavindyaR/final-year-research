FROM python:3.12.9-alpine3.21

WORKDIR /app

RUN python -m pip install --upgrade --force-reinstall pip

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt && \
    pip install gunicorn

COPY . .

EXPOSE 5000

ENV FLASK_ENV=production

RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]