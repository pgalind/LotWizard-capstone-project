import { ResendConfirmationCodeCommand } from '@aws-sdk/client-cognito-identity-provider';
import excuteQuery from '../../lib/db';

export default async (req, res) => {
    let numResults = null;
    let response = "Success";

    console.log(`BODY: \n\n\n\n${req.body}`)

    try {
        console.log('about to run the does exist query');
        console.log(req.body);
    
        //interpolate the variables into the query
        let queryString = `SELECT SponsorCompany FROM SponsorList WHERE SponsorCompany=\"${req.body.values.name}\"`;
        console.log('Full query string : ' + queryString);
    
        let result = await excuteQuery({
          query: queryString,
          values: [req.body],
        });
    
        //turns SQL result set into readable JSON and gets number of items in the JSON array
        numResults = Object.keys(result).length;
        console.log(result)
    
        //console.log("resssss : " + resultSetJSON)
        //console.log(numResults)
      } catch (error) {
        console.log(error);
        response = "failed"
      }
    
      console.log(numResults)

    if(numResults == 0){
        try {
            console.log(req)
            let queryString = `INSERT INTO SponsorList (\`SponsorCompany\`) VALUES (\"${req.body.values.name}\")`;
            console.log("query : " + queryString)
    
            let result = await excuteQuery({
            query: queryString,
            values: [req.body],
            });
        } catch (error) {
            console.log(error);
            response = "failed"
        }
        try {
            console.log(req)
            let queryString = `UPDATE Users SET \`SponsorCompany\`=\"${req.body.values.name}\" WHERE UserName=\"${req.body.values.user}\"`;
            console.log("query : " + queryString)
    
            let result = await excuteQuery({
            query: queryString,
            values: [req.body],
            });
        } catch (error) {
            console.log(error);
        }
        res.send("success");
    }
    else{
        res.send("failed");
    }
};
