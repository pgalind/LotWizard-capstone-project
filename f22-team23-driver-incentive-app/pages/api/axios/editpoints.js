import excuteQuery from '../../../lib/db'

export default async (req, res) => {
    try {
        console.log("req nom", req.body)
        const result = await excuteQuery({
            query: 'INSERT INTO log_navigation(pageNavigated, UserID) VALUES(?, ?)',
            values: [req.body.page, req.body.userID],
        });
      console.log( "ttt",result );
  } catch ( error ) {
      console.log( error );
  }
  
  
  };