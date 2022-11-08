// Get a driver's application history
// req.body.operator must be '=' or '<>'
    // operator == '=' -> get Undecided applications
    // operator == '<>' -> get closed applications

import excuteQuery from '../../lib/db'

export default async (req, res) => {

    try {
        console.log("about to run the getDriverApplicationHistory query")
        console.log(req.body)

        //interpolate the variables into the query
        let queryString = `SELECT A.id, SponsorID, DriverID, Decision, Application_Reason, Decision_Reason FROM Driver_Application A
                            JOIN Users U
                            WHERE U.UserName = \"${req.body.driverUserName}\"
                            AND U.UserID = A.DriverID
                            AND A.Decision ${req.body.operator} "Undecided"; ` 
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