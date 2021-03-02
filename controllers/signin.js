const signinHandler = (req,res,bcrypt,db)=>{
    if(!req.body.email || !req.body.password){
        return res.status(400).json('incorrect form submission')
    }

    db.select('email','hash').from('login')
        .where('email','=',req.body.email)
        .then(data => {
            const {hash, email} = data[0]
            const password = req.body.password
            const isValid = bcrypt.compareSync(password, hash);
            if(isValid){
                return( // return 是必須的，要讓外面的 db 知道
                    db.select('*').from('users').where('email','=',email)
                    .then(user => {
                    if(user.length)
                        res.json(user[0])
                    else
                        res.status(400).json('unable to get user') // login table 有資料但是 users table 沒資料
                    })
                )
            }else{
                res.status(400).json('wrong credentials')
            }
        })
        .catch(err => res.status(400).json('wrong credentials'))
}

export default signinHandler