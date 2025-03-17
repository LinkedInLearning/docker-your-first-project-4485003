#Use the official python runtime as the base image
FROM 3.13-bookworm

#Set the working directory in the container to /app
WORKDIR /app

#Copy the current directory contents into the container at /app
COPY . /app

#Install the required packages
RUN pip Install --no-cache-dir -r requirements.txt

#Set the enviorenment varibale for Flask
ENV Flask_APP=app.py

#Run the command to start the Flask application
CMD [ "flask", "run", "--host=0.0.0.0" ]