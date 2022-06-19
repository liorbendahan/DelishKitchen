import Axios from 'axios';

URL = "http://localhost:5000"

var users = {}

//Returns back from the server all the users.
export const getAllUsers = () => {
    Axios.get(`${URL}/getUsers`).then((response) =>{
        users = response.data;
    }).then(console.log("hey"));
    return users;
}