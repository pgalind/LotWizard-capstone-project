import excuteQuery from '../../lib/db'

export default async (req, res) => {

    try {
        console.log("about to run the getPastApplicationList query")
        console.log(req.body)

        //interpolate the variables into the query
        let queryString = `SELECT A.id, SponsorID, DriverID, Decision, Application_Reason, Decision_Reason FROM Driver_Application A
                            JOIN Users U
                            JOIN SponsorList S
                            WHERE U.UserName = \"${req.body.sponsorUserName}\"
                            AND U.SponsorCompany = S.SponsorCompany
                            AND S.id = A.SponsorID
                            AND A.Decision <> "Undecided" ` 
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