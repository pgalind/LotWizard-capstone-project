import excuteQuery from '../../../lib/db'

export default async (req, res) => {

    try {
        console.log("about to run the auth user query")
        console.log(req.body)

        //interpolate the variables into the query
        let queryString = `SELECT Password FROM Users WHERE UserName=\"${req.body.userName}\"`
        console.log("Full query string : " + queryString)
         
       let result = await excuteQuery({
           query: queryString,
           values: [req.body],
       });

       let numResults = Object.keys(result).length

       //if account didnt exist - send back 0 indicating no user
       if(numResults == 0){
        res.send(0)
       }

       //return first json password
       //during my testing I (RYAN) have made a bunch of accounts and some have same username so I am
       //only looking at first account w username
       //this should be fine b/c in production if we dont allow duplicate usernames, we should never have
       //multiple accounts w same username anyway
       res.send(result[0].Password)
      
  } catch ( error ) {
      console.log( error );
  }
  };