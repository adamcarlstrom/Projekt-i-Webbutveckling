$(document).ready(function(){

	//Resetar variabler när sidan laddas upp
	var id = 0;
	var clr = 0;
	var nr = 1;
	var score = 0;
	var time1 = 3;
	var best = 0;
	var arr = 0;
	var total = 0;
	var interval, top, left, timer, time, math;

	//Gör så att denna nav och aside blir gömda när sidan laddas upp.
	load();
	function load(){
		$("#asideD").css("display", "none")
		$("#navD").css("display", "none")
	}

	/*Gör så att ifall man trycker på sectionen så börjar spelet. Gör 
	också så att ifall man råkar att trycka på sectionen under spelets gång 
	så sker inget. Utseendet här ändras och en timer räknar ner från 3 till
	0 för att visa när spelet börjar. Detta görs genom att en interval 
	på 1 sekund uppdaterar funtionen mytimer2 som gör detta. Samtidigt
	så sätts funtionen mytimer igång efter dessa 3 sekunder. */
	$("section").click(function(){
		clr++;
		if (clr == 1){
			$("#secH2").html("Börjar om " + time1);
			$("#secP").html("Tryck på bilderna så snabbt du kan!");
			time = setInterval(myTimer2, 1000);
			timer = setTimeout(myTimer, 3000);
			$("section").css("background-color", "#C76C67");
		}
	});

	/*Här så har spelet börjar och utseendet ändras för att visa detta. 
	En interval används för att uppdatera funktionen mytimer 3 som visar och
	uppdaterar ens tid. Samtidigt så gör den så att en bild visas som är 
	positionerad slumpmässigt inom spelrutan genom margins. */
	function myTimer(){
		$("section").css("background-color", "#AAD7F9");
		clr = 2;
		$("#secH2").css("display", "none");
		interval = setInterval(myTimer3, 7);
		$("#img").css("display", "block");
		top = Math.random()*45 +10;
		top = Math.floor(top);
		top = top + "vh";
		left = Math.random()*60;
		left = Math.floor(left);
		left = left + "vw";
		document.getElementById("img").style.marginTop = top;
		document.getElementById("img").style.marginLeft = left;
	}

	function myTimer2(){
		$("#secH2").html("Börjar om " + time1);
		time1 -= 1;
		$("#secH2").html("Börjar om " + time1);
	}

	function myTimer3(){
		clearInterval(time);
		score += 7;
		$("#secP").html("Tryck på bilderna så snabbt du kan! " + score + " ms");
	}

	/*Den här funktionen är kopplad till bilderna så att när man trycker på
	dem så uppdateras denn funktione. Variabeln nr addar 1 på sig själv 
	varje gång för att visa vilket nummer man ligger på. Sen används if
	satser för att se ifall nr är mindre eller större än 10. Ifall den är
	mindre än 10 så gör den så att den ändrar bilden för att visa vilket 
	nummer man är på samtidigt som den slumpmar bildens position inom rutan igen.
	Ifall nr är större än 10 så avslutas spelet och man får se sin tid samtidigt
	som utseendet ändras för att visa att spelet är slut. */
	$("#img").click(function(){
		nr++;
		if(nr <= 10){
		$("#img").attr("src", "../IMG/" + nr + "nr.png");
		top = Math.random()*45 +10;
		top = Math.floor(top) ;
		top = top + "vh";
		left = Math.random()*60;
		left = Math.floor(left);
		left = left + "vw";
		document.getElementById("img").style.marginTop = top;
		document.getElementById("img").style.marginLeft = left;
		}
		else if(nr == 11){
			clearInterval(interval);
			nr = 1;
			$("#img").attr("src", "../IMG/" + nr + "nr.png")
			$("#img").css("display", "none");
			$("section").css("background-color", "#4B8EC4");
			$("#secH2").css("display", "block");
			$("#secH2").html("Din tid: " + score + " ms");
			if(best == 0){
				best = score;
				$("#secP").html("Bra tid! Tryck för att börja om igen.");
				$("#asideH3").html("Bästa tid: " + best + " ms");
				$("aside").css("border", "solid 3px #AAEDEF");
			}
			/*Samtidigt så använder jag flera if satser för att kolla ifall
			ens tid är mindre än ens bästa tid eller ifall det är ens första 
			försök på detta spel. Ifall ens tid är bättre än ens bästa 
			tid så uppdateras den och visar att man har fått ett nytt rekord.*/
			else if(best >= score){
				best = score;
				$("#secP").html("Nytt rekord! Tryck för att börja om igen.");
				$("#asideH3").html("Bästa tid: " + best + " ms");
				$("aside").css("border", "solid 3px #AAEDEF");
			}
			else{
				$("#secP").html("Bra gjort! Tryck för att börja om igen.");
				$("aside").css("border", "none");
			}

			/*här resettar jag variablerna så att man kan spela om spelet
			samtidigt som jag visar ens tid inom asideD så att man kan
			på alla sina tider under denna omgång. Samtidigt så använder jag
			lite matte för att beräkna ens genomsnittstid som också visas 
			i asideD.*/
			arr++;
			text = "<p>" + arr + ". " + score + " ms </p>";
			$("#asideD").append(text);
			total += score;
			math = total / arr;
			math = Math.floor(math);
			$("h4").html("Genomsnitts tid: " + math + " ms");
			clr = -1;
			time1 = 3;
			score = 0;

		}
	});

	/*Dessa funtioner gör så att när man trycker på knappen vid naven
	så visas navD som visar information om spelet. Ifall man sedan
	trycker på knappen igen eller lämnar naven så försvinner den.
	Samtidigt gör de så att ifall man hovrar över aisden så visas
	aisdeD som visar ens tider och ifall man lämnar den försvinner den 
	också.*/
	$("#navD").mouseleave(navD);
	$("#navB").click(navD);
	function navD(){
		id++;
		if(id == 1){
			document.getElementById("navD").style.display = "block";
			document.getElementById("navB").innerHTML = "Mindre";
		}
		else{
			id = 0;
			document.getElementById("navD").style.display = "none";
			document.getElementById("navB").innerHTML = "Mer";
		}
	}

	$("nav").mouseleave(function(){
		document.getElementById("navD").style.display = "none";
		document.getElementById("navB").innerHTML = "Mer";
		id = 0;
	});

	$("#aside").mouseenter(function(){
		document.getElementById("asideD").style.display = "block";
	});

	$("#aside").mouseleave(function(){
		document.getElementById("asideD").style.display = "none";
	});

});