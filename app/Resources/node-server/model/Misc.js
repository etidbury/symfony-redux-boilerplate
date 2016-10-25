module.exports = function (conn) {
    var self = this;
    self.getList = function (onComplete) {//demo
        conn(
            onComplete, function (connection) {
                connection.query({
                        sql: 'SELECT * FROM list',
                        timeout: 30000 // 30s
                    }
                    , function (error, rows) {
                        connection.release();
                        if (error) {
                            onComplete(error);
                            return;
                        }

                        onComplete(false, rows || []);
                    }
                );

            }
        );
    };


    return self;


};