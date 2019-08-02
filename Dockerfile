FROM ubuntu:19.04
WORKDIR /opt

# Install dependencies
RUN apt-get update -qq && \
  apt-get install -qq \
  git \
  nodejs \
  npm

# Install emscripten sdk
RUN git clone https://github.com/emscripten-core/emsdk && \
  cd emsdk && \
  ./emsdk install latest && \
  ./emsdk activate latest

# Install cloudstorage-js
RUN git clone https://github.com/lemourin/cloudstorage-js && \
  cd cloudstorage-js && \
  echo 'EMSDK_HOME=/opt/emsdk \n HOSTNAME=http://localhost:8000' > .env && \
  npm install && \
  npm run build:all

# Install http server
RUN npm install -g http-server

# Start app server
CMD http-server /opt/cloudstorage-js
