import Axios from 'axios';

URL = "http://localhost:5000"

//Here we send the server a new user for him to add.
export const addNewUser = (username, password) => Axios.post(`${URL}/addNewUser`,{
  user: username,
  password: password
}).then(console.log("Added new user: username: " + username + " " + password));