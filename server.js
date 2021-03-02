import express from 'express' // 建立 server
import cors from 'cors' // 讓前後端能溝通
import knex from 'knex' // connect server to database
import bcrypt from 'bcrypt' // hash password

import registerHandler from './controllers/register.js'
import signinHandler from './controllers/signin.js'
import getProfileHandler from './controllers/profile.js'
import { entriesHandler, apiCallHandler}  from './controllers/image.js'


const db = knex({
    client: 'pg', //postgres
    connection: {
        host : '127.0.0.1',
        user : 'fhh1482',
        password : '',
        database : 'smart-brain' //our db name
    }
});

// return a promise
// db.select('*').from('users').then(console.log)

const app = express()


// parse json
app.use(express.json());

// 
app.use(cors());

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

app.listen(3000, ()=>{
    console.log('app is runnung on port 3000')
})


/*
/ --> res = this is working
/singin --> POST = success/fail
/register --> POST = user
/profile/:userID --> GET = user
/image --> PUT = user
*/