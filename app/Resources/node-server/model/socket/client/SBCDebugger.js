/**
 * Created by Edmeister on 06-Jul-16.
 */
module.exports=function(SteamBotClientConfig,Model) {
    var sbc_id=SteamBotClientConfig.id;
    var socket_room = Model.socketio.to("debugger");

    return {
        emit: function (eventName, params) {
            params.sbc_id = sbc_id;
            /*console.log(">################debug emit");*/
            socket_room.emit(eventName, params);
        },
        on: function (eventName, callback) {
            //params.sbc_id=sbc_id;
            socket_room.on(eventName, callback);
        }
    }
    
};