import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
const app = express();
import multer from 'multer';
import fs from 'fs';
const CONNECTION_URL = 'mongodb+srv://liorbendahan:CXEdbkXMZBKdfcUj@cluster0.htsazjm.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;

var current_username = ''
var current_username_password = ''
var post_image_name = ''

//Handeling our db, mongoose.
const Schema = mongoose.Schema;
//Creating our first Schema, for the users.
const userSchema = new Schema({
    username: {type: 'string', required:true},
    password: {type: 'string', required:true}
});
//Creating our second Schema, for the posts.
const postSchema = new Schema({
    username: {type: 'string', required:true},
    title: {type: 'string', required:true},
    description:  {type: 'string', required:true},
    logo:  {type: 'string', required:true}
});
const UserModule = mongoose.model('users', userSchema);
const PostModule = mongoose.model('posts', postSchema);

app.use(bodyParser.json({limit: "30mb", extended:true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended:true}));
app.use(cors());

mongoose.connect(CONNECTION_URL,{ useNewUrlParser: true, useUnifiedTopology:true})
    .then(() => app.listen(PORT, () => console.log("server running")))
    .catch((error) => console.log(error.message));

const upload = multer({ dest: './uploads/' })

//Handeling the get,post request:
app.post('/sendImage', upload.single('file'), function (req, res) {
    let fileType = req.file.mimetype.split("/")[1]
    let newFileName = req.file.filename + "." + fileType;
    post_image_name = newFileName;
    fs.rename(
        `./uploads/${req.file.filename}`,
        `./uploads/${newFileName}`,
        function () {
            console.log("Added image")
            res.send("200")
        }
    )
});
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

app.post('/sendCurrentUser',async (req,res) =>{
    current_username = req.body.user
    current_username_password = req.body.password
    console.log(current_username + ' got ' + current_username_password)   
});

app.post('/sendNewPost',async (req,res) =>{
    const username = current_username
    const title = req.body.title
    const description = req.body.description
    const logo = post_image_name
    const post = {username: username, title: title, description: description, logo: logo};
    const newPost = new PostModule(post);
    try {
        await newPost.save(async (err,newPostResult) => {
            console.log('New post created')
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

app.get('/getCurrentUser', (req,res) =>{
    res.json({username: current_username, password: current_username_password});
    console.log(current_username + ' send ' + current_username_password)   

})

app.get('/getAllPosts', (req,res) =>{
    PostModule.find({}, (err,result)=>{
        if (err) {
        } else {
            res.json(result);
        }
    })
})




