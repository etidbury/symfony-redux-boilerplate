/**
 * Created by tidbu on 11/04/2016.
 */
module.exports = function () {

    var mysql = require('mysql');

    var dbpool;


    /*-----------------DB------------------*/
    var setupPool = function () {
        console.log('Setting up MySQL pool...');

        dbpool = mysql.createPoolCluster();

        var slave_main = {
            connectionLimit: c.DB.CONNECTION_LIMIT,
            host: c.DB.HOST,
            database: c.DB.NAME,
            //password: dbpassword,
            //user: dbuser,//todo: change user to reduce priv. to INSERT AND UPDATE PRIVILEGES,
            multipleStatements: true,
            restoreNodeTimeout: c.DB.POOL_TIMEOUT,
            removeNodeErrorCount: c.DB.POOL_ERR_LIMIT
        };
        slave_main.user = c.DB.ACCOUNT[0].USERNAME;
        slave_main.password = c.DB.ACCOUNT[1].PASSWORD;
        dbpool.add('MASTER', slave_main); // anonymous group

        dbpool.on('enqueue', function () {
            console.log('Waiting for available MySQL connection slot...');
        });

    };

    /*function keepAlive(){

     dbpool.getConnection(function(err, connection){

     if(err) {
     console.log('> RESETTING POOL');
     initPool(function() {

     });

     return;
     }

     connection.release();

     });
     }
     setInterval(keepAlive, 10000);*///todo: re-add mysql pool recovery process

    var initPool = function (oncomplete) {
        if (dbpool) {

            dbpool.end(function (err) {
                console.log('Ending MySQL pool...');

                if (err) {
                    console.log('Failed to end mysql connection pool');
                } else {
                    setupPool();
                }

                oncomplete();
            });

            oncomplete();

        } else {
            setupPool();
            oncomplete();
        }
    };

    var initServices = function (Model) {
        var ctrlArgFound = false;
        process.argv.forEach(function (val, index, array) {
            val = val.split('=');
            
            if (val[0] == "ctrl") {
                var ctrls = val[1].split(',');
                ctrlArgFound = true;
                ctrls.forEach(function (val, index) {
                    srcRequire('ctrl/' + val)(Model);
                });
            }
        });

        if (!ctrlArgFound) {
            console.log("Using [Default] controller ('ctrl' argument not specified.)");
            //process.exit(1);
            srcRequire('ctrl/Default')(Model);
        }
    };

    initPool(function () {


        var Model = srcRequire('Model')(dbpool);

        var port = process.env.PORT || 3000;

        process.argv.forEach(function (val) {
            val = val.split('=');
            if (val[0] == "port" && parseInt(val[1]) > 0)
                port = parseInt(val[1]);
        });


        Model.server.listen(port, function () {
            console.log('Server listening at port %d', port);
            initServices(Model);
        });


    });


};