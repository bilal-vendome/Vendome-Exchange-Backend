FROM node:22-alpine
WORKDIR /usr/src/app
RUN apk add --no-cache openssl libc6-compat
COPY package*.json ./
RUN npm install --legacy-peer-deps --ignore-scripts
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]