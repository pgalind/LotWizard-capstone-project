// This is the actual registration form
// Needs to have Formik installed --  npm install formik --save

import { Formik } from 'formik';
import FormSection from '../components/FormSection';
import FormInput from '../components/FormInput';
import FormLink from '../components/FormLink';
import SubmitButton from '../components/SubmitButton';
import useRegister from '../hooks/useRegister';
import useValidationSchema from '../hooks/useValidationSchema';

export default function Register() {
  const { registerSchema } = useValidationSchema();
  const { register } = useRegister(); // onSubmit will call the register method in hooks/useRegister.js

  return (
    <div className="p-10">
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          confirm_password: '',
        }}
        validationSchema={registerSchema}
        onSubmit={register}
        validateOnMount={false}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({
          isSubmitting,
          errors,
          values,
          handleSubmit,
          handleChange,
          handleBlur,
        }) => (
          <form onSubmit={handleSubmit}>
            <FormSection>
              <FormInput
                label="Username"
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.username}
                isError="true"
                error={errors?.username}
              />
            </FormSection>

            <FormSection>
              <FormInput
                label="Email"
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.email}
                isError="true"
                error={errors?.email}
              />
            </FormSection>

            <FormSection>
              <FormInput
                label="Password"
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.password}
                isError="true"
                error={errors?.password}
              />
            </FormSection>

            <FormSection>
              <FormInput
                label="Confirm password"
                type="password"
                name="confirm_password"
                placeholder="Confirm password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.confirm_password}
                isError="true"
                error={errors?.confirm_password}
              />
            </FormSection>

            <FormSection>
              <FormLink href="/login">Already have an account? Log in</FormLink>
            </FormSection>

            <SubmitButton isSubmitting={isSubmitting} />
          </form>
        )}
      </Formik>
    </div>
  );
}
