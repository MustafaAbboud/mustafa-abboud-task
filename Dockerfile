FROM node:16

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]

# docker build -t my-app:v1 .
# docker run --rm -it -p 3000:3000 --name my-site my-app:v1