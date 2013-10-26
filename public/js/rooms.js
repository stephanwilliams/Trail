$(function() {
	$('#createRoomButton').on('click', function() {
		$('#createRoomModal').foundation('reveal', 'open');
	});

	$('#createRoomForm').on('valid', function () {
		createNewRoom($('#nameText').val(), 'Anonymous', $('#contentText').val(), null);
	});

	$('#cancelButton').on('click', function() {
		$('#createRoomModal').foundation('reveal', 'close');
	})

	// Hi Jeffrey
})