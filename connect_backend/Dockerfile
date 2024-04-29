# Use an official Python runtime as a parent image
FROM python:3.11

# Set environment variables for Python
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN apt-get update && apt-get install -y netcat-traditional && apt-get install dos2unix

RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Define the command to run your application
RUN dos2unix /app/init_server.sh && chmod 777 /app/init_server.sh

CMD ["/app/init_server.sh"]
