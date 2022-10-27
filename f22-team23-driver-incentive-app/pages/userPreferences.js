import ExitButton from '../components/ExitButton';

export default function userPreferences(params) {
  return (
    <div className="p-10">
      <ExitButton />
      <h1 className="font-bold text-xl mb-6">User Preferences</h1>
      <p>
        This page will contain some settings, such as changing to Dark Mode and
        more!
      </p>
    </div>
  );
}
