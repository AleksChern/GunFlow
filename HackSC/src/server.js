const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser')
const cors = require('cors');
//const web3 = require('https://cdn.jsdelivr.net/gh/ethereum/web3.js@1.0.0-beta.34/dist/web3.min.js')
//const web3 = require('./web3.min.js');
//var fs = require('fs');
//eval(fs.readFileSync('web3.min.js')+'');

const app = express();

app.use(cors());
app.use(fileUpload());
//app.use(bodyParser.urlencoded({ extended: true }));
//const app = cors();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//app.use(allowCrossDomain);

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    //res.header('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    next();
  });

  /*
var allowCrossDomain = function(req, req, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Origin', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}*/

let db = new sqlite3.Database('./../db/gunflow.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log("Connected to db");
})

// Serve the static files from the React app
//app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
});

app.get('/api/getUsers', (req, res) => {
    let sql = "SELECT * FROM Users";

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        var list = []
        rows.forEach((row) => {
            console.log(row.ID + " " + row.BGCheckPassed + " " + row.Name + " " + row.Photo)
            list.push(row.Name);
        })

        res.json(list)
    })
})

app.get('/api/getLots', (req, res) => {
    console.log("Getting Lots")
    let sql = "SELECT Users.ID_BC AS Seller, " +
              "Users.Name AS UserName, " + 
              "Guns.ID_BC AS GunID, " + 
              "Guns.Type AS GunType, " + 
              "Guns.Name AS GunName, " + 
              "Guns.Image AS GunImage, " + 
              "Status, Price " +  //"SELECT Name AS n1, Name AS n2 "
              "FROM Lots " +
              "LEFT JOIN Users " + 
              "ON Lots.Seller = Users.ID " +
              "LEFT JOIN Guns " + 
              "ON Lots.Gun = Guns.ID " + 
              "WHERE Lots.Status = \"For Sale\""

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }

        var list = []
        rows.forEach((row) => { 
            console.log(row)
            var lot = {
                Seller: row.Seller,
                SellerName: row.UserName,
                Gun: row.GunID,
                GunType: row.GunType,
                GunName: row.GunName,
                GunImage: `img/${row.GunImage}`,
                Status: row.Status,
                Price: row.Price
            }
            list.push(lot)
        })

        res.json(list)
    })
})

app.post("/api/buy", (req, res) => {
    let sql_delete_lot = 'DELETE FROM Lots WHERE Seller IN ' +
                             '(SELECT ID FROM Users WHERE ID_BC = \'' + req.body.seller + '\') ' +
                             'AND Gun IN (SELECT ID FROM Guns WHERE ID_BC = \'' + req.body.GunID + '\')';
    
    let sql_update_owner = 'UPDATE Guns SET Owner = \'' + req.body.buyer + '\' WHERE GunID = \'' + req.body.GunID + '\'';

    db.exec("BEGIN")
    db.run(sql_delete_lot, [], (err) => {
        if (err) {
            db.exec("ROLLBACK")
            throw err;
        }
    })
    db.run(sql_update_owner, [], (err) => {
        if (err) {
            db.exec("ROLLBACK")
            throw err;
        }
    })

    db.exec("COMMIT")
})

app.post("/api/PlaceLot", (req, res) => {
    let sql = 'INSERT INTO Lots VALUES (' + req.body.seller + ',' + req.body.gun + ',' + req.body.price + ',' + '\'For Sale\')';
    db.run(sql, [], (err) => {
        if (err) {
            throw err;
        }

        res.send({ status: "Success" })
    })
})

/*app.post('/api/register', (req, res) => {

})*/

app.post('/api/login', (req, res) => {
    console.log("checking db");
    let sql = 'SELECT *, COUNT(*) AS count FROM Users WHERE Name = \'' + req.body.name + '\' AND Password = \'' + req.body.password + '\'';
    console.log(sql)
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        if (rows[0].count == 0) {
            console.log("0")
            res.send({ status: "Fail" })
        }
        else {
            row = rows[0]
            console.log("1")
            response = {
                status: "Success",
                BG_passed: row.BGCheckPassed,
                img: `img/${row.Photo}`,
                ID_BC: row.ID_BC,
                name: row.Name
            }
            res.send(response)
        }
    })
})

app.post('/notes', (req, res) => {
    console.log(req.body);
    res.send('Hello')
})

app.post('/upload', (req, res, next) => {
    //console.log(req);
    let imageFile = req.files.file;
    dir = path.basename(__dirname);
    imageFile.mv(`${__dirname}/../public/img/${req.body.filename}.jpg`, function(err) {
        if (err) {
          return res.status(500).send(err);
        }
    
        res.json({file: `img/${req.body.filename}.jpg`});
      });
})

// Handles any requests that don't match the ones above
/*app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});*/

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);