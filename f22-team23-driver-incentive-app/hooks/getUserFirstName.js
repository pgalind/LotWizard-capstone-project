import axios from "axios"
import user from "../services/user"
import React, { useState, useEffect } from 'react';

export default function getUserFirstName(values){
    const [loading, setLoading] = useState(true);
    let firstName = ''

    useEffect(() =>{

    axios.post('/api/getFirstName',{
        userName : user.name
    }).then((response) => {
        //response.data is an array of objects
        //each object has a FirstName key with a string name
        firstName = response.data[0].FirstName
        console.log("finna return " + firstName)
        setLoading(false)
     

    }).catch((error) => {
        console.log("Does exist error : " + error)
    })

    if(loading){
        return ''
    }

    return firstName


    });
    
}