# Site estático servido pelo Nginx
FROM nginx:1.27-alpine

# Render (e outros serviços) informam a porta pela variável PORT; padrão 80
ENV PORT=80
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

COPY index.html sobre.html resenha1.html resenha2.html telaInicial.html /usr/share/nginx/html/
COPY *.css /usr/share/nginx/html/
COPY img/ /usr/share/nginx/html/img/

# Commit que gerou a imagem, para conferir qual versão está publicada
ARG GIT_SHA=dev
RUN echo "$GIT_SHA" > /usr/share/nginx/html/version.txt

EXPOSE 80
