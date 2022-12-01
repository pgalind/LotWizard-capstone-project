import excuteQuery from '../../lib/db'

export default async (req, res) => {

    try {
        console.log("about to run the getDriverPointHistory query")
        console.log(req.body)

        //interpolate the variables into the query
        let queryString = `SELECT COUNT(*) from sys.log_alerts A inner join sys.Users U on A.DriverID = U.UserID where Username = \"${req.body.userName}\" AND A.viewed = 0 AND alert_type = "ApplicationChange"`
        //let queryString = `SELECT * FROM log_pointchange`
        console.log("Full query string : " + queryString)
        console.log("req.body: " + req.body)
         
       let result = await excuteQuery({
           query: queryString,
           values: [req.body],
       });
      

       console.log("Result: " + result.body)
       console.log("Point Change: " + result[0])
       res.send(result)

  } catch ( error ) {
      console.log( error );
  }
  };