import excuteQuery from '../../lib/db';

export default async (req, res) => {
  try {

    
    let queryString = 'SELECT * FROM Users WHERE Role=\'Driver\'';

    let result = await excuteQuery({
      query: queryString,
      values: [req.body],
    });

    res.send(result);
    
  } catch (error) {
    console.log(error);
  }
};
