import axios from 'axios';
import user from '../services/user';
import { useRouter } from 'next/router';

export default function useAuth() {
  const router = useRouter();

  const populateUserData = () => {
    // Get User Total Point Changes
    axios
      .post('/api/getDriverTotalPointChanges', {
        userName: user.name,
      })
      .then((response) => {
        user.totalPointChanges = response.data[0]['COUNT(*)'];
        console.log(
          'TOTAL POINTS CHANGES FOR USER ' +
            user.name +
            ': ' +
            user.totalPointChanges
        );
      })
      .catch((error) => {
        console.log('Error: ' + error);
      });
  };

  const login = (values, actions) => {
    // Authenticate the User
    axios
      .post('/api/authenticateUser', {
        userName: values.username,
      })
      .then((res) => {
        console.log('res: ' + res);
        console.log('data: ' + res.data);
        if (res.data === 0) {
          setTimeout(() => {
            alert('Username not found!');
            actions.resetForm();
          }, 1000);
        }
        // if a password is returned
        else {
          if (values.password == res.data) {
            setTimeout(() => {
              alert('Successful log in!');
              actions.resetForm();
              router.push('/');
            }, 1000);
            user.name = values.username;
            console.log(user.name);
            populateUserData();
            console.log(`HELLO ${userName}!`);
          } else {
            setTimeout(() => {
              alert('Username or Password is incorrect');
              actions.resetForm();
            }, 1000);
          }
        }
      })
      .catch((error) => {
        console.log('Authentication error: ' + error);
      });
  };

  return {
    populateUserData,
    login,
  };
}
