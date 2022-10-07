import axios from "axios"

export default function registerAuth(values){

    axios.post('/api/doesUserExist',{
        userName : values.username
    }).then((response) => {
        let numUsers = response.data

        console.log("res.data is : " + numUsers)

        //this means no one exists with this username - register the account
        if(numUsers == 0){

            //call logNewUser with the registration data to log it into the User table in DB
            axios.post('/api/logNewUser',{
                firstName : values.firstName,
                lastName : values.lastName,
                userName : values.username,
                password : values.password
         }).then((response) => {
                console.log(response);
        }).catch((error) => {
                console.log(error)
            });
        }

        //temp fix - just alert the window if username is already taken
        else{
            alert('That username is already taken')
        }

    }).catch((error) => {
        console.log("Does exist error : " + error)
    })
}