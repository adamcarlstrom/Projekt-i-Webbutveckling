$(document).ready(function(){
	
	//icon byte när man trycker på hamburgarmeny
	$("#hamburger").click(function(){
		$("#hamburger").toggleClass("fa-times");
		$("#hamburger").toggleClass("fa-bars");
	});


	//bildspel vid början som byter bild var 5e sekund med en fade in out fade out
	var interval = setInterval(carousell, 5000);
	var nr = 0;

	var img = ["./IMG/gatulyckta_natt.jpg", "./IMG/gata_natt.jpg", "./IMG/lamp.jpg"]
	var wait;
	function carousell() {
		$("#bildspel").fadeOut("slow");

		wait = setTimeout(fadeIn, 500);
	}
	function fadeIn(){
		nr += 1;
		if(nr == img.length){
			nr = 0;
		}
		document.getElementById("bildspel").style.backgroundImage = "url('" + img[nr] +"')";
		$("#bildspel").fadeIn("slow");	
	}


});