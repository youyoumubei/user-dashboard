FROM nginx:latest

RUN /bin/cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone

# RUN source ~/.bashrc

# RUN npm install --registry=https://registry.npm.taobao.org

# RUN npm run build
# RUN mkdir -p /data/logs/nginx

# COPY dist /data/app/ts-ui-dashboard/dist/

# COPY nginx.conf /usr/local/nginx/conf/conf.d/

# COPY nginx.conf /etc/nginx/conf/conf.d/

COPY nginx.conf /etc/nginx/conf.d/nginx.conf

COPY dist/ /usr/share/nginx/html/