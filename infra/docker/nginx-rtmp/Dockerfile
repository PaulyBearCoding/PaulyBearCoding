FROM alfg/nginx-rtmp:latest

COPY nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /var/hls && chmod 777 /var/hls

EXPOSE 1935
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
