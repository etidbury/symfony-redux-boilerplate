module.exports=function(){
    var c = {};

    c.DB = {

        NAME:"scout_local",
        HOST: "localhost",
        ACCOUNT: {
            0: {
                USERNAME: "root",
                PASSWORD: ""
            },
            1: {
                USERNAME: "",
                PASSWORD: ""
            }
        },
        CONNECTION_LIMIT: 10,
        POOL_TIMEOUT: 10000,
        POOL_ERR_LIMIT: 20


    };

    global.c=c;


};
