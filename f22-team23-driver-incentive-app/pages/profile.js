import React from 'react';
import { Formik } from 'formik';
import FormSection from '../components/FormSection';
import ProfileField from '../components/ProfileField';
import SaveButton from '../components/SaveButton';

const Profile = () => {
  return (
    <div className="flex items-center justify-center">
      <Formik
        initialValues={{
          firstName: 'getfromdb',
          lastName: 'getfromdb',
          email: 'getfromdb',
          username: 'getfromdb',
          dob: '',
          gender: '',
          country: '',
          addressMain: '',
          addressSecond: '',
          city: '',
          zipcode: '',
          truckModel: '',
          truckYear: '',
          expYears: '',
        }}
        //onSubmit={handler function to add values to db}
        // this is for testing purposes --> form values are displayed in a popup alert
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
        validateOnMount={false}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ isSaving, values, handleBlur, handleSubmit, handleChange }) => (
          <form className="max-w-full p-10" onSubmit={handleSubmit}>
            <h1 className="text-center font-bold text-2xl mb-6">
              User Profile
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
                type="text"
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
                type="text"
                name="truckYear"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.truckYear}
              />
            </FormSection>

            <FormSection>
              <ProfileField
                label="Years of experience: "
                type="text"
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
};

export default Profile;
