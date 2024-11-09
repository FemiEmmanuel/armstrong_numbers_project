
FROM python:3.11.10-alpine3.20
WORKDIR /app

RUN apk add --no-cache \
    gcc \
    musl-dev \
    python3-dev

#Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY . .

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]