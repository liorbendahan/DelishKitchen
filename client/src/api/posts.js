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

export const sendNewPost = (title, description) => Axios.post(`${URL}/sendNewPost`,{
  title: title,
  description: description
}).then(console.log("Sended new post"));

export const  sendImage = (image) =>  Axios.post('http://localhost:5000/sendImage',image);
