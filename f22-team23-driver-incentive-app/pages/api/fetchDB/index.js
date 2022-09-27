import excuteQuery from '../../../lib/db'

export default async (req, res) => {
    try {
        console.log("req nom", req.body)
      const result = await excuteQuery({
          query: 'SELECT * FROM `Users`',
          values: [],
      });
      console.log( "ttt",result );
  } catch ( error ) {
      console.log( error );
  }
  };