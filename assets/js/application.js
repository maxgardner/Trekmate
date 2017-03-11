$(document).ready(function(){



var database = firebase.database();

console.log(database);

//getting all the elements in the dom
const txtEmail = $("#txtEmail");
const txtPassword = $("#txtPassword");
const btnLogin = $("#btnLogin");
const btnSignUp = $("#btnSignUp");
const btnLogout = $("#btnLogout");

//add login event
$("#btnLogin").on("click", function(){
	const email = txtEmail.val();
	const pass = txtPassword.val();
	const auth = firebase.auth();
	console.log("buttton worked");
	//sign in
	const promise = auth.signInWithEmailAndPassword(email, pass);
	promise.catch( e=> console.log(e.message));
	$('.loginDisplay').addClass("hide");
})
$("#btnSignUp").on("click", function(){
	const email = txtEmail.val();
	const pass = txtPassword.val();
	const auth = firebase.auth();
	//sign in
	//check for real email
	const promise = auth.createUserWithEmailAndPassword(email, pass);
	promise.catch( e=> console.log(e.message));
})
$("#btnLogout").on("click", function(){
	firebase.auth().signOut();
	$("#btnLogout").addClass("hide");
	$(".loginDisplay").removeClass("hide");
	
})
	
firebase.auth().onAuthStateChanged(firebaseUser => {
	if(firebaseUser){
		console.log(firebaseUser);
		$('#btnLogout').removeClass("hide");
} else {
	console.log("not logged in");
}
});
});