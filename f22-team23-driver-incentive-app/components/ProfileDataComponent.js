import React, { useState, useEffect } from 'react';
import axios from 'axios';
import user from '../services/user';
import { Formik } from 'formik';
import FormSection from '../components/FormSection';
import ProfileField from '../components/ProfileField';
import SaveButton from '../components/SaveButton';
import UpdateProfileData from '../hooks/UpdateProfileData';
import ExitButton from './ExitButton';

export default function ProfileDataComponent() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [post, setPost] = useState({});
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [userName, setUserName] = useState();
  const [birthday, setBirthday] = useState();
  const [truckModel, setTruckModel] = useState();
  const [yearsOfExp, setYearsOfExp] = useState();

  useEffect(() => {
    axios
      .post('/api/getProfileData', {
        userName: user.name,
      })
      .then((response) => {
        //response.data is an array of objects
        //each object has a FirstName key with a string name
        setFirstName(response.data[0].FirstName);
        setLastName(response.data[0].LastName);
        setUserName(response.data[0].UserName);
        setBirthday(response.data[0].Birthday);
        setTruckModel(response.data[0].TruckModel);
        setYearsOfExp(response.data[0].YearsOfExperience);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Does exist error : ' + error);
        setError('User not found');
      });
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-10">
      <ExitButton />
      <Formik
        initialValues={{
          firstName: `${firstName}`,
          lastName: `${lastName}`,
          email: '',
          username: `${userName}`,
          dob: `${birthday}`,
          gender: '',
          country: '',
          addressMain: '',
          addressSecond: '',
          city: '',
          zipcode: '',
          truckModel: `${truckModel}`,
          truckYear: '',
          expYears: `${yearsOfExp}`,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.firstName) {
            errors.firstName = 'Required';
          }
          if (!values.lastName) {
            errors.lastName = 'Required';
          }
          if (!values.email) {
            errors.email = 'Required';
          }
          if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email) &&
            values.email
          ) {
            errors.email = 'Invalid email address';
          }
          if (!values.username) {
            errors.username = 'Required';
          }
          if (!values.role) {
            errors.role = 'Required';
          }
          if (!values.password) {
            errors.password = 'Required';
          }
          if (
            !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i.test(
              values.password
            ) &&
            values.password
          ) {
            errors.password = 'Invalid password';
          }
          if (!values.passwordrepeat) {
            errors.passwordrepeat = 'Required';
          }
          if (
            values.password != values.passwordrepeat &&
            values.passwordrepeat
          ) {
            errors.passwordrepeat = 'Passwords do not match';
          }
          return errors;
        }}
        onSubmit={UpdateProfileData}
        validateOnMount={false}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ isSaving, values, handleBlur, handleSubmit, handleChange }) => (
          <form
            className="flex flex-col items-center w-[300px] min-w-full"
            onSubmit={handleSubmit}
          >
            <h1 className="text-center font-bold text-xl mb-6">
              {user.name}'s Profile
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
              <ProfileField
                label="Email:"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.email}
              />
            </FormSection>

            <FormSection>
              <ProfileField
                label="Username:"
                type="text"
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.username}
              />
            </FormSection>

            <FormSection>
              <ProfileField
                label="Date of birth:"
                type="date"
                name="dob"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.dob}
              />
            </FormSection>

            <FormSection>
              <ProfileField
                label="Gender: "
                type="text"
                name="gender"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.gender}
              />
            </FormSection>

            <FormSection>
              <ProfileField
                label="Home country: "
                type="text"
                name="country"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.country}
              />
            </FormSection>

            <FormSection>
              <ProfileField
                label="Street address 1: "
                type="text"
                name="addressMain"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.addressMain}
              />
            </FormSection>

            <FormSection>
              <ProfileField
                label="Street address 2: "
                type="text"
                name="addressSecond"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.addressSecond}
              />
            </FormSection>

            <FormSection>
              <ProfileField
                label="Home city: "
                type="text"
                name="city"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.city}
              />
            </FormSection>

            <FormSection>
              <ProfileField
                label="Zipcode: "
                type="text"
                name="zipcode"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.zipcode}
              />
            </FormSection>

            <FormSection>
              <ProfileField
                label="Truck model: "
                type="text"
                name="truckModel"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.truckModel}
              />
            </FormSection>

            <FormSection>
              <ProfileField
                label="Truck year: "
                type="number"
                name="truckYear"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.truckYear}
              />
            </FormSection>

            <FormSection>
              <ProfileField
                label="Years of experience: "
                type="number"
                name="expYears"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.expYears}
              />
            </FormSection>

            <SaveButton isSaving={isSaving} />
          </form>
        )}
      </Formik>
    </div>
  );
}
