import excuteQuery from '../../lib/db';

export default async (req, res) => {
  try {
    //interpolate the variables into the query
    let queryString =
      "DELETE FROM `catalogs` WHERE (`SponsorID` = '" +
      req.body.sponsorID +
      "' AND `ItemID` = '" +
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
