import axios from "axios"
import { useRouter } from 'next/router';

export default function signIn(values){
    const router = useRouter(); // to redirect

    axios.post('/api/authenticateUser',{
        userName : values.username
    }).then((response) => {
        let passwordResponse = response.data

        console.log("user password is : " + passwordResponse)

        if(passwordResponse === 0){
            alert('Username or Password is incorrect')
        } else {
            if(values.password == passwordResponse){
                //alert("Successful log in")
                router.push('../');
            } else {
                alert ('Username or Password is incorrect')
            }
        }

     

    }).catch((error) => {
        console.log("Does exist error : " + error)
    })
}