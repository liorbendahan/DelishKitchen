import express, { response } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';

const app = express();
const CONNECTION_URL = 'mongodb+srv://liorbendahan:CXEdbkXMZBKdfcUj@cluster0.htsazjm.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;
//Some variables for setting up the server.
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
//Creating our modules.
const UserModule = mongoose.model('users', userSchema);
const PostModule = mongoose.model('posts', postSchema);

app.use(bodyParser.json({limit: "30mb", extended:true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended:true}));
app.use(express.static('upload'));
app.use(cors());

//Connecting our mongodb, and running the server.
mongoose.connect(CONNECTION_URL,{ useNewUrlParser: true, useUnifiedTopology:true})
    .then(() => app.listen(PORT, () => console.log("server running")))
    .catch((error) => console.log(error.message));

/*Here we make our upload folder, were we are going to store all the images the client 
send to us, after creating a post recipe. */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ storage: storage }).single('file')




//Now we are going to handle all the client requests!

//Here we get the image sent from the CreatePost page and save it in the upload folder.
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

//Here we get the current users data, after he logins to the server.
app.post('/sendCurrentUser',async (req,res) =>{
    current_username = req.body.user
    current_username_password = req.body.password
    console.log("Current user: " + current_username)  
    res.sendStatus(200); 
});

/* here we get the title and description of the new post, 
And we upload it to the db
Note: We already have the username and the logo of the post! thats why we dont get it from the client */
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

/*Here we add a new review, we first search for the logo name (who is going to be like our id of every post)
after we find the post in the db, we update the array of reviews he had*/
app.post('/addNewReview',async (req,res) =>{
    await PostModule.findOneAndUpdate({
        //Here we check if the logoName equals the current logo we want to add a review.
        logo: req.body.logo,
    },{
        //Here we update and add a new review to the array of reviews of the post.
        $push: { reviews: {username: current_username, description: req.body.description,
        date: new Date().toLocaleDateString()}  }
    });
    res.sendStatus(200);
});

/* Here we send to the front all the current users from the db */
app.get('/getUsers', (req,res) =>{
    //This fuction returns us all the users from the db.
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
/*Here we get the current logo (that acts like an id) from the client, now we will know what post
he is looking at in the ShowPost page */
app.post('/getCurrentLogo', (req,res) =>{
    current_logo_show = req.body.logo
    console.log(current_logo_show)
    res.sendStatus(200);
});


/*Here we send to the client the post the double clicked in the Home page,
so we can show it to him in the ShowPage */
app.get('/getPost',(req,res) =>{
    PostModule.findOne({logo: current_logo_show}, (err, result)=> {
          if (err) {
            res.sendStatus(500);
          }else {
            res.json(result);
          }

    })
});




