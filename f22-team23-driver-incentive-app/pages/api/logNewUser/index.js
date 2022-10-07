import excuteQuery from '../../../lib/db'

export default async (req, res) => {

    try {
        console.log("new User")
        console.log(req.body)

        //interpolate the variables into the query
        let queryString = `INSERT INTO Users (FirstName, LastName, UserName, Password, Role) VALUES (\"${req.body.firstName}\", \"${req.body.lastName}\", \"${req.body.userName}\", \"${req.body.password}\", "Driver")`
         
       let result = await excuteQuery({
           query: queryString,
           values: [req.body],
       });

       res.send(result.data)
      
  } catch ( error ) {
      console.log( error );
  }
  };