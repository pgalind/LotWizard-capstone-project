// db.js
import mysql from 'serverless-mysql';
/*
const db = mysql({
  config: {
    // This is TERRIBLE ... fix later
    host: 'team23-database.cobd8enwsupz.us-east-1.rds.amazonaws.com',
    port: '3306',
    database: 'sys',
    user: 'admin',
    password: 'L3tsAceThis5h1t',
  },
});*/
export default async function excuteQuery({ query, values }) {
  const db = mysql({
    config: {
      // This is TERRIBLE ... fix later
      host: 'team23-database.cobd8enwsupz.us-east-1.rds.amazonaws.com',
      port: '3306',
      database: 'sys',
      user: 'admin',
      password: 'L3tsAceThis5h1t',
    },
  });

  try {
    const results = await db.query(query, values);
    await db.end();
    console.log('db port: ' + db.port); // added
    return results;
  } catch (error) {
    return { error };
  }
}
