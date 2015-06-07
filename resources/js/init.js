 /**
*
* JS Script used to init some variables but also to ask the user for a username.
* @author Hamed ZITOUN (zitoun.hamed@gmail.com)
* @Date: 2015-06-07
*/
var currentUser = $('#customUS').val();
var userBase = new Firebase("https://resplendent-fire-5470.firebaseio.com/");
var myUserRef = userBase.push();
var connectedRef = new Firebase("https://resplendent-fire-5470.firebaseio.com//.info/connected");
connectedRef.on("value", function(isOnline) {
	if (isOnline.val()) {
		setUserStatus("online");
	}
	else {
		setUserStatus("away");
	}
});
$( "#join" ).click(function() {
	if(currentUser != ''){
		var currentStatus = "online";
		userBase.on("child_added", function(element) {
			var user = element.val();
			$("<div/>")
			.attr("id", getMessageId(element))
			.append('<div>' + user.username + "  is " + user.status + '<hr class="hr-clas-low" />')
			.appendTo("#presenceDiv");
		});
		userBase.on("child_removed", function(element) {
			setUserStatus("away");
		});
		userBase.on("child_changed", function(element) {
			var user = element.val();
			$("#presenceDiv").children("#" + getMessageId(element))
			.html('<div>' + user.username + " is " + user.status + '<hr class="hr-clas-low" />')
		});
		$('#popup').fadeOut(100);
		$("#messageInput").removeAttr('disabled');
		$("#send").removeAttr('disabled');
	}
});

function setUserStatus(status) {
	currentStatus = status;
	myUserRef.set({ username: currentUser, status: status });
}