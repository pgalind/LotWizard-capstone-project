import excuteQuery from '../../lib/db';

export default async (req, res) => {
  try {
    //interpolate the variables into the query
    let queryString =
      "INSERT INTO `catalogs` (`SponsorID`, `ItemID`) VALUES ('" +
      req.body.sponsorID +
      "', '" +
      req.body.itemID +
      "')";
    console.log('Database executed: ' + queryString);

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
