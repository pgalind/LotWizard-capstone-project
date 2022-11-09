// Finds the Drivers list of active sponsors
import excuteQuery from '../../lib/db'

export default async (req, res) => {

    try {
        console.log("about to run the getDriverActiveSponsorList query")
        console.log(req.body)

        //interpolate the variables into the query
        let queryString = `SELECT DriverID, U.Username AS Username, SponsorID, S.SponsorCompany AS SponsorCompany, PointConversion
                            FROM Driver_Sponsor_Links L
                            JOIN Users U ON L.DriverID = U.UserID
                            JOIN SponsorList S ON L.SponsorID = S.id
                            WHERE U.Username = \"${req.body.username}\"
                            AND L.State = "Active";`
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
  };