# pencil-backend-test

Pencil Backend Test

### Prepare application for first run :

1.  run `npm install`
2.  make sur to add `.env` file to the root directory and it must contains:
    - DB_PROTOCOL
    - DB_HOST
    - DB_USER
    - DB_PASSWORD
    - DB_NAME
3.  starting the application :
    - development mode : `npm run dev`
    - production mode : `npm run build && npm start`

### Routes :

##### Topics :

- paginate questions
  `/api/v1/topics?page=0&pagesize=10`
- get question by id
  `/api/v1/topics{ObjectId}`

##### Questions :

- find questions of a given topic :
  `/api/v1/questions/search?q={TOPIC NAME}`
- paginate questions
  `/api/v1/questions?page=0&pagesize=10`
- get question by id
  `/api/v1/questions/{ObjectId}`
