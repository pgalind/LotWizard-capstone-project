import excuteQuery from '../../lib/db';

export default async (req, res) => {

    try {
        console.log(req)
        let queryString = `UPDATE Users SET FirstName = \'${req.body.values.firstName}\', LastName = \'${req.body.values.lastName}\', Password = \'${req.body.values.password}\', Role = \'${req.body.values.role}\', SponsorCompany = \'${req.body.values.userSponsor}\' WHERE (UserName = \"${req.body.values.user}\")`
        console.log("query : " + queryString)

        let result = await excuteQuery({
        query: queryString,
        values: [req.body],
        });

        res.send("success")
    } catch (error) {
        console.log(error);
        res.send("failed")
    }
};
