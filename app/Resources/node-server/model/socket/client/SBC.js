/**
 * Created by Edmeister on 05-Jul-16.
 */
module.exports=function(SteamBotClientConfig,Model){
    var sbc_id=SteamBotClientConfig.id;
    var socket_room = Model.socketio.to("sbc:" + sbc_id);

    return {
        emit: function (eventName, params) {
            params.sbc_id = sbc_id;
            socket_room.emit(eventName, params);
        },
        on: function (eventName, callback) {
            //params.sbc_id=sbc_id;
            socket_room.on(eventName, callback);
        }
    }

};