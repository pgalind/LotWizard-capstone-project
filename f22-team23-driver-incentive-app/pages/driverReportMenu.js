import React, { useState, useEffect } from 'react';
import axios from 'axios';
import user from '../services/user';
import { Formik, Field } from 'formik';
import FormSection from '../components/FormSection';
import ProfileField from '../components/ProfileField';
import SubmitButton from '../components/SubmitButton';
import generateSponsorReport from './generateSponsorReport';
import { useRouter } from 'next/router';
//import newSponsor from '../hooks/newSponsor';
//import ExitButton from './ExitButton

export default function driverReportMenu(){
    const [loading, setLoading] = useState(true);
    const [drivers, setDrivers] = useState([])
    const [options, setOptions] = useState([])
    let router = useRouter()

    const handleSub = (values) => {
        user.reportToPrint = values.Driver
        router.push('./reportPointHistory')
    }

    useEffect(() =>{
        axios.post('/api/getAllDrivers').then((res) => {

           setDrivers(res.data)

            setLoading(false)
            setOptions(drivers)

            console.log("There are " + res.data.length + " drivers")

        }).catch((err) => {

        })
    })


    if(loading){
        return(
            <p>Loading...</p>
        )
    }

    return(
        <div className="p-10">
        <Formik
          initialValues={{
              
          }}
          onSubmit={handleSub}
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
                Select drivers for report
              </h1>
  
              <FormSection>
                  <div className="flex mr-4 pb-2">
                      <select
                          className="py-1 px-2 bg-slate-100 rounded-md"
                          name="Driver"
                          value={values.role}
                          onChange={handleChange}
                          onBlur={handleBlur}
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
  
              <SubmitButton isSaving={isSaving} />
            </form>
          )}
        </Formik>
      </div>
        
    )
}