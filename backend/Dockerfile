FROM python:3.13-slim

# Set the working directory in the container
WORKDIR /code

# Copy requirements.txt into the container
COPY ./requirements.txt /code/requirements.txt

# Install system dependencies
RUN apt-get update && apt-get install -y libpq-dev gcc

# Install dependencies
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Create non-root user and set permissions
RUN useradd -m -u 1000 appuser && \
    mkdir -p /uploads && \
    chown -R appuser:appuser /uploads && \
    chmod -R 755 /uploads

# Copy the application code into the container
COPY ./app .

# Expose the port FastAPI will run on
EXPOSE 8000

# Command to run the app using Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

