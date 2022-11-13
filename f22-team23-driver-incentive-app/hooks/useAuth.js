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
            actions.setSubmitting(false);
          }, 1000);
        }
        // if a password is returned
        else {
          if (values.password == res.data) {
            user.name = values.username;
            console.log('user: ' + user.name);
            populateUserData();
            setTimeout(() => {
              router.push('/');
              actions.setSubmitting(false);
            }, 1000);
          } else {
            setTimeout(() => {
              alert('Username or Password is incorrect');
              actions.setSubmitting(false);
            }, 1000);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        // clear form
      });
  };

  const register = (values, actions) => {
    axios
      .post('/api/logNewUser', {
        values: values,
      })
      .then((res) => {
        if (res.data == 'failed') {
          alert('Failed to register. Username already exists.');
        } else {
          console.log('Registration successful');
          setTimeout(() => {
            alert('Registration successful!');
            //router.push('/')
            actions.setSubmitting(false);
          }, 1000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //gets and sets the role for the current user thats logged in
  const setUserRole = (username) => {
    axios
      .post('/api/getUserRole', {
        userName: username,
      })
      .then((res) => {
        user.role = res.data;
      });
  };

  return {
    populateUserData,
    login,
    register,
    setUserRole,
  };
}
