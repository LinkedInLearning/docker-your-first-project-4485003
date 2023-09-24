# Use an official Python runtime as the base image
FROM python:3.12-rc-bookworm

#VOLUME /app/data

# Set the working directory in the container to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install the required packages
RUN pip install --no-cache-dir -r requirements.txt

# Set the environment variable for Flask
ENV FLASK_APP=app.py

# Add labels to the image
# LABEL Formatting Option 1
LABEL "com.example.vendor"="Big Star Collectibles"
LABEL version="1.0"
LABEL description="The Big Star Collectibles Website \
using the Python base image."

# LABEL Formatting Option 2
# LABEL "com.example.vendor"="Big Star Collectibles" version="1.0" description="The Big Star Collectibles Website \
# using the Python base image."

# LABEL Formatting Option 3
# LABEL "com.example.vendor"="Big Star Collectibles" \
# version="1.0" \
# description="The Big Star Collectibles Website \
# using the Python base image."

# Run the command to start the Flask application
CMD ["flask", "run", "--host=0.0.0.0"]