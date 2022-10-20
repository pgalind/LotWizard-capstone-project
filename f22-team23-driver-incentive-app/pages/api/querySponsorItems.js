import excuteQuery from '../../lib/db';

export default async (req, res) => {
  try {
    console.log('about to run the queryItems query');
    console.log(req.body);

    //interpolate the variables into the query
    let queryString = `SELECT * FROM SponsorA`;
    console.log('Full query string : ' + queryString);

    let result = await excuteQuery({
      query: queryString,
      values: [req.body],
    });

    res.send(result);
  } catch (error) {
    console.log(error);
  }
};
