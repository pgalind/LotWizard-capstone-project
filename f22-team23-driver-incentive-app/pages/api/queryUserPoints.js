import excuteQuery from '../../lib/db';

export default async (req, res) => {
  try {
    console.log('about to run the queryUserPoints query');
    console.log(req.body);

    //interpolate the variables into the query
    let queryString = `SELECT * FROM Users WHERE UserName=\"${req.body.userName}\"`;
    console.log('Full query string : ' + queryString);
    console.log('req.body.values: ' + req.body.values);

    let result = await excuteQuery({
      query: queryString,
      values: [req.body],
    });

    // Below, we can populate the User's data
    // feel free to add as needed
    console.log('Result: ' + result.body);
    //console.log("Points: " + result[0].Points)
    //console.log("Role: " + result[0].Role)
    res.send(result);
    //console.log("Response: " + res.body)
    //res.send(result[0].Role)
  } catch (error) {
    console.log(error);
  }
};
