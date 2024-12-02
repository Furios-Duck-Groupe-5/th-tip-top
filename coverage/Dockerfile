# Use an official Nginx image as the base image
FROM nginx:alpine

# Copy the entire website directory into the appropriate location inside the container
COPY . /usr/share/nginx/html/

# Expose port 80 (the default HTTP port)
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
