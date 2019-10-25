FROM node

ENV workdir $HOME/src/
RUN mkdir $workdir

WORKDIR $workdir

COPY . .

RUN rm -rf dist; cd frontend; npm install; npm run build; mv dist ../dist
RUN cd backend; npm install

CMD [ "node", "backend/app.js" ]