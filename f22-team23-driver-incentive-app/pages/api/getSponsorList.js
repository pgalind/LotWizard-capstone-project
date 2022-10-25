import excuteQuery from '../../lib/db'

export default async (req, res) => {

    try {
        console.log("about to run the getSponsorList query")
        console.log(req.body)

        //interpolate the variables into the query
        let queryString = `SELECT SponsorCompany FROM SponsorList`
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