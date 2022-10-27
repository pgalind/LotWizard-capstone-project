import excuteQuery from '../../../lib/db';

export default async (req, res) => {
  try {
    //interpolate the variables into the query
    let queryString =
      'SELECT * FROM catalogs' +
      " WHERE (`SponsorID` = '" +
      req.body.sponsorID +
      "')";
    console.log('Ran the following query into the database: ' + queryString);

    let result = await excuteQuery({
      query: queryString,
      values: [req.body],
    });

    console.log(result);

    res.send(result);
  } catch (error) {
    console.log(error);
  }
};
