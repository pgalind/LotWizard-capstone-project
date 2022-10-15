import axios from "axios"
import user from '../services/user'
//import { useRouter } from 'next/router';

function populateUserData() {
  // Get User Total Point Changes
  axios.post('/api/getDriverTotalPointChanges', {
    userName : user.name
  }).then((response) => {
      user.totalPointChanges = response.data[0]['COUNT(*)'];
      console.log("TOTAL POINTS CHANGES FOR USER " + user.name + ": " + user.totalPointChanges);
      
  }).catch((error) => {
    console.log('Does exist error : ' + error);
  });
}
export default function signIn(values){
    //const router = useRouter(); // to redirect
    console.log("HELLO");

  // Authenticate the User
  axios
    .post('/api/authenticateUser', {
      userName: values.username,
    })
    .then((response) => {
      let passwordResponse = response.data;

      console.log('user password is : ' + passwordResponse);
      console.log('user name is : ' + values.username);

        if(passwordResponse === 0){
            alert('Username or Password is incorrect')
        } else {
            if(values.password == passwordResponse){
                alert("Successful log in: Hello " + values.username + "!")
                user.name = values.username
                console.log(user.name)
                populateUserData();
                //console.log("HELLO ${userName}!")
                //router.push('/');
            } else {
                alert ('Username or Password is incorrect')
            }
        }

     

    }).catch((error) => {
        console.log("Does exist error : " + error)
    })
    .catch((error) => {
      console.log('Does exist error : ' + error);
    });

}
