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
        let numUsers = res.data;
        console.log('numUsers: ' + numUsers);
        if (numUsers == 0) {
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
      });
  };

  const register = (values, actions) => {
    console.log('Inside useAuth register');
    axios
      .post('/api/doesUserExist', {
        userName: values.username,
      })
      .then((res) => {
        let numUsers = res.data;
        console.log('numUsers: ' + numUsers);
        //this means no one exists with this username - register the account
        if (numUsers == 0) {
          //call logNewUser with the registration data to log it into the User table in DB
          axios
            .post('/api/logNewUser', {
              values: values,
            })
            .then((res) => {
              console.log('res from logNewuser: ' + res);
              // if confirmation is successful, redirect to login page
              setTimeout(() => {
                router.push('/login');
                actions.setSubmitting(false);
              }, 1000);
            })
            .catch((error) => {
              console.log(error);
            });
        }

        //temp fix - just alert the window if username is already taken
        else {
          setTimeout(() => {
            alert('Username is already taken');
            actions.setSubmitting(false);
          }, 1000);
        }
      })
      .catch((error) => {
        console.log('DoesUserExist error: ' + error);
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
