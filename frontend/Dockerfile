# Use an official Nginx base image
FROM nginx:alpine

# replace nginx default configuration with our custom one by copying into it
COPY default.conf /etc/nginx/nginx.conf

# Copy your frontend application files into the Nginx document root
COPY ./ /usr/share/nginx/html

# Expose port 80 for the Nginx web server
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]