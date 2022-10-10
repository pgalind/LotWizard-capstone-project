import axios from "axios"
import user from "../services/user"

export default function getUserFirstName(values){
    let firstName = ''
    axios.post('/api/getFirstName',{
        userName : user.name
    }).then((response) => {
        firstName = response.data[0].FirstName
        console.log("first name is : " + firstName + " and this is logged :" + new Date())

        return firstName + ''
     

    }).catch((error) => {
        console.log("Does exist error : " + error)
    })
}