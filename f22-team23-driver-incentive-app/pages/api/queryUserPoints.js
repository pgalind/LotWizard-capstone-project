import excuteQuery from '../../lib/db'
import user from '../../services/user'

export default async (req, res) => {

    try {
        console.log("about to run the queryUserPoints query")
        console.log(req.body)

        //interpolate the variables into the query
        let queryString = `SELECT Points FROM Users WHERE UserName=\"${req.body.userName}\"`
        console.log("Full query string : " + queryString)
        console.log("req.body: " + req.body)
         
       let result = await excuteQuery({
           query: queryString,
           values: [req.body],
       });
      
       console.log("Points: " + result[0].Points)
       res.send(result[0].Points)
  } catch ( error ) {
      console.log( error );
  }
  };