# Use an official Python runtime as the base image
FROM python:3.12-rc-bookworm

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install the required packages
RUN pip install --no-cache-dir -r requirements.txt

# Set the environment variable for Flask
ENV FLASK_APP=app.py

CMD ["flask", "run", "--host=0.0.0.0"]