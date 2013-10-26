$(function() {
	$('#createRoomButton').on('click', function() {
		$('#createRoomModal').foundation('reveal', 'open');
	});

    $('#createRoomForm').on('submit', function() { return false; });
	$('#createRoomForm').on('valid', function () {
	    $('[class*=roomButton').remove();
		createNewRoom($('#nameText').val(), getUserId(), $('#contentText').val(), null);
		
		$('#createRoomModal').foundation('reveal', 'close');
		$('#nameText').text('');
		$('#contentText').text('');
	});
	
    $('#createPostForm').on('submit', function() { return false; });
	$('#createPostForm').on('valid', function() {
	    var parents = $.map($('#parents').children(), function(element, index) {
	        return $(element).attr('data-post-id');
	    })
	    createNewPost(currentRoom.name(),
	                  getUserId(),
	                  $('#postContentText').val(),
	                  parents,
	                  function(newPost) {
	                    changeCurrentPost(currentRoom.name(), newPost.name(), null);
	                  });
	   $('#parents').empty();
	   $('#postContentText').text('');
	   composingPost = false;
	    $('#createPostPane').hide();
	});
	$('#postCancelButton').on('click', function() {
	    $('#createPostPane').hide();
	   $('#postContentText').text('');
	   composingPost = false;
	   $('#parents').empty();
	});

	$('#cancelButton').on('click', function() {
		$('#createRoomModal').foundation('reveal', 'close');
		$('#nameText').text('');
		$('#contentText').text('');
	});

	// Hi Jeffrey
});