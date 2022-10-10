import axios from "axios"
import user from '../services/user'
import { useRouter } from 'next/router';

export default function signIn(values){
    const router = useRouter(); // to redirect

    axios.post('/api/authenticateUser',{
        userName : values.username
    }).then((response) => {
        let passwordResponse = response.data

        console.log("user password is : " + passwordResponse)
        console.log("user name is : " + values.username)

        if(passwordResponse === 0){
            alert('Username or Password is incorrect')
        } else {
            if(values.password == passwordResponse){
                alert("Successful log in: Hello " + values.username + "!")
                user.name = values.username
                console.log(user.name)
                //console.log("HELLO ${userName}!")
                //router.push('/');
            } else {
                alert ('Username or Password is incorrect')
            }
        }

     

    }).catch((error) => {
        console.log("Does exist error : " + error)
    })
}