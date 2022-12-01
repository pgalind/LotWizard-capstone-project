import excuteQuery from '../../lib/db'

export default async (req, res) => {

    try {
        console.log("about to run the driverPurchaseItems query")
        console.log(req.body)

        //interpolate the variables into the query
        let queryString = `INSERT INTO Driver_Purchases (driver, cost, item_id, item_name)
                            VALUES (\"${req.body.driver}\", ${req.body.cost}, \"${req.body.id}\", \"${req.body.item}\") ` 
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