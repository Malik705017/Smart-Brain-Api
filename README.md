# Smart-Brain-Backend
這是在 Udemy [The Complete Web Development Course](https://www.udemy.com/course/the-complete-web-developer-zero-to-mastery) 上學習所做的 side project。此為後端部分的實作。


## About
This is ther backend side of SmartBrain project, I use Express framework to establish the server, using Knex.js to connect the postgreSQL database.
- Server : Express
- Database : PostgreSQL (Knex.js to connect)

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

## How to use
1. Set up
- Clone this project
- `package.json` store the info of package I use
- Run `npm install` in the extracted folder
- Run `npm start` to view the project
