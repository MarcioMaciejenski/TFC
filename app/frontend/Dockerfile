FROM node:16.14-alpine

WORKDIR /app-frontend

EXPOSE 3000

COPY . .

COPY package*.json /app-frontend/

RUN npm install && npm run build

CMD ["npm", "start"]
