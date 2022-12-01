import excuteQuery from '../../lib/db'


// yes this is a terrible way of doing this, but the trigger was causing locks
export default async (req, res) => {

    try {
        console.log("about to run the sponsorIncrementDriverPoints query")
        console.log(req.body)

        //interpolate the variables into the query

        let queryString = `UPDATE Users
                            SET Points = Points + \"${req.body.pointChange}\" WHERE UserName = \"${req.body.driver}\";` 
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