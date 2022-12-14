const express = require('express')
const app = express()
const port = 3000
const {User} = require('./models/User');

//application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));
//application/json
app.use(express.json());

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://ByeonggyuPark:76031628@clonecoding.pfohjjv.mongodb.net/?retryWrites=true&w=majority')
.then(() => console.log('MongoDB Connected..'))
.catch(err => console.log(err))

app.get('/', (req,res) => res.send('Hello World!'))

app.post('/register', (req,res) => {
    // 회원가입 할 때 필요한 정보들을 client에서 가져오면 db에 넣어줌
    
    const user = new User(req.body)
    user.save((err,userInfo) => {
        if (err) return res.json({success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})

app.listen(port,() => console.log(`Example app listening on port ${port}!`))