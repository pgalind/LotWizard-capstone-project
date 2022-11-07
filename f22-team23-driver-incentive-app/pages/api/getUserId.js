import excuteQuery from '../../lib/db';

//gets the userId for userName in req body
export default async (req, res) => {
  try {
    //interpolate the variables into the query
    let queryString = `SELECT UserID FROM Users WHERE UserName=\'${req.body.userName}\'`;

    let result = await excuteQuery({
      query: queryString,
      values: [req.body],
    });

    //do NOT need to check the result since we are only getting the role once the user is logged in
    //this means we can assume the user is already going to exist and have a role since they are 
    //signed in
    
    res.send(result[0].UserID);
  } catch (error) {
    console.log(error);
  }
};
