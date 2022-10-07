import axios from "axios"
import user from '../services/user'

export default function signIn(values){

    axios.post('/api/authenticateUser',{
        userName : values.username
    }).then((response) => {
        let passwordResponse = response.data

        console.log("user password is : " + passwordResponse)

        if(passwordResponse === 0){
            alert('Username or Password is incorrect')
        } else {
            if(values.password == passwordResponse){
                alert("Successful log in")
                user.name = values.userName
            } else {
                alert ('Username or Password is incorrect')
            }
        }

     

    }).catch((error) => {
        console.log("Does exist error : " + error)
    })
}