FROM node:16.14-alpine
WORKDIR /app-backend
COPY ./ .
EXPOSE 3001
RUN npm install
RUN npm run build
CMD [ "npm","run","dev" ]

