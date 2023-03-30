FROM node:16

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY tsconfig.json ./
COPY public public
COPY src src
COPY ckeditor ckeditor
COPY .eslintrc.js ./

CMD ["npm", "start"]