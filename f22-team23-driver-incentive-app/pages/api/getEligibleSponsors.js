import excuteQuery from '../../lib/db';

export default async (req, res) => {
  try {
    console.log('req nom', req.body);
    const result = await excuteQuery({
      query: 'SELECT UserName FROM sys.Users WHERE `Role`=\'Sponsor\' AND (`SponsorCompany` IS NULL OR `SponsorCompany`=\'\')',
      values: [],
    });
    console.log('Available Users:', result);
    res.send(result)
  } catch (error) {
    console.log(error);
  }
};
