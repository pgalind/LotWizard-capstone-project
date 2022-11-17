import excuteQuery from '../../lib/db';

export default async (req, res) => {
  try {
    console.log('registering new User');
    console.log('req.body.values: ' + req.body);

    //interpolate the variables into the query
    let queryString = `INSERT INTO Users (FirstName, LastName, UserName, Password, Role) VALUES (\"${req.body.values.firstName}\", \"${req.body.values.lastName}\", \"${req.body.values.username}\", \"${req.body.values.password}\", \"Driver\")`;
    console.log('Full query string : ' + queryString);

    let result = await excuteQuery({
      query: queryString,
      values: [req.body],
    });

    res.send(result.data);
  } catch (error) {
    console.log(error);
  }
};
