import axios from 'axios';
import user from '../services/user';

let checkVals = (values) => {
    for (var value in values){
        if (values[value] === ''){
            alert("Please fill out all fields");
            return false;
        }
    }
    if(values.password != values.passwordrepeat){
        alert("Passwords do not match")
        return false;
    }
    return true;
}

export default function newUser(values){
    if(checkVals(values)){
        console.log(values);

        axios
        .post('/api/createNewUser', {
        values: values,
        })
        .then((res) => {
            if(res.data == "failed"){
                alert("Failed to create new user. User probably already exists.")
            } else {
                console.log('New User Created');
                alert("New User Created");
            }
        })
        .catch((error) => {
        console.log(error);
        });
    }
}