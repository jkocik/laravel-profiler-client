FROM node
RUN git clone https://github.com/jkocik/laravel-profiler-client /src
WORKDIR /src
RUN npm install 
RUN npm install concurrently --save
EXPOSE 8080 8099 1901
ENV PATH=$PATH:./node_modules/.bin/
CMD ["concurrently", "npm:ps", "npm:pc" ]
