# Use an official Nginx runtime as a parent image
FROM nginx:latest

# Set the working directory inside the container
WORKDIR /usr/share/nginx/html

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy the built Angular application to the container's working directory
COPY dist/GDMS .

# Expose the port that Nginx will listen on (default is 80)
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
