import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import user from '../services/user';
import axios from 'axios';
import ExitButton from '../components/ExitButton';
//import getPoints from '../hooks/getUserPoints';

export default function reportPointHistory() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pointHistory, setPointHistory] = useState();

  useEffect(() => {
    axios
      .post('/api/getDriverPointHistory', {
        userName: user.reportToPrint,
      })
      .then((response) => {
        setLoading(false);
        setPointHistory(response.data);
        setError('');
        //console.log("Response: " + response.headers);
        console.log(response.data);
        console.log(response.data[0]);
        console.log('LENGTH: ' + Object.keys(response.data).length);
        //console.log(response.data[0]);
        //console.log(response.data[1]);
      })
      .catch((error) => {
        setLoading(false);
        setPointHistory();
        setError('Could not retrieve point history for user');
        console.log(error);
      });
  }, []);

  if (loading) {
    return <div>Loading . . .</div>;
  }
  return (
    <div className="p-10">
      <ExitButton />

      <h1 className="font-bold text-xl mb-6">{user.reportToPrint}'s Point History</h1>

      <table className="table-fixed">
        <thead>
          <tr>
            <th className="p-2 border-b text-left">Point Change</th>
            <th className="p-2 border-b text-left">Reason</th>
          </tr>
        </thead>
        <tbody>
          {pointHistory.map((val, key) => {
            return (
              <tr key={key}>
                {val['PointChange'] < 0 ? (
                  <td className="px-2 text-left font-bold text-red-600">
                    {val['PointChange']}
                  </td>
                ) : (
                  <td className="px-2 text-left font-bold text-green-600">
                    {val['PointChange']}
                  </td>
                )}
                <td className="px-2 text-left">{val['Reason']}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
