var trail = new Firebase('https://trail.firebaseio.com/');
var roomIds = trail.child('room_ids');
var rooms = trail.child('rooms');
var currentRoom;
var currentPost;
var currentRoomValueCache;

var composingPost = false;

function replyAction(event) {
    if (!composingPost) {
        composingPost = true;
        $('#createPostPane').show();
    }
    var postId = $(this).parent().parent().attr('id');
    var userId = $(this).parent().find('.post-user-id').text();
    
    if ($('#parents').find('[data-post-id=' + postId + ']').length == 0) {
        $('#parents').append('<span data-post-id="' + postId + '">' + userId + '</span>');
    }
}

//roomIds.on('value', refreshRoomsList);

//function refreshRoomsList(snapshot) {
    //$('#roomButtonEven, #roomButtonOdd').remove();

    //var index = 0
    //$.each(snapshot.val(), function(roomName, roomId) {
        //var buttonType = 'Odd';
        //if (index % 2 == 0) {
            //buttonType = 'Even';
        //}
        //$('#room-list').append('<a href="#" class="roomButton' + buttonType + ' button" roomId=' + roomId + '>' + roomName + '</a>');

        //index++;
    //});

    //$('[class*=roomButton]').on('click', function() {
        //$('#infovis').children().remove();
        //var roomId = $(this).attr('roomId');
        //changeCurrentRoom(roomId, function() {
            //getFirstPost(roomId, function(value) {
                //createSpaceTree(value, roomId);
            //});
        //});
    //});
//}

//function createSpaceTree(value, roomId) {
    //$('#infovis').children().remove();
    //var postId = value[0];
    //var post = value[1];
    //var jsonString = '{"id": "' + postId + '", "name": "' + post['user_id'] + '", "data":{ "user_id": "' + post['user_id'] + '", "ts": "' + post['ts'] + '", "content": "' + post['content'] + '"}, "children": [';
                
    //if (post.hasOwnProperty('children')) {
        //$.each(post['children'], function(index, childPostId) {
            //getPost(roomId, childPostId, function(childObject) {
                //if (index > 0) {
                    //jsonString += ', ';
                //}
                //var childPost = childObject[1];
                //jsonString += '{"id": "' + childPostId + '", "name": "' + childPost['user_id'] + '", "data":{"user_id": "' + childPost['user_id'] + '", "ts": "' + childPost['ts'] + '", "content": "' + childPost['content'] + '"}, "children": []}';
            //});
        //});
    //}
    
    //jsonString = jsonString + ']}';
    
    //var st = new $jit.ST({
        //injectInto: 'infovis',
        //duration: 400,
        //transition: $jit.Trans.Quart.easeInOut,
        //offsetX: 150,
        //offsetY: 50,
        //levelDistance: 50,
        //Navigation: {
            //enable: true,
            //panning: false
        //},
        //Node: {
            //height: 150,
            //width: 300,
            //type: 'rectangle',
            //color: '#aaa',
            //overridable: true
        //},
        //Edge: {
            //type: 'bezier',
            //overriable: true
        //},
        //onBeforeCompute: function(node) {
        //},
        //onAfterCompute: function() {
        //},
        //onCreateLabel: function(label, node) {
            //label.id = node.id;
            //label.innerHTML = node.name;
            //label.onclick = function() {
                //st.setRoot(node.id, 'animate');
            //};
            //var style = label.style;
            //style.width = 300 + 'px';
            //style.height = 150 + 'px';
            //style.cursor = 'pointer';
            //style.color = '#333';
            //style.fontSize = '0.8em';
            //style.textAlign = 'center';
            //style.paddingTop = '3px';
        //},
        
        //onBeforePlotNode: function(node) {
            //if (node.selected) {
                //node.data.$color = "#ff7";
            //}
            //else {
                //delete node.data.$color;
                //if (!node.anySubnode("exist")) {
                    //var count = 0;
                    //node.eachSubnode(function(n) { count++; });
                    //node.data.$color = ['#aaa', '#baa', '#caa', '#daa', '#eaa', '#faa'][count];
                //}
            //}
        //},
        
        //onBeforePlotLine: function(adj) {
            //if (adj.nodeFrom.selected && adj.nodeTo.selected) {
                //adj.data.$color = "#eed";
                //adj.data.$lineWidth = 3;
            //}
            //else {
                //delete adj.data.$color;
                //delete adj.data.$lineWidth;
            //}
        //}
    //});
    
    //var json = $.parseJSON(jsonString);
    //st.loadJSON(json);
    //st.compute();
    //st.onClick(st.root);
    
    //st.geom.translate(new $jit.Complex(0, -1000), "current");
    
    //// Custom div over nodes
    //$('#infovis').append(createPostDiv(json['data'], "", json['id']));
    //$('#'+json['id']).css('display', 'block');
    //$('#'+json['id']).children('.post-content').on('click', function() {
        //getPost(roomId, json['id'], function(object) {
            //createSpaceTree(object, roomId);
        //})
        ////st.setRoot(json['id'], 'animate');
    //})
    //$.each(json['children'], function(index, child) {
        //$('#infovis').append(createPostDiv(child['data'], "", child['id']));
        //$('#'+child['id']).children('.post-content').on('click', function() {
            //getPost(roomId, child['id'], function(object) {
                //createSpaceTree(object, roomId);
            //})
            ////st.setRoot(child['id'], 'animate');
        //})
    //});
    
    //if (post.hasOwnProperty('parents')) {
        //var parentTotalOffset = (post['parents'].length * 160 - 10) / 2;
        //$.each(post['parents'], function(index, parentPostId) {
            //getPost(roomId, parentPostId, function(parentObject) {
                //var parentPost = parentObject[1];
                //var offset = 160 * index - parentTotalOffset - 50;
                //var vert_off = "calc(50% " + (offset < 0 ? "-" : "+") + " " + Math.abs(offset) + "px)";
                //$('#infovis').append(createPostDivAtLocation(parentPost, ' animatedPost', parentObject[0], 310, vert_off));
                //$('#'+parentObject[0]).children('.post-content').on('click', function() {
                   //createSpaceTree(parentObject, roomId); 
                //});
            //});
        //});
    //}
    //$('.post-reply').on('click', replyAction);
