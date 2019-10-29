FROM node

ENV workdir $HOME/src/
RUN mkdir $workdir

WORKDIR $workdir
COPY . .
RUN rm -rf dist

WORKDIR $workdir/frontend/
RUN npm install; npm run build; mv dist ../dist

WORKDIR $workdir/backend/
RUN npm install

CMD [ "node", "app.js" ]

