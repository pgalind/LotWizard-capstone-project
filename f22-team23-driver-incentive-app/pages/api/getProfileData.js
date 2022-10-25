import excuteQuery from '../../lib/db';

export default async (req, res) => {
  try {
    //interpolate the variables into the query
    let queryString = `SELECT FirstName, LastName, UserName, Birthday, TruckModel, YearsOfExperience FROM Users WHERE UserName=\"${req.body.userName}\"`;

    let result = await excuteQuery({
      query: queryString,
      values: [req.body],
    });

    res.send(result);
  } catch (error) {
    console.log(error);
  }
};
