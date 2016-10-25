/**
 * Created by Edmeister on 05-Jul-16.
 */
module.exports=function(Model){

    return {
        emit: function (s_id64, eventName, params) {
            Model.socketio.to("user:" + s_id64).emit(eventName, params);
        },
        on: function (UserPacket, callback) {
            //params.sbc_id=sbc_id;
            Model.socketio.to("user:" + UserPacket.s_id64).on(UserPacket.data, callback);
        }
    }
    
};