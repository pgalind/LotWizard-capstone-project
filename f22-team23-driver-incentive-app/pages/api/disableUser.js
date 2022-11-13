import excuteQuery from '../../lib/db';

export default async (req, res) => {
  try {
    console.log(req);
    let queryString = `UPDATE Users SET Points = 0, AccountStatus = "disabled" WHERE UserName=\"${req.body.userName}\"`;
    console.log('query : ' + queryString);

    let result = await excuteQuery({
      query: queryString,
      values: [req.body],
    });
    console.log('Account disabled successfully');
  } catch (error) {
    console.log(error);
  }
};
