# Smart-Brain-Backend
這是在 Udemy [The Complete Web Development Course](https://www.udemy.com/course/the-complete-web-developer-zero-to-mastery) 上學習所做的 side project。此為後端部分的實作。


## About
This is ther backend side of SmartBrain project, I use Express framework to establish the server, using Knex.js to connect the postgreSQL database.
- Server : Express
- Database : PostgreSQL (Knex.js to connect)
- Secutity ensurrance : Hash (to save password safely)

## How to use
1. Set up
- Clone this project
- `package.json` store the info of package I use
- Run `npm install` in the extracted folder

2. Get the API key
> Due to security concern, I set the API key in the cloud, if you want to run the server in localhost, please set your key.
- Go to [clarifai.com](https://www.clarifai.com/) to register a account and get the face detection API key
- Go to `image.js` file, change the apiKey into yours
```javascript
// You must add your own API key here from Clarifai.
const app = new Clarifai.App({
    apiKey: process.env.API_CLARIFAI
});
```
- Run `npm start` to view the project


## RESTful API
In the `server.js` file, you can see 5 API calls, and I wrote them in the `controllers` file

```javascript
// 登入，回傳 user 基本資訊（id, name, email, entires, joined）
app.post('/signin',(req,res) => {signinHandler(req,res,bcrypt,db)})

// 註冊，回傳 user 基本資訊（id, name, email, entires, joined） 
app.post('/register', (req,res) => {registerHandler(req,res,bcrypt,db)}) 

// 回傳符合 id 的 user 資料
app.get('/profile/:id',(req,res)=> {getProfileHandler(req,res,db)})

// 更新 entries 數量
app.put('/image',(req,res) => {entriesHandler(req,res,db)})

// 呼叫 clarifai api
app.post('/imageurl',(req,res) => {apiCallHandler(req,res)})
```

## Table Structure in Database
There are 2 tables in database:
- users: store the basic info of users

 id | name  |        email        | entries |         joined          
----+-------+---------------------+---------+-------------------------
  1 | brian | brian@gmail.com     |       0 | 2021-03-02 14:40:52.618
  2 | david | fhh1482@gmail.com   |       1 | 2021-03-02 14:42:04.472
  3 | brian | brian0205@gmail.com |       2 | 2021-03-02 15:01:28.642

- logins: store the security info of users

 id |                             hash                             |        email        
----+--------------------------------------------------------------+---------------------
  1 | $2b$10$bmEfEMozXvK1RDf.9LQb8OUj5P6glU1PRHS2aw9UkTUnlIxKD/Kg2 | brian@gmail.com
  2 | $2b$10$ntHZPMlWvoRVT6HhQqM0WezOZSyb7UsNRqJtA/dUm5SufSJe1A1xu | fhh1482@gmail.com
  3 | $2b$10$7aS0jdCXX6I8eIv0QrnOguDBXH0eQ9AeD.5kRDiTMOOsRDG3WL5IW | brian0205@gmail.com
