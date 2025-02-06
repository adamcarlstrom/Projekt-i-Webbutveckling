$(document).ready(function(){

	//Resetar variabler när sidan laddas upp
	var id = 0;
	var clr = 0;
	var best = 0;
	var score = 0;
	var arr = 0;
	var total = 0;
	var time, timer, interval, j, i, temp, text, math;

	//Gör så att denna nav och aside blir gömda när sidan laddas upp.
	document.getElementById("navD").style.display = "none";
	document.getElementById("asideD").style.display = "none";

	/*Function load gör så att några bilder med namn #eye.jpg visas i en
	slumpmässig ordning. Detta görs genom att jag skapar en array med 
	4 i sig eftersom jag har 4 bilder som jag sedan kopplar till en for loop
	flr att ge alla imagesarr[i] ett riktigt värde eller src som används senare.
	Sedan går det in i en annan for loop som gör så att bilderna byter plats
	med varann eller byter egentligen ordning i arrayn. Detta är helt slumpmässigt
	så ordningen bilderna kommer upp i kommer vara slumpmässig. Till slut
	kopplas det till en sista for loop som gör så att dessa bilder sätts in i html
	koden och visas på hemsidan som dem ska. */
	load();
	function load(){
		var imagesArr = new Array(4);
		for(i = 0; i <= imagesArr.length -1; i++){
			imagesArr[i] = "../IMG/" + (i+1) + "eye.jpg";
		}
		for(i = imagesArr.length - 1; i > 0; i--){
			j = Math.floor(Math.random()* (i+1));
			tmp = imagesArr[i];
			imagesArr[i] = imagesArr[j];
			imagesArr[j] = tmp;
		}
		for(i = 0; i < imagesArr.length; i++){
			$("#section").prepend("<img src='" + imagesArr[i] + "' class='bild' alt='bild'>");
		}
	}

	/*denna funktion sätts igång när section ("börja") är tryckt på. 
	Då adderas det 1 på variabeln clr och sedan kopplar 
	till funktionen mytimer. Anledningen till varför clr adderar 1 varje gång
	sectionen är tryckt på är så att man inte fuskar och trycker på
	sectionen innan den bytt färg till grön där man egentligen ska reagera och trycka. */
	$("section").click(function(){
		clr++;
		myTimer();
	});

	function myTimer(){
		/*Funktionen börjar med en if sats för att se vilket värde clr har för
		att se ifall man fuskat eller spelat spelet som man ska. Ifall clr är 1
		så är det här början av spelet och utseendet ändras för att visa att spelet
		har börjat med att rutan blir röd. Sedan sätts en timer igång som är 
		slumpmässig mellan 0,5 sekunder till 3 sekunder lång. Detta är så 
		att man inte ska kunna förutse när rutan går från röd till grön
		så att man verkligen behöver reagera. Detta är då kopplat till 
		mytimer2() som sedan sätter igång spelet.*/
		if(clr == 1){
			score = 0;


			$(".bild").css("display", "none");
			$("#secH2").html(". . .");
			$("#secH2").css("text-decoration", "none");
			$("#secP").html("Tryck bara när rutan blir grön");
-			$("section").css("background-color", "#C76C67");

			time = Math.random()*3000 + 500;
			time = Math.floor(time);
			timer = setTimeout(myTimer2, time);
		}
		/*Ifall clr är 2 så har personen tryckt för tidigt, alltså har man 
		tryckt en gång för att starta och sedan en gång till innan rutan blitt
		grön. Detta är fusk och därför ändrar jag utseendet för att visa
		att man fuskat och får börja om igen. Jag stänger också av timern till
		funktionen mytimer2 så att den inte fortsätter spelet ändå. Sedan resettar
		jag några variabler så att användaren kan försöka spelet igen. */
		else if(clr == 2){
			score = 0;
			$(".bild").css("display", "none")
			$("#secH2").html("Du tryckte för tidigt!");
			$("#secH2").css("text-decoration", "none");
			$("#secP").html("Tryck för att börja om igen");
			$("section").css("background-color", "#69686E");

			clearTimeout(timer);
			clr = 0;
		}
		/*Ifall clr är 3 så har spelarn väntat tillräckligt länge utan att försöka
		fuska. Då ändrar jag på utseendet och gör rutan grön så att användaren
		vet att man behöver reagera och trycka nu så snabbt som möjligt. Samtidigt
		så kopplar jag till funktionen mytimer3 som uppdateras var 7e millisekund
		som då visar och uppdaterar ens tid.*/
		else if(clr == 3){
			$(".bild").css("display", "none");
			$("section").css("background-color", "#86FA82");
			$("#secH2").html("Tryck nu!");
			$("#secP").html(" ");
			interval = setInterval(myTimer3, 7);
		}
		/*Ifall clr är 4 så har användaren tryckt när rutan var grön som man
		ska och är klar med en runda av spelet. Då börjar jag med att ändra
		på utseendet för att visa att man är klar och visar ens tid. 
		Samtidigt så använder jag flera if satser för att kolla ifall
		ens tid är mindre än ens bästa tid eller ifall det är ens första 
		försök på detta spel. Ifall ens tid är bättre än ens bästa 
		tid så uppdateras den och visar att man har fått ett nytt rekord.*/
		else if(clr == 4){
			arr++;
			clearInterval(interval);
			$(".bild").css("display", "inline-block");
			$("section").css("background-color", "#4B8EC4");
			$("#secH2").html(score + " ms");

			if(best == 0){
				best = score;
				$("#secP").html("Bra tid! Tryck för att börja om igen.");
				$("#asideH3").html("Bästa tid: " + best + " ms");
				$("aside").css("border", "solid 3px #AAEDEF");
			}
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
			
			/*här resettar jag clr så att man kan spela om spelet
			samtidigt som jag visar ens tid inom asideD så att man kan
			på alla sina tider under denna omgång. Samtidigt så använder jag
			lite matte för att beräkna ens genomsnittstid som också visas 
			i asideD.*/
			clr = 0;

			text = "<p>" +  arr + ". " + score + " ms </p>";
			$("#asideD").append(text);

			total += score;
			math = total / arr;
			math = Math.floor(math);
			$("h4").html("Genomsnitts tid: " + math + " ms");
		}
		/*Ifall clr är något annat än de tidigare if satserna sagt så visas
		så ändras utseendet för att nästan matcha början och gör så att
		man kan börja om spelet igen. */
		else{
			document.getElementById("secH2").innerHTML = "Börja igen";
			document.getElementById("secP").innerHTML = "Tryck för att börja, när den går över från grön till röd ska du trycka på rutan så snabbt du kan.";
			$(".bild").css("display", "inline-block");
			$("section").css("background-color", "#B1B5C4");


			clr = 0;
		}
	}

	function myTimer2(){
		clr += 2;
		myTimer();
	}

	function myTimer3(){
		score += 7;
		$("#secP").html(score + " ms");
	}


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