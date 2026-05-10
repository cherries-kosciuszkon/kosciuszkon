FROM node:22-alpine AS build
WORKDIR /app

# Kopiujemy package.json z folderu client/
COPY client/package*.json ./
RUN npm install

# Kopiujemy resztę plików z folderu client/
COPY client/ .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Zakładam, że nginx.conf leży w tym samym folderze co Dockerfile klienta
COPY docker/client/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]