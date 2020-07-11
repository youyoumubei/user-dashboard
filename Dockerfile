FROM nginx:latest
# FROM openresty/openresty:trusty

RUN /bin/cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone
RUN mkdir -p /data/logs/nginx

COPY nginx.conf /etc/nginx/conf.d/nginx.conf
# COPY nginx.conf /usr/local/openresty/nginx/conf/nginx.conf

COPY dist/ /usr/share/nginx/html/