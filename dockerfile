# Use an official Python runtime as the base image
FROM python:3.12-rc-bookworm

# Set the working directory in the container to /app
WORKDIR /app 

# Copy the current directory contents into the container at /app
COPY . /app

# Install the required packages cache doent store on local
RUN pip install --no-cache-dir -r requirements.txt

# Set the environment variable for Flask name of flask
ENV FLASK_APP=app.py

# Run the command to start the F'lask application
CMD ["flask", "run", "--host=0.0.0.0"]
# tag image add itn to the the repository and push it to docker repository 
# docker image inspect id: gets detailes and config
