FROM node:12
WORKDIR /app


COPY package-lock.json .
COPY package.json .
RUN npm install

COPY ./bin/ ./bin/
COPY ./models/ ./models/
COPY ./public/ ./public/
COPY ./routes/ ./routes/
COPY ./routes/helpers/ ./routes/helpers/
COPY ./views/ ./views/
COPY .env .
COPY app.js .

EXPOSE 3000
CMD npm start