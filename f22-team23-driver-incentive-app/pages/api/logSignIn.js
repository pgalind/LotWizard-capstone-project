import { excuteQuery } from '../../lib/db';

export default async (req, res) => {
  try {
    console.log('req nom', req.body);
    const result = await excuteQuery({
      query: 'INSERT INTO Log_SignIn(value) VALUES(?)',
      values: [req.body.content],
    });
    res.end(JSON.stringify(result));
    console.log('ttt', result);
  } catch (error) {
    console.log(error);
  }
};
