import excuteQuery from '../../lib/db'

// Sets alerts as viewed

export default async (req, res) => {

    try {
        console.log("about to run the clearAlerts query")
        console.log(req.body)

        //interpolate the variables into the query
        let queryString = `UPDATE sys.log_alerts A
                            INNER JOIN sys.Users U
                                ON A.DriverID = U.UserID
                            SET A.viewed = 1
                            WHERE U.Username = \"${req.body.userName}\" AND A.viewed = 0`
        //let queryString = `SELECT * FROM log_pointchange`
        console.log("Full query string : " + queryString)
        console.log("req.body: " + req.body)
         
       let result = await excuteQuery({
           query: queryString,
           values: [req.body],
       });
      
       // Below, we can populate the User's data
       // feel free to add as needed
       console.log("Result: " + result.body)
       console.log("Point Change: " + result[0])
       //console.log("Role: " + result[0].Role)
       res.send(result)
       //console.log("Response: " + res.body)
       //res.send(result[0].Role)
  } catch ( error ) {
      console.log( error );
  }
  };