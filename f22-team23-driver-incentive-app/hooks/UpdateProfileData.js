import axios from 'axios';
import user from '../services/user';

export default function UpdateProfileData(values) {
  console.log(values.firstName);

  axios
    .post('../pages/api/updateUserData', {
      firstName: values.firstName,
      currentUser: user.name,
    })
    .then((res) => {
      console.log('DONEsfdsdsd');
    })
    .catch((error) => {
      console.log(error);
    });
}
