FROM node:latest

ENV DATABASE_URL="file:./dev.db"

RUN mkdir -p /app/src

WORKDIR /app/src

COPY package.json .
COPY prisma .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
