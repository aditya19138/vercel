# vercel-clone
Deploy react app from github to internet in a single click.

Tech Used :- NodeJs, AWS S3, Redis queue, react
<img width="1280" alt="Screenshot 2024-02-27 at 3 36 45 PM" src="https://github.com/aditya19138/vercel/assets/74404047/1faefc47-d824-436b-a7a1-ac6a0a15a675">
<img width="1280" alt="Screenshot 2024-02-27 at 6 23 03 PM" src="https://github.com/aditya19138/vercel/assets/74404047/7fab4f69-1e63-4a41-a5b2-547afff0bec2">
<img width="1280" alt="Screenshot 2024-02-27 at 6 23 13 PM" src="https://github.com/aditya19138/vercel/assets/74404047/35d470c8-e53a-4c8c-8a35-bfc2efbad9cf">


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

