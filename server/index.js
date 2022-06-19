import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import postRoutes from './routes/items.js';
import cors from 'cors';
const app = express();


const CONNECTION_URL = 'mongodb+srv://liorbendahan:CXEdbkXMZBKdfcUj@cluster0.htsazjm.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;


//Handeling our db, mongoose.
const Schema = mongoose.Schema;
//Creating our first Schema, a table for users.
const userSchema = new Schema({
    username: {type: 'string', required:true},
    password: {type: 'string', required:true}
});
const UserModule = mongoose.model('users', userSchema);
app.use(bodyParser.json({limit: "30mb", extended:true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended:true}));
app.use(cors());
mongoose.connect(CONNECTION_URL,{ useNewUrlParser: true, useUnifiedTopology:true})
    .then(() => app.listen(PORT, () => console.log("server running")))
    .catch((error) => console.log(error.message));

//Handeling the get,post request:

/* Here we get a new user from the front,
and then we add him to our db */
app.post('/addNewUser',async (req,res) =>{
    const name = req.body.user
    const password = req.body.password
    const user = {username: name, password: password};
    const newUser = new UserModule(user);
    try {
        await newUser.save(async (err,newUserResult) => {
            console.log('New user created')
        });
    } catch(err) {
        console.log(err);
    }
});

/* Here we send to the front all the current users from the db */
app.get('/getUsers', (req,res) =>{
    UserModule.find({}, (err,result)=>{
        if (err) {

        } else {
            res.json(result);
        }
    })
})






