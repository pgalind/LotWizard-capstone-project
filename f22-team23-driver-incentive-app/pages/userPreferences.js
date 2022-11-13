import ExitButton from '../components/ExitButton';
import user from '../services/user';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function userPreferences() {
  const router = useRouter();

  const disableUserAccount = () => {
    axios
      .post('/api/disableUser', { userName: user.userID })
      .then((response) => {
        console.log(response);
      });
    router.push('/');
  };

  return (
    <div className="p-10">
      <ExitButton />
      <h1 className="font-bold text-xl mb-6">User Preferences</h1>
      <p>
        This page will contain some settings, such as changing to Dark Mode and
        more!
      </p>
      <button className="p-2 hover:text-blue-600" onClick={disableUserAccount}>
        Delete account
      </button>
    </div>
  );
}
