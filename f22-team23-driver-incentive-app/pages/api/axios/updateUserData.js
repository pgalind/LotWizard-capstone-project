import excuteQuery from '../../../lib/db';
import user from '../../../services/user';

//updates the DB with new profile information
export default async (req, res) => {
  try {
    //interpolate the variables into the query
    let queryString = `UPDATE Users SET FirstName =\'${req.body.firstName}\' WHERE  UserName=\'${req.body.currentUser}\'`;
    console.log("queryyyy : " + queryString)

    let result = await excuteQuery({
      query: queryString,
      values: [req.body],
    });

    res.send("success")

  } catch (error) {
    console.log(error);
  }
};
