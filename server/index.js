const express = require("express");

const PORT = process.env.PORT || 5000;

const app = express();
const mysql = require("mysql");

// Create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "seas",
});

// Connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySql Connected...");
});



app.get("/classroom-requirements-data/:semester/:year", (req, res) => {
const {semester, year} = req.params;
let sql = `SELECT
CASE WHEN enrolled BETWEEN 1 AND 10 then '1-10'
     WHEN enrolled BETWEEN 11 AND 20 then '11-20'
     WHEN enrolled BETWEEN 21 AND 30 then '21-30'
     WHEN enrolled BETWEEN 31 AND 35 then '31-35'
     WHEN enrolled BETWEEN 36 AND 40 then '36-40'
     WHEN enrolled BETWEEN 41 AND 50 then '41-50'
     WHEN enrolled BETWEEN 51 AND 55 then '51-55'
     WHEN enrolled BETWEEN 56 AND 65 then '56-65'
END AS classsize,
COUNT(section) AS sections,
COUNT(section) / 12 AS classroom6,
COUNT(section) / 14 AS classroom7
FROM course_section
WHERE semester = '${semester}' AND year = ${year}
GROUP BY classsize
HAVING classsize IS NOT NULL
UNION
SELECT 'Total' AS classsize, 
COUNT(section) AS sections, 
COUNT(section) / 12 AS classroom6, 
COUNT(section) / 14 AS classroom7
FROM course_section
WHERE enrolled BETWEEN 1 AND 65 AND semester = '${semester}' AND year = ${year}`;

  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});


app.get("/semesters&Years-on-database", (req, res) => {

  let sql = `SELECT DISTINCT semester, year
  FROM course_section;`;
  
    let query = db.query(sql, (err, results) => {
      if (err) throw err;
      console.log(results);
      res.send(results);
    });
  });


app.get("/api", (req, res) => {
  res.json({ message: "Hello IUB from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
