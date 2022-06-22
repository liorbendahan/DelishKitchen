import Axios from 'axios';
import { useResolvedPath } from 'react-router-dom';

URL = "http://localhost:5000"

var users = {}
var user = {}


//Returns back from the server the current user.
export async function getAllUsers() {
    var response = await fetch('http://localhost:5000/getUsers');
    var data = await response.json();
    return data;
}
//Returns back from the server the current user.
export async function getCurrentUser() {
    var response = await fetch('http://localhost:5000/getCurrentUser');
    var data = await response.json();
    return data;
}

//Returns back from the server the current user.
//export const getCurrentUser = () => {
//    Axios.get(`${URL}/getCurrentUser`).then((response) =>{
 //       user = response.data;
 //   }).then(console.log(user));
 //   return user;
//}
//Returns back from the server all the users.
//export const getAllUsers = () => {
 //   Axios.get(`${URL}/getUsers`).then((response) =>{
 //       users = response.data;
 //   }).then(console.log(users));
 //   return users;
//}