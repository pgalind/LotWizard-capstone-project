import excuteQuery from '../../lib/db';

export default async (req, res) => {
  let numResults = null;

  try {
    console.log('about to run the does exist query');
    console.log(req.body);

    //interpolate the variables into the query
    let queryString = `SELECT UserName FROM Users WHERE UserName=\"${req.body.values.username}\"`;
    console.log('Full query string : ' + queryString);

    let result = await excuteQuery({
      query: queryString,
      values: [req.body],
    });

    //turns SQL result set into readable JSON and gets number of items in the JSON array
    numResults = Object.keys(result).length;

    //console.log(numResults)
  } catch (error) {
    console.log(error);
  }

  console.log(numResults);

  if (numResults == 0) {
    try {
      console.log(req);
      let queryString = `INSERT INTO Users (UserName, Password, Role) VALUES (\"${req.body.values.username}\", \"${req.body.values.password}\", \"${req.body.values.role}\")`;
      console.log('query : ' + queryString);

      let result = await excuteQuery({
        query: queryString,
        values: [req.body],
      });

      res.send('success');
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send('failed');
  }
};
