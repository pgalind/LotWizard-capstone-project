import excuteQuery from '../../lib/db';

export default async (req, res) => {
  try {
    const result = await excuteQuery({
      query: `SELECT * FROM \`Users\` WHERE UserName=\'${req.body.values.user}\'`
    });
    res.send(result);
  } catch (error) {
    console.log(error);
  }
};
