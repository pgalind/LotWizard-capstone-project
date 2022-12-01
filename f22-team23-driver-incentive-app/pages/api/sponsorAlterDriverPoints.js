import excuteQuery from '../../lib/db'

export default async (req, res) => {

    try {
        console.log("about to run the sponsorAlterDriverPoints query")
        console.log(req.body)

        //interpolate the variables into the query

        let queryString = `INSERT INTO sys.log_pointchange (SponsorUserID, SponsorID, DriverID, PointChange, Reason) 
                            SELECT '1', '1', U.UserID, \"${req.body.pointChange}\", \"${req.body.reason}\"
                            FROM Users U WHERE U.UserName = \"${req.body.driver}\"` 
        //let queryString = `SELECT * FROM log_pointchange`
        console.log("Full query string : " + queryString)
        console.log("req.body: " + req.body)
         
       let result = await excuteQuery({
           query: queryString,
           values: [req.body],
       });
      
       console.log("Result: " + result.body)
       res.send(result)
  } catch ( error ) {
      console.log( error );
  }

}