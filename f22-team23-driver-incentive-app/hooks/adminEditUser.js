import axios from 'axios';
import user from '../services/user';

let checkVals = (values) => {
    console.log(values)
    return true
}

export default function newUser(values) {
    //checkVals(values)

    
    if(checkVals(values)){
        axios
            .post('/api/adminEditUser', {
            values: values,
            })
            .then((res) => {
            if (res.data == 'failed') {
                alert('Failed to update user.');
            } else {
                console.log('User Updated');
                alert('User Updated');
            }
            })
            .catch((error) => {
            console.log(error);
            });
    }
}