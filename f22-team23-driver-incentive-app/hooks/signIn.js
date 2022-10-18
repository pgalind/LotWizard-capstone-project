import axios from "axios"
import user from '../services/user'

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

  // Authenticate the User
  axios
    .post('/api/authenticateUser', {
      userName: values.username,
    })
    .then((response) => {
      let passwordResponse = response.data;
      console.log("ewfe: " + passwordResponse)

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