//}

//function createPostDiv(post, _class, id) {


    
    //return '<div class="post ' + _class + '" id="' + id + '">'
                //+ '<div class="post-header" style="position: absolute; left: ' + $('#'+id).css('left') +'; top: ' + $('#'+id).css('top') + '">'
                    //+ '<span class="post-user-id">' + post['user_id'] + '</span>'
                     ////+ '<span class="post-time">' + post['ts'] + '</span>'
                     //+ '<span class="post-time">' + moment(parseInt(post['ts'])).fromNow()+ '</span>'
                    //+ '<span class="post-reply">Reply</span>'
                //+ '</div>'
                //+ '<div class="post-content">'
                    //+ post['content']
                //+ '</div>'
            //+ '</div>';
            
            
    ////});
//}

//function createPostDivAtLocation(post, _class, id, x, y) {
    ////var now = moment(post['ts']);
    //return '<div class="post' + _class + '" id="' + id + '" style="position: fixed; left: ' + x +'px; top: ' + y + '">'
                //+ '<div class="post-header">'
                    //+ '<span class="post-user-id">' + post['user_id'] + '</span>'
                    ////+ '<span class="post-time">' + post['ts'] + '</span>'
                    //+ '<span class="post-time">' + moment(parseInt(post['ts'])).fromNow()+ '</span>'
                    //+ '<span class="post-reply">Reply</span>'
                //+ '</div>'
                //+ '<div class="post-content">'
                    //+ post['content']
                //+ '</div>'
            //+ '</div>';
//}

//$('#ROOM_BUTTON_ID').on('click', function(event) {
    //currentRoom.off('value', refreshCurrentRoom);

    //currentRoom = trail.child('rooms').child('...');
    //currentRoom.on('value', refreshCurrentRoom);
//});

// takes the room id as a string
//function changeCurrentRoom(newRoomId, callback) {
    //if (currentRoom != null) currentRoom.off('value', refreshCurrentRoom);
    //currentRoom = trail.child('rooms').child(newRoomId);
    //currentRoom.on('value', refreshCurrentRoom(callback));
//}

function refreshCurrentRoom(callback) {
    return function(snapshot) {
        currentRoomValueCache = snapshot.val();
        if (typeof callback === 'function') callback();
    }
}

function changeCurrentPost(roomId, newPostId, callback) {
    getPost(roomId, newPostId, function(post) {
        createSpaceTree(post, roomId);
        if (typeof callback === 'function') callback(post);
    });
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

function getUserId() {
    return localStorage.getItem('user_id') || 'Anonymous';
}

