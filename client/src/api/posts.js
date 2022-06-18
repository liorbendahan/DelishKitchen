import Axios from 'axios';

URL = "http://localhost:5000"

//Send to the server a new user 
export const SendNewUser = (username) => Axios.post(`${URL}/addUser`,{
      user: username
    }).then(console.log(username));