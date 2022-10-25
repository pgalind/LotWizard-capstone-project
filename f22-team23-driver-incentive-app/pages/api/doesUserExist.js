import excuteQuery from '../../lib/db';

export default async (req, res) => {
  try {
    console.log('about to run the does exist query');
    console.log(req.body);

    //interpolate the variables into the query
    let queryString = `SELECT UserName FROM Users WHERE UserName=\"${req.body.userName}\"`;
    console.log('Full query string : ' + queryString);

    let result = await excuteQuery({
      query: queryString,
      values: [req.body],
    });

    //turns SQL result set into readable JSON and gets number of items in the JSON array
    let numResults = Object.keys(result).length;

    //console.log("resssss : " + resultSetJSON)
    //console.log(numResults)

    res.send(numResults);
  } catch (error) {
    console.log(error);
  }
};
