import axios from 'axios';
import user from '../services/user';

let checkVals = (values) => {
    if(values.user == ''){
        alert("Please select a user");
        return false;
    }
    else{
        return true;
    }
};

export default function newSponsor(values){
    if(checkVals(values)){
        console.log(values);

        axios
        .post('/api/createNewSponsor', {
        values: values,
        })
        .then((res) => {
            if(res.data == "failed"){
                alert("Failed to create new sponsor, sponsor name probably already exists.")
            } else {
                console.log('New Sponsor Created');
                alert("New Sponsor Created");
            }
        })
        .catch((error) => {
        console.log(error);
        });
    }
}