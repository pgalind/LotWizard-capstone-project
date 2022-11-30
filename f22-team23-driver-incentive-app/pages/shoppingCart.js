// Page for the Driver to view their shopping cart

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import user from '../services/user';
import axios from 'axios';
import { useFormik } from 'formik';
import SubmitButton from '../components/SubmitButton';
import FormSection from '../components/FormSection';
import FormInput from '../components/FormInput';
import ExitButton from '../components/ExitButton';

export default function userProfile() {
  //const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [total, setTotal] = useState([]);
  const [isSubmitting, setSubmitting] = useState(false);

  var totalQty = user.cart.cost.reduce((a,b)=>a+b);

  const formik = useFormik({
    initialValues: {
      item : '',
      qty : 0,
      cartData : {
        itemVals: [],
        cost: []
      }
    },
    onSubmit: (values, actions) => {
      //alert(JSON.stringify(values, null, 2)); // TODO: axios post to send application to sponsor
      console.log('Cart Data: ' + values.cartData.toString);
      console.log('length: ' + values.cartData.length)
      let data = {
        driver: user.name,
        cartData: user.cart
      };
      console.log(data)
      axios.post('/api/sendDriverApplication', data).then((res) => { // temp holder
        actions.setSubmitting(false);
      });
    },
  });

  console.log(user.cart);

  return (
    <div className="p-10 mx-auto">
      <ExitButton />

      <h1 className="font-bold text-xl mb-6">{user.name}'s Shopping Cart</h1>
      <p>You have {user.cart.item.length} items in the cart.</p>


      <table>
        <tr>
          <th>Item</th>
          <th>Cost</th>
        </tr>
        {user.cart.item.map((item, index) => {
          return (
            <tr item={item}>
              <td>{item}</td>
              <td>{user.cart.cost[index]}</td>
            </tr>
          );
        })}
      </table>

      <h1 className="font-bold text-xl mb-6">Total Cost: {parseFloat(totalQty).toFixed(2)}</h1>

      <form
        className="flex flex-col items-center w-[300px] min-w-full"
        onSubmit={formik.handleSubmit}
      >

        <SubmitButton isSubmitting={isSubmitting}></SubmitButton>
      </form>
    </div>
  );
}
