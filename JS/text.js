$(document).ready(function(){
	$(".burger").click(function(){
		$(".burger").toggleClass("fa-times");
		$(".burger").toggleClass("fa-bars");
	});


	//bildspel vid början som byter bild var 5e sekund med en fade in out fade out
	var interval = setInterval(carousell, 5000);
	var nr = 0;
	var bilder = setInterval(bilder, 5000);


	/*skapar en array med en for loop som sätter in alla bilder i arrayn 
	som sedan kan användas i function "carousell" och "fadeIn" för att
	byta bild utan att jag behöver skriva in src till alla bilder i arrayn själv.*/
	var modell;
	var src;
	var array = new Array(7);
	var i;
	var tmp;
	var number = 0;

	for( i = 1 ; i <= 7 ; i++ ){
		src = "../IMG/modell(" + i + ").jpg";
		tmp = ( i - 1 )
		array[tmp] = src;
	
	} 

	function carousell() {
		$("#bildspel").fadeOut(500);

		wait = setTimeout(fadeIn, 500);
	}
	function fadeIn(){
		nr += 1;
		if(nr == array.length){
			nr = 0;
		}
		document.getElementById("bildspel").style.backgroundImage = "url('" + array[nr] + "')";
		$("#bildspel").fadeIn(500);	
	}

	var bild1 = "../IMG/modell(8).jpg";
	var bild2 = "../IMG/modell(9).jpg";
	function bilder()
	{
		number++;
		if(number == 2)
		{
			number = 0;
			document.getElementById("bild").src = bild1;
		}
		else
		{
			document.getElementById("bild").src = bild2;
		}
	}

});