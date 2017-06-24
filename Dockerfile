FROM nginx:alpine


RUN mkdir -p /etc/nginx/logs \
  && touch /etc/nginx/logs/myblog.access.log \
  && touch /etc/nginx/logs/myblog.error.log \
  && ln -sf /dev/stdout /etc/nginx/logs/myblog.access.log \
  && ln -sf /dev/stderr /etc/nginx/logs/myblog.error.log


COPY release /data/myblog
COPY myblog.docker.conf /etc/nginx/conf.d/myblog.conf


CMD nginx -g 'daemon off;'
