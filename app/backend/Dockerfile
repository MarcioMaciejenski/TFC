FROM node:16.14-alpine

WORKDIR /app-backend

EXPOSE 3001

COPY . .

COPY package* .

RUN npm install && npm run build

CMD ["npm", "start"]

