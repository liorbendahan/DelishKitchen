import express, { response } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
const app = express();
import multer from 'multer';

const CONNECTION_URL = 'mongodb+srv://liorbendahan:CXEdbkXMZBKdfcUj@cluster0.htsazjm.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;

var current_username = ''
var current_username_password = ''
var post_image_name = ''
var current_logo_show = ''

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
    logo:  {type: 'string', required:true},
    reviews: {type: 'array', default: []},
});
const UserModule = mongoose.model('users', userSchema);
const PostModule = mongoose.model('posts', postSchema);

app.use(bodyParser.json({limit: "30mb", extended:true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended:true}));
app.use(express.static('upload'));
app.use(cors());

//Making our mongodb
mongoose.connect(CONNECTION_URL,{ useNewUrlParser: true, useUnifiedTopology:true})
    .then(() => app.listen(PORT, () => console.log("server running")))
    .catch((error) => console.log(error.message));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ storage: storage }).single('file')


//Here we get the image sent from the CreatePost page
app.post('/uploadImageToServer', (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        res.sendStatus(500);
      }else {
        post_image_name = req.file.filename;
        console.log("Got image " + post_image_name)
        res.sendStatus(200);
      }
    });
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
//Here we get the new users name and password.
app.post('/sendCurrentUser',async (req,res) =>{
    current_username = req.body.user
    current_username_password = req.body.password
    console.log("Current user: " + current_username)  
    res.sendStatus(200); 
});

/* here we get the title and description of the new post, 
And we upload it to the db */
app.post('/sendNewPost',async (req,res) =>{
    console.log("Entered to create the post")
    const username = current_username
    const title = req.body.title
    const description = req.body.description
    const logo = post_image_name
    const reviews = []
    const post = {username: username, title: title,
     description: description, logo: logo, reviews: reviews};
    const newPost = new PostModule(post);
    try {
        await newPost.save(async (err,newPostResult) => {
            console.log('New post created')
            res.sendStatus(200);
        });
    } catch(err) {
        console.log(err);
    } 
});


app.post('/addNewReview',async (req,res) =>{
    await PostModule.findOneAndUpdate({
        logo: req.body.logo,
    },{
        $push: { reviews: {username: current_username, description: req.body.description,
        date: new Date().toLocaleDateString()}  }
    });
    res.sendStatus(200);
});

/* Here we send to the front all the current users from the db */
app.get('/getUsers', (req,res) =>{
    UserModule.find({}, (err,result)=>{
        if (err) {
        } else {
            res.json(result);
        }
    })
});
//Here we send the username and password of the current client.
app.get('/getCurrentUser', (req,res) =>{
    res.json({username: current_username, password: current_username_password});
    console.log("Checked login" + current_username)   
});
//Here we send all the posts that are currently created.
app.get('/getAllPosts', (req,res) =>{
    
    PostModule.find({}, (err,result)=>{
        if (err) {
            res.sendStatus(500);
          }else {
            res.json(result);
          }
    })
});
app.post('/getCurrentLogo', (req,res) =>{
    current_logo_show = req.body.logo
    console.log(current_logo_show)
    res.sendStatus(200);
});
app.get('/getPost',(req,res) =>{
    console.log("entered to show Post")
    PostModule.findOne({logo: current_logo_show}, (err, result)=> {
          if (err) {
            res.sendStatus(500);
          }else {
            res.json(result);
          }

    })
});




