import React, { useState, useEffect } from 'react';
import axios from 'axios';
import user from '../services/user';
import { Formik, Field } from 'formik';
import { useFormik } from 'formik';
import FormSection from '../components/FormSection';
import ProfileField from '../components/ProfileField';
import SubmitButton from '../components/SubmitButton';
import generateSponsorReport from './generateSponsorReport';
import { useRouter } from 'next/router';
import ExitButton from '../components/ExitButton';
import FormInput from '../components/FormInput';
export default function driverReportMenu(){
    const [loading, setLoading] = useState(true);
    const [drivers, setDrivers] = useState([])
    const [isSubmitting, setSubmitting] = useState(false);
    let router = useRouter()


    useEffect(() =>{
        axios.post('/api/getAllDrivers').then((res) => {

           setDrivers(res.data)

            setLoading(false)
            setOptions(drivers)

            console.log("There are " + res.data.length + " drivers")

        }).catch((err) => {

        })
    })



    const formik = useFormik({
      initialValues: {
        driver : '',
        pointChange : 0,
        reason : ''
       },
       onSubmit: (values, actions) => {
        actions.setSubmitting(true);
        let data = {
          sponsorUser : user.name,
          driver : values.driver,
          pointChange : values.pointChange,
          reason : values.reason
        };
        console.log(data)
        axios.post('/api/sponsorAlterDriverPoints', data)
        axios.post('/api/sponsorIncrementDriverPoints', data)
        actions.setSubmitting(false);
        alert("Points successfully altered!")
        router.push('/');
      },
    });

    return(
        <div className="p-10">
        <ExitButton />
            <form
              className="flex flex-col items-center w-[300px] min-w-full"
              onSubmit={formik.handleSubmit}
            >
              <h1 className="text-center font-bold text-xl mb-6">
                Select driver to alter points
              </h1>
  
              <FormSection>
                  <div className="flex mr-4 pb-2">
                      <select
                          className="py-1 px-2 bg-slate-100 rounded-md"
                          name="driver"
                          value={formik.values.driver}
                          label={formik.values.driver}
                          onChange={formik.handleChange}
                      >
                         {drivers.map((val, key) => {
                            return (
                                <option key={key}>
                                    {val['UserName']}
                                </option>
                            );
                        })}
                      </select>
                  </div>
              </FormSection>
              <FormSection>
                <FormInput
                    label="Point Change"
                    type="number"
                    name="pointChange"
                    value={formik.values.pointChange}
                    onChange={formik.handleChange}
                />
                </FormSection>

                <FormSection>
                <FormInput
                    label="Reason"
                    type="text"
                    name="reason"
                    value={formik.values.reason}
                    onChange={formik.handleChange}
                />
                </FormSection>
  
                <SubmitButton isSubmitting={isSubmitting}></SubmitButton>
            </form>
      </div>
        
    )
}