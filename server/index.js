import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import postRoutes from './routes/items.js';
import cors from 'cors';

const app = express();


app.use(bodyParser.json({limit: "30mb", extended:true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended:true}));
app.use(cors());

const CONNECTION_URL = 'mongodb+srv://liorbendahan:CXEdbkXMZBKdfcUj@cluster0.htsazjm.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL,{ useNewUrlParser: true, useUnifiedTopology:true})
    .then(() => app.listen(PORT, () => console.log("server running")))
    .catch((error) => console.log(error.message));

app.post('/addUser',(req,res) =>{
    const name = req.body.user
    console.log(name)
})

app.use('/items',postRoutes);






