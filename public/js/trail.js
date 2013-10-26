var trail = new Firebase('https://trail.firebaseio.com/');
var roomIds = trail.child('room_ids');
var rooms = trail.child('rooms');
var currentRoom;
var currentRoomValueCache;

roomIds.on('value', refreshRoomsList);

function refreshRoomsList(snapshot) {
    $('.roomlist').children('[class*=roomButton]').remove();

    var index = 0
    $.each(snapshot.val(), function(roomName, roomId) {
        var buttonType = 'Odd';
        if (index % 2 == 0) {
            buttonType = 'Even';
        }
        $('.roomlist').append('<a href="#" class="roomButton' + buttonType + ' button" roomId=' + roomId + '>' + roomName + '</a>');
    });
}

$('#ROOM_BUTTON_ID').on('click', function(event) {
    currentRoom.off('value', refreshCurrentRoom);

    currentRoom = trail.child('rooms').child('...');
    currentRoom.on('value', refreshCurrentRoom);
});

// takes the room id as a string
function changeCurrentRoom(newRoomId) {
    if (currentRoom != null) currentRoom.off('value', refreshCurrentRoom);
    currentRoom = trail.child('rooms').child(newRoomId);
    currentRoom.on('value', refreshCurrentRoom);
}

function refreshCurrentRoom(snapshot) {
    currentRoomValueCache = snapshot.val();
}

/**
 * Adds a post to Firebase.
 *
 * Returns (via callback) a reference to the new post if the
 * transaction was successful, or an error string if posting
 * failed.
 */
function createNewRoom(roomName, userId, content, callback) {
    var newRoom = rooms.push();
    roomIds.transaction(function(currentRooms) {
        if (!$.isPlainObject(currentRooms)) {
            currentRooms = {};
        }
        if (roomName in currentRooms) {
            callback('A room with that name already exists!');
            return;
        }
        currentRooms[roomName] = newRoom.name();
        return currentRooms;
    }, function (error, committed, snapshot) {
        if (error !== null || !committed) {
            if (typeof callback === 'function')
                callback('Room creation failed!' +
                    '<br />Was there an error? ' + error +
                    '<br />Were the changes committed? ' + committed);
            return;
        } else {
            changeCurrentRoom(newRoom.name());
            createNewPost(newRoom.name(), userId, content, null,
                function(value) {
                    if (typeof value === 'string') { // there was an error
                        if (typeof callback === 'function')
                            callback('Failed creating initial post!<br />' + value);
                        return;
                    }
                });
        }
    });
    if (typeof callback === 'function') callback(newRoom);
}

/**
 * Adds a post to Firebase.
 *
 * Returns (via callback) a reference to the new post if the
 * transaction was successful, or an error string if posting
 * failed.
 */
function createNewPost(roomId, userId, content, parents, callback) {
    var newPost = currentRoom.child('posts').push({
        'user_id': userId,
        'ts': +new Date,
        'content': content,
        'parents': parents
    });
    $.each(parents, function(index, parentId) {
        var children = currentRoom.child('posts').child(parentId).child('children');
        children.transaction(function(currentChildren) {
            if (!$.isArray(currentChildren)) {
                currentChildren = [];
            }
            currentChildren.push(newPost.name());
            return currentChildren;
        }, function(error, committed, snapshot) {
            if (error !== null || !committed ) {
                if (typeof callback === 'function')
                    callback('Post creation failed!' +
                        '<br />Was there an error? ' + error +
                        '<br />Were the changes committed? ' + committed);
                return;
            }
        });
    });
    if (typeof callback === 'function') callback(newPost);
}
