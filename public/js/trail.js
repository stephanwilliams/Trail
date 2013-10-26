var trail = new Firebase('https://trail.firebaseio.com/');
var rooms = trail.child('room_ids');
var currentRoom;
var currentRoomValueCache;

rooms.on('value', refreshRoomsList);

function refreshRoomsList(snapshot) {
    $.each(snapshot.val(), function(roomName, roomId) {
        // add to the room list
    });
}

$('#ROOM_BUTTON_ID').on('click', function(event) {
    currentRoom.off('value', refreshCurrentRoom);

    currentRoom = trail.child('rooms').child('...');
    currentRoom.on('value', refreshCurrentRoom);
});

function refreshCurrentRoom(snapshot) {
    currentRoomValueCache = snapshot.val();
    // refresh the current room
}
