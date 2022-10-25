import user from '../services/user'

export default function SponsorHomePageComponent(){
    return (
        <h1>WHAT IS UP SPONSOR: {user.name}</h1>
    );
}