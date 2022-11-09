import React, { useState, useEffect } from 'react';
import axios from 'axios';
import user from '../services/user';
import { Formik } from 'formik';
import FormSection from '../components/FormSection';
import ProfileField from '../components/ProfileField';
import FetchButton from '../components/FetchButton'
import SubmitButton from '../components/SubmitButton';
//import editUser from '../hooks/editUser';
import ExitButton from './ExitButton';
import { Dropdown } from 'react-bootstrap';

export default function EditUserComponent() {
    const [loading, setLoading] = useState(true);
    const [usernameSelected, setSelected] = useState(false);
    const [error, setError] = useState('');
    const [post, setPost] = useState({});
    const [options, setOptions] = useState();
    const [sponsorList, setSponsors] = useState();
    const [selectedUsername, setUsername] = useState();
    const userNames = []
    const sponsors = []

    // Profile values
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [role, setRole] = useState();
    const [userSponsor, setSponsor] = useState();

  useEffect(() => {
    axios
      .post('/api/getUsers', {})
      .then((response) => {
        //response.data is an array of objects
        //each object has a FirstName key with a string name
        console.log(response);
        userNames.push(
            <option value="" label="select a username">
                Select a username{" "}
            </option>
        )
        for (var index=0; index < response.data.length; index++){
            var user = response.data[index].UserName
            userNames.push(
                <option key={user} value={user} label={user}>
                    {user}
                </option>
            )
        }
        console.log(options)
        setOptions(userNames);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Does exist error : ' + error);
        setError('User not found');
      });
    
    axios
    .post('/api/getSponsorList', {})
    .then((response) => {
      //response.data is an array of objects
      //each object has a FirstName key with a string name
      console.log(response);
      for (var index=0; index < response.data.length; index++){
          var sponsor = response.data[index].SponsorCompany
          sponsors.push(
              <option key={sponsor} value={sponsor} label={sponsor}>
                  {sponsor}
              </option>
          )
      }
      console.log(options)
      setSponsors(sponsors);
    })
    .catch((error) => {
      console.log('Does exist error : ' + error);
      setError('User not found');
    });
  }, []);

  let getUserProfile = (values) => {
    axios
        .post('/api/getUserProfile', {
            values: values,
        })
        .then((response) => {
            console.log(`\n\n\nUser Profile:`);
            console.log(response.data[0])
            setUsername(response.data[0].UserName)
            setFirstName(response.data[0].FirstName)
            setLastName(response.data[0].LastName)
            setRole(response.data[0].Role)
            setSponsor(response.data[0].SponsorCompany)
            setSelected(true);
        })
        .catch((error) => {
            console.log('Error');
            setError('Database error');
        })
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!usernameSelected && !loading) {
    page =
        <div className="p-10">
        <ExitButton />
        <Formik
            initialValues={{
                user: ""
            }}
            onSubmit={getUserProfile}
            validateOnMount={false}
            validateOnChange={false}
            validateOnBlur={false}
        >
            {({ isSaving, values, handleBlur, handleSubmit, handleChange }) => (
            <form
                className="flex flex-col items-center w-[300px] min-w-full"
                onSubmit={handleSubmit}
            >
                <h1 className="text-center font-bold text-xl mb-6">
                Edit A User
                </h1>

                <FormSection>
                    <div className="flex mr-4 pb-2">
                        <span className="block m-2">
                            <label htmlFor="Role">Username:</label>
                        </span>

                        <select
                            className="py-1 px-2 bg-slate-100 rounded-md"
                            name="user"
                            value={values.user}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
                            {options}
                        </select>
                    </div>
                </FormSection>

                <FetchButton isSaving={isSaving} />
            </form>
            )}
        </Formik>
        </div>
    ;
  }

  if(usernameSelected && !loading){
    return (
        <div className="p-10">
        <ExitButton />
        <Formik
            initialValues={{
                user: "",
            }}
            onSubmit={getUserProfile}
            validateOnMount={false}
            validateOnChange={false}
            validateOnBlur={false}
            enableReinitialize={true}
        >
            {({ isSaving, values, handleBlur, handleSubmit, handleChange }) => (
            <form
                className="flex flex-col items-center w-[300px] min-w-full"
                onSubmit={handleSubmit}
            >
                <h1 className="text-center font-bold text-xl mb-6">
                Edit A User
                </h1>

                <FormSection>
                    <div className="flex mr-4 pb-2">
                        <span className="block m-2">
                            <label htmlFor="Role">Username:</label>
                        </span>

                        <select
                            className="py-1 px-2 bg-slate-100 rounded-md"
                            name="user"
                            value={values.user}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
                        </select>
                    </div>
                </FormSection>

                <FetchButton isSaving={isSaving} />
            </form>
            )}
        </Formik>
        <Formik
            initialValues={{
                user: "",
                firstName: `${firstName}`,
                lastName: `${lastName}`,
                role: `${role}`,
                userSponsor: `${userSponsor}`
            }}
            onSubmit={getUserProfile}
            validateOnMount={false}
            validateOnChange={false}
            validateOnBlur={false}
            enableReinitialize={true}
        >
            {({ isSaving, values, handleBlur, handleSubmit, handleChange }) => (
            <form
                className="flex flex-col items-center w-[300px] min-w-full"
                onSubmit={handleSubmit}
            >   
                <br></br>
                <h1 className="text-center font-bold text-xl mb-6">
                    {selectedUsername}'s Profile
                </h1>

                <FormSection>
                    <ProfileField
                        label="First name:"
                        type="text"
                        name="firstName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.firstName}
                    />
                </FormSection>

                <FormSection>
                    <ProfileField
                        label="Last name:"
                        type="text"
                        name="lastName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.lastName}
                    />
                </FormSection>

                <FormSection>
                    <div className="flex mr-4 pb-2">
                        <span className="block m-2">
                            <label htmlFor="Role">Role:</label>
                        </span>

                        <select
                            className="py-1 px-2 bg-slate-100 rounded-md"
                            name="role"
                            value={values.role}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label={role}
                        >
                            <option value="Driver" label="Driver">
                                Driver
                            </option>
                            <option value="Sponsor" label="Sponsor">
                                Sponsor
                            </option>
                            <option value="Admin" label="Admin">
                                Admin
                            </option>
                        </select>
                    </div>
                </FormSection>

                <FormSection>
                    <div className="flex mr-4 pb-2">
                        <span className="block m-2">
                            <label htmlFor="Sponsor">Sponsor:</label>
                        </span>

                        <select
                            className="py-1 px-2 bg-slate-100 rounded-md"
                            name="user"
                            value={values.sponsor}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label={userSponsor}
                        >
                            {sponsorList}
                        </select>
                    </div>
                </FormSection>

            </form>
            )}
        </Formik>
        </div>
    );
  }
}
