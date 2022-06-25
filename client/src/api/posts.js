import Axios from 'axios';

URL = "http://localhost:5000"

//Here we send the server a new user for him to add.
export const addNewUser = (username, password) => Axios.post(`${URL}/addNewUser`,{
  user: username,
  password: password
}).then(console.log("Added new user: " + username + " " + password));

//Here we send the server the current user after login.
export const sendCurrentUser = (username, password) => Axios.post(`${URL}/sendCurrentUser`,{
  user: username,
  password: password
}).then(console.log("Sended current user: " + username + " " + password));

//Here we send the server the title and description of the new post
export const sendNewPost = (title, description) => Axios.post(`${URL}/sendNewPost`,{
  title: title,
  description: description
}).then(console.log("Sended new post"));

//Here we send the server the image from the CreatePost page.
export const  sendImage = (image) =>  Axios.post(`${URL}/uploadImageToServer`, image).then();

//Here we send the server a new review for him to add to the db.
export const  sendNewReview = (review, logo) =>  Axios.post(`${URL}/addNewReview`, {
  description: review,
  logo: logo
}).then();

//here we send the server a request to logout from the client.
export const  logOut = () =>  Axios.post(`${URL}/logOut`, {}).then();


