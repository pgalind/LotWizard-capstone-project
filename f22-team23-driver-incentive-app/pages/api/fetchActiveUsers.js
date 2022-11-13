import excuteQuery from '../../lib/db';

export default async (req, res) => {
  try {
    console.log(req.body);

    //determine if there is a user with the requested username who has an active account
    let queryString = `SELECT UserName FROM Users WHERE NOT AccountStatus=\"disabled\"`;
    console.log('Full query string : ' + queryString);

    let result = await excuteQuery({
      query: queryString,
      values: [req.body],
    });
    res.send(result);
    //console.log(numResults)
  } catch (error) {
    console.log(error);
  }
};
