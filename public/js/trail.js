var trail = new Firebase('https://trail.firebaseio.com/');
var roomIds = trail.child('room_ids');
var rooms = trail.child('rooms');
var currentRoom;
var currentPost;
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

        index++;
    });

    $('[class*=roomButton]').on('click', function() {
        var roomId = $(this).attr('roomId');
        changeCurrentRoom(roomId, function() {
            getFirstPost(roomId, function(value) {
                gah = value;
            });
        });
    });
}

$('#ROOM_BUTTON_ID').on('click', function(event) {
    currentRoom.off('value', refreshCurrentRoom);

    currentRoom = trail.child('rooms').child('...');
    currentRoom.on('value', refreshCurrentRoom);
});

// takes the room id as a string
function changeCurrentRoom(newRoomId, callback) {
    if (currentRoom != null) currentRoom.off('value', refreshCurrentRoom);
    currentRoom = trail.child('rooms').child(newRoomId);
    currentRoom.on('value', refreshCurrentRoom(callback));
}

function refreshCurrentRoom(callback) {
    return function(snapshot) {
        currentRoomValueCache = snapshot.val();
        if (typeof callback === 'function') callback();
    }
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

function addNewHistoryPost(postId) {
    var history = null;
    if (localStorage.getItem('history') === null) {
        history = {};
    } else {
        history = JSON.parse(localStorage.getItem('history'));
    }
    history[currentRoom.name()].push(postId);
    localStorage.setItem('history', JSON.stringify(history));
}

function addNewPinnedPost(postId) {
    var pinned = null;
    if (localStorage.getItem('pinned') === null) {
        pinned = {};
    } else {
        pinned = JSON.parse(localStorage.getItem('pinned'));
    }
    pinned[currentRoom.name()].push(postId);
    localStorage.setItem('pinned', JSON.stringify(pinned));
}


// returns data via callback as [ postId, {post obj} ]
function getPost(roomId, postId, callback) {
    if (currentRoom.name() === roomId) {
        var post = [ postId, currentRoomValueCache['posts'][postId] ];
        if (typeof callback === 'function')
            callback(post);
    } else {
        rooms.child(roomId)
            .child('posts')
            .child(postId).once('value', function(snapshot) {
                var post = [ postId, snapshot.val() ];;
                if (typeof callback === 'function') callback(post);
            });
    }
}

// returns data via callback as [ postId, {post obj} ]
function getFirstPost(roomId, callback) {
    if (currentRoom.name() === roomId) {
        var posts = currentRoomValueCache['posts'];
        for (var key in posts) if (posts.hasOwnProperty(key)) break;
        var post = [ key, posts[key] ]; 
        if (typeof callback === 'function') callback(post);
    } else {
        rooms.child(roomId)
             .child('posts')
             .startAt()
             .limit(1).once('value', function(snapshot) {
                 var post = [];
                 for (key in snapshot.val()) {
                     if (snapshot.val().hasOwnProperty(key)) {
                         post = [ key, snapshot.val()[key] ];
                         break;
                     }
                 }
                 if (typeof callback === 'function') callback(post);
             });
    }
}

