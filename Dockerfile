FROM nginx:latest
COPY . /usr/share/nginx/html 
EXPOSE 80
LABEL maintainedby="saket"
CMD ["nginx", "-g", "daemon off;"]