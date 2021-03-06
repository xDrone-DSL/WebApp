# WebApp [![Build Status](https://travis-ci.com/xDrone-DSL/WebApp.svg?branch=master)](https://travis-ci.com/xDrone-DSL/WebApp)

The WebApp that provides kids a new experience of learning coding
with drones.

## Compiles and hot-reloads for development locally

The following instructions will run the backend and frontend with
hot-reloads enabled at the same time.

### Dev quickstart

Make sure you have a `.env.local`, which will enable the dev mode in your backend folder.
You can make a copy from the `.env.local.sample`.

```
cp backend/.env.local.sample backend/.env.local
```

To start dev backend and serve frontend at the same time
```
npm run dev
```


### Backend

To run the backend, go to `backend` directory.

```
cd backend
```

Install all the dependencies.

```
npm run clean-install
```

Make sure you have a `.env.local`, which will enable the dev mode.
You can make a copy from the `.env.local.sample`.

```

cp .env.local.sample .env.local

```

Run the backend.

```

node app.js

```

### Frontend

Go to `frontend` directory (assume going from `backend` dircetory).

```

cd ../frontend

```

Install all the dependencies.

```
npm run clean-install
```

Simply run the frontend with hot-reloads.

```

npm run serve

```

#### Run your tests

```

npm run test

```

#### Lints and fixes files

```

npm run lint

```

#### Run your unit tests

```

npm run test:unit

```

## Run WebApp as a whole

From the root directory of this repo, run the following commands.

```
chmod +x build.sh # if it's not executable
./build.sh
```
