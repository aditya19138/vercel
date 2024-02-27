# vercel-clone
Deploy react app from github to internet in a single click
Tech Used :- NodeJs, AWS S3, Redis queue, react

## Setup

**Create .env file**
```sh
ACCESS_KEY_ID = "<YOUR_ACCESS_KEY_ID>"
SECRET_ACCESS_KEY = "<YOUR_SECRET_ACCESS_KEY>"
ENDPOINT = "<YOUR_ENDPOINT>"
```

**Start upload service**
```sh
cd upload
npm i
npx tsc -b
node dist/index.js
```
**Start deploy service**
```sh
cd deploy
npm i
npx tsc -b
node dist/index.js
```
**Start request-handler service**
```sh
cd request-handler
npm i
npx tsc -b
node dist/index.js
```
**Start frontend**
```sh
cd frontend
npm install
npm run dev
```

