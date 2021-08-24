FROM perl:5.32.1-stretch as build

# install latexml CLI
RUN cpanm git://github.com/brucemiller/LaTeXML.git

FROM node:14-stretch

# Create app directory
WORKDIR /usr/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# RUN npm install
# If you are building your code for production
RUN npm ci --only=production

# Bundle app source
COPY . .

COPY --from=build . .

USER node
EXPOSE 5000
CMD [ "npm", "run", "start" ]
