// Incorporate that if the player does not have enough money for doubling then he must not be able to click the double icon, I mean dude just deactivate double icon in that case!
var total_bet;
var player_hand_value;
var player_hand_value2;
var wallet=0;
var dealer_hand_value;
var dealer_hand_value2;
var phita; // Basically, it will help in printing if any of 2 cards in dealing is Ace!
var dhita;
var dhitf_for_card1;
var player_blackjack;
var initial_amount;
var flag_error_handler=1;
function global_variable_initializer()
{
	if(flag_error_handler==1)
		{
			wallet=localStorage.getItem("storageName");
			flag_error_handler=0;
		}
	initial_amount=wallet;
	total_bet=0;
}

function bet_amount_displayer(bet)
{   
	// Need to implement the fact that the chips can only be clicked if wallet contains clickable amount for the respective chips!
	if(bet<=wallet)
		{
			total_bet+=bet;
			wallet-=bet;
			document.getElementById("demo_for_bet_amount_and_wallet_amount").innerHTML="Bet is "+total_bet+"! Remaining amount in wallet is "+wallet;
			
		}
	else{
			document.getElementById("demo_for_bet_amount_and_wallet_amount").innerHTML="Insufficient balance in wallet! Balance is "+wallet+" ! You entered "+bet+" !";	
	}
}

function amount_redisplayer()
{
	document.getElementById("demo_for_bet_amount_and_wallet_amount").innerHTML="Bet is "+total_bet+"! Remaining amount in wallet is "+wallet;
}

function bet_doubler(){
	if(total_bet*2<=wallet)
		{
			wallet-=total_bet;
			total_bet*=2;
			document.getElementById("demo_for_bet_amount_and_wallet_amount").innerHTML="Bet is "+total_bet+"! Wallet amount is "+wallet;	
		}
	else{
			document.getElementById("demo_for_bet_amount_and_wallet_amount").innerHTML="Insufficient Balance in wallet -> "+wallet;
	}
}

function random_suit_selector() {
  return Math.floor(Math.random() * (4 - 1)) + 1;
}

function random_card_selector() {
  return Math.floor(Math.random() * (13 - 1)) + 1;
}

function random_card_generator(x)
{
    var suit=random_suit_selector();
    var card=random_card_selector();
	var f_card_for_bj=0;
	if(x=='player')
		{
			if(card==11||card==12||card==13)
				{
					player_hand_value+=10;
					player_hand_value2+=10;
					f_card_for_bj=1;
				}
			else if(card!=1)
				{
					player_hand_value+=card;
					player_hand_value2+=card;
				}
			else{
				player_hand_value+=1;
				player_hand_value2+=11;
			}	
		}
	if(x=='dealer')
		{
			if(card==11||card==12||card==13)
			{
				dealer_hand_value+=10;
				dealer_hand_value2+=10;
				f_card_for_bj=1;				
			}
			else if(card!=1)
			{
				dealer_hand_value+=card;
				dealer_hand_value2+=card;
			}
			else{
				dealer_hand_value+=1;
				dealer_hand_value2+=11;
			}
		}
	
    return suit+" "+card+" "+f_card_for_bj;
}

function deal_card_displayer()
{
	pm_dm_activator();
	player_hand_value=0;
	player_hand_value2=0;
	phita=0;
	dealer_hand_value=0;
	dealer_hand_value2=0;
	dhita=0;	
	dhitf_for_card1=0;
	chips_deactivator();
	
    
	var a=random_card_generator('player');
    var b=a.split(" ");
    var c=parseInt(b[1]);					// It is for Ace consideration  for Card 1 of player!
	var d=parseInt(b[2]);					// It is for face-card in blackjack  for Card 1 of player!
    document.getElementById("player_random_card1").src="images/deck/"+b[0]+"/"+b[1]+".PNG";
    
	
    var e=random_card_generator('player');
    var f=e.split(" ");
    var g=parseInt(f[1]);					// It is for Ace consideration  for Card 2 of player!
	var h=parseInt(f[2]);					// It is for face-card in blackjack  for Card 2 of player!
    document.getElementById("player_random_card2").src="images/deck/"+f[0]+"/"+f[1]+".PNG";

	var z=pair_checker(c,g);
	if(z==1)
		{
			// Write the code to place both cards on a distance.
			splitter();
		}
	else if(z==2)	// ace splitting.
		{
			// HI!
		}
	
	else{
		
			//Dealer's
			var i=random_card_generator('dealer');
			var j=i.split(" ");
			var k=parseInt(j[1]);					// It is for Ace consideration for Card 1 of Dealer!
			var l=parseInt(j[2]);					// It is for face-card in blackjack for Card 1 of Dealer!!
			document.getElementById("dealer_random_card1").src="images/deck/"+j[0]+"/"+j[1]+".PNG";

			//Below line is for the face-down side of the dealer's card!
			document.getElementById("dealer_random_card2").src="images/deck/flip_side/face_down.PNG";


			if(k==1)	
			{
				document.getElementById("dealer_demo").innerHTML="HAND VALUE IS -> "+dealer_hand_value+"/"+dealer_hand_value2;
				dhita=1;		
			}
			else{
				document.getElementById("dealer_demo").innerHTML="HAND VALUE IS -> "+dealer_hand_value;
			}	
			if(l==1)
				{
					dhitf_for_card1=1;
				}

			if(c==1||g==1)
			{
				document.getElementById("player_demo").innerHTML="HAND VALUE IS -> "+player_hand_value+"/"+player_hand_value2;
				phita=1;

				if(d==1||h==1)		//Blackjack checking for player.
				{
					//Yes.player has a blackjack!
					player_blackjack=1;
				}

			}
			else{
				document.getElementById("player_demo").innerHTML="HAND VALUE IS -> "+player_hand_value;
			}

			if(player_blackjack==1)
				{
					var x=blackjack_checking_for_dealer();
					if(x==1)
					{
						blackjack('player');
					}
					else
					{
						push();
					}
				}

			}
}

function player_hit_card_displayer(id_hit_card,for_player)
{
	hit_card_displayer(id_hit_card,for_player);
}

function dealer_hit_card_displayer(id_hit_card,for_dealer)
{
	hit_card_displayer(id_hit_card,for_dealer);
}

function hit_card_displayer(id_hit_card,for_hand_value)
{
	var a=random_card_generator(for_hand_value);
    var b=a.split(" ");
    var c=parseInt(b[1]);
    document.getElementById(id_hit_card).src="images/deck/"+b[0]+"/"+b[1]+".PNG";
	
	
	if(player_hand_value>21)
		{
			busted('player');
			// Apply some sort of initialization of money by user thing, 
			// And resume with same money thing!
		}

	if(dealer_hand_value>21)
	{
		busted('dealer');
	}	
	
	if(for_hand_value=='player')
		{
			if(c==1||phita==1)
			{
				if(player_hand_value2<22)
				{
					document.getElementById('player_demo').innerHTML="HAND VALUE IS -> "+player_hand_value+"/"+player_hand_value2;
				}
				else
				{
					document.getElementById('player_demo').innerHTML="HAND VALUE IS -> "+player_hand_value;
				}
			}
			else
			{
				document.getElementById('player_demo').innerHTML="HAND VALUE IS -> "+player_hand_value;
			}
		}
	

	if(for_hand_value=='dealer')
		{
			if(c==1||dhita==1)
			{
				document.getElementById('dealer_demo').innerHTML="HAND VALUE IS -> "+dealer_hand_value+"/"+dealer_hand_value2;
			}
			else
			{
				document.getElementById('dealer_demo').innerHTML="HAND VALUE IS -> "+dealer_hand_value;
			}
		}	

}

function blackjack(person)
{
	stand_deactivator();
	hit_deactivator();
	button_activator();
	if(person=='player')
		{
			wallet+=2.5*total_bet;
			// Implement either a page or window exhibiting exitement for blackjack and somewhat clicking on it will result in replay but with added wallet amount.
			document.getElementById("demo_for_bet_amount_and_wallet_amount").innerHTML="Congratulations! Wallet occupies "+wallet+"!";	
			document.getElementById("bottom").innerHTML="CONGRATS, BLACKJACK!";
			button_activator();
			play_again_activator();
		}
}

function blackjack_checking_for_dealer()
{
    var m=random_card_generator('dealer');
    var n=m.split(" ");
    var o=parseInt(n[1]);					// It is for Ace consideration for Card 2 of Dealer!
	var p=parseInt(n[2]);					// It is for face-card in blackjack for Card 2 of Dealer!
    document.getElementById("dealer_random_card2").src="images/deck/"+n[0].toString()+"/"+n[1].toString()+".PNG";
	
	if(o==1||dhita==1)
	{
		document.getElementById("dealer_demo").innerHTML="HAND VALUE IS -> "+dealer_hand_value+"/"+dealer_hand_value2;
		if(p==1||dhitf_for_card1==1)
			{
				return 0;
			}
	}
	else
	{
		document.getElementById("dealer_demo").innerHTML="HAND VALUE IS -> "+player_hand_value;
		button_activator();
		play_again_activator();
	}
	return 1;
}


function push()
{
	wallet+=total_bet;
	total_bet=0;
	document.getElementById("bottom").innerHTML="NO WINS OR LOSSES!";
	button_activator();
	play_again_activator();
}

function stand()
{
	//Dealer's Second Card!
    var i=random_card_generator('dealer');
    var j=i.split(" ");
    var k=parseInt(j[1]);					// It is for Ace consideration for Card 1 of Dealer!
	var l=parseInt(j[2]);					// It is for face-card in blackjack for Card 1 of Dealer!!
    document.getElementById("dealer_random_card2").src="images/deck/"+j[0]+"/"+j[1]+".PNG";	
	if(k==1||dhita==1)
		{
			document.getElementById("dealer_demo").innerHTML="HAND VALUE IS -> "+dealer_hand_value+"/"+dealer_hand_value2;
			dhita=1;		
		}
	else{
			document.getElementById("dealer_demo").innerHTML="HAND VALUE IS -> "+dealer_hand_value;
		}	
	if(l==1)
		{
			dhitf_for_card1=1;
		}
	
	if(dealer_hand_value<17)
		{
			    var a=random_card_generator('dealer');
				var b=a.split(" ");
				var c=parseInt(b[1]);					// It is for Ace consideration for Card 1 of Dealer!
				var d=parseInt(b[2]);					// It is for face-card in blackjack for Card 1 of Dealer!!
				document.getElementById("dealer_hit_card1").src="images/deck/"+b[0]+"/"+b[1]+".PNG";	
				if(c==1||dhita==1)
				{
					document.getElementById("dealer_demo").innerHTML="HAND VALUE IS -> "+dealer_hand_value+"/"+dealer_hand_value2;
					dhita=1;		
				}
			else{
					document.getElementById("dealer_demo").innerHTML="HAND VALUE IS -> "+dealer_hand_value;
				}
				if(dealer_hand_value>21)
				{
					busted('dealer');
				}
		}
	
	if(dealer_hand_value<17)
		{
			    var e=random_card_generator('dealer');
				var f=e.split(" ");
				var g=parseInt(f[1]);					// It is for Ace consideration for Card 1 of Dealer!
				var h=parseInt(f[2]);					// It is for face-card in blackjack for Card 1 of Dealer!!
				document.getElementById("dealer_hit_card2").src="images/deck/"+f[0]+"/"+f[1]+".PNG";	
				if(g==1||dhita==1)
				{
					document.getElementById("dealer_demo").innerHTML="HAND VALUE IS -> "+dealer_hand_value+"/"+dealer_hand_value2;
					dhita=1;		
				}
			else{
					document.getElementById("dealer_demo").innerHTML="HAND VALUE IS -> "+dealer_hand_value;
				}
				if(dealer_hand_value>21)
				{
					busted('dealer');
				}
		}
	
	if(dealer_hand_value<17)
		{
			    var m=random_card_generator('dealer');
				var n=m.split(" ");
				var o=parseInt(n[1]);					// It is for Ace consideration for Card 1 of Dealer!
				var p=parseInt(n[2]);					// It is for face-card in blackjack for Card 1 of Dealer!!
				document.getElementById("dealer_hit_card2").src="images/deck/"+n[0]+"/"+n[1]+".PNG";	
				if(o==1||dhita==1)
				{
					document.getElementById("dealer_demo").innerHTML="HAND VALUE IS -> "+dealer_hand_value+"/"+dealer_hand_value2;
					dhita=1;		
				}
			else{
					document.getElementById("dealer_demo").innerHTML="HAND VALUE IS -> "+dealer_hand_value;
				}
				if(dealer_hand_value>21)
				{
					busted('dealer');
				}
		}
	
	pay_offs();
}

/*
    <img class="stand" src="images/chips_and_events/stand.PNG" alt="Stand_image is missing!" onclick="dealer_hit_card_displayer('dealer_hit_card','dealer')">
*/

function dealer_avoiding_soft_17()
{
	var i=random_card_generator('dealer');
    var j=i.split(" ");
    var k=parseInt(j[1]);				
    document.getElementById("dealer_hit_card").src="images/deck/"+j[0]+"/"+j[1]+".PNG";	
	if(dealer_hand_value>21)
		{
			busted('dealer');
		}
	
	else if(k==1||dhita==1)
		{
			dhita=1;
			if(dealer_hand_value2>21)
				{
					document.getElementById("dealer_demo").innerHTML="HAND VALUE IS -> "+dealer_hand_value;
				}
			else{
					document.getElementById("dealer_demo").innerHTML="HAND VALUE IS -> "+dealer_hand_value+"/"+dealer_hand_value2;
			}
		}
	else 
		{
			document.getElementById("dealer_demo").innerHTML="HAND VALUE IS -> "+dealer_hand_value;
		}
}

function pay_offs()
{
	var final_player_hand=0;
	var final_dealer_hand=0;
	final_player_hand=(player_hand_value2>21) ? player_hand_value : player_hand_value2;
	final_dealer_hand=(dealer_hand_value2>21) ? dealer_hand_value : dealer_hand_value2;
	if(final_player_hand>final_dealer_hand)
		{
			wallet+=2*total_bet;
			window.open('images/gifs/congrats.webp','my_window','height=400,width=400,top=400,left=400');
			document.getElementById("demo_for_bet_amount_and_wallet_amount").innerHTML="Congratulations! Wallet occupies "+wallet+"!";
			document.getElementById("bottom").innerHTML="PLAYER WINS!"
			button_activator();
			play_again_activator();
		}
	if(final_dealer_hand>final_player_hand&&final_dealer_hand<=21)
		{
			sleeper_demo();
			document.getElementById("demo_for_bet_amount_and_wallet_amount").innerHTML="You have lost! Wallet occupies "+wallet+"!";
			document.getElementById("bottom").innerHTML="CASINO WINS!";
			button_activator();
			play_again_activator();
		}
	
	if(final_dealer_hand==final_player_hand){
		push();
		button_activator();
		play_again_activator();
	}
	
}


function busted(person)
{
	stand_deactivator();
	hit_deactivator();
	if(person=='player')
		{
			// Implement either a page or window for rebetting!		
			document.getElementById("demo_for_bet_amount_and_wallet_amount").innerHTML="You are busted! Wallet occupies "+wallet+"!";	
			document.getElementById("bottom").innerHTML="Player is busted!";
			button_activator();
			play_again_activator();
		}
	else{
			wallet+=2*total_bet;
			document.getElementById("demo_for_bet_amount_and_wallet_amount").innerHTML="Congratulations, Dealer is busted! Wallet occupies "+wallet+"!";	
			document.getElementById("bottom").innerHTML="Dealer is busted!"
			button_activator();
			play_again_activator();
	}
	
}

function splitter()
{
	
}

function splitting_aces()
{
	
}

function chips_activator()		// As soon as game starts, chips should get clickable!
{
	document.getElementById("chip_100").src="images/chips_and_events/100_chip.PNG";
	document.getElementById("chip_500").src="images/chips_and_events/500.PNG";
	document.getElementById("chip_2500").src="images/chips_and_events/2500_chip.PNG";
	document.getElementById("chip_10K").src="images/chips_and_events/10K_chip.PNG";
	
	document.getElementById("chip_100").onclick = function () {bet_amount_displayer(100);deal_and_double_event_activator();};
	document.getElementById("chip_500").onclick = function () {bet_amount_displayer(500);deal_and_double_event_activator();};
	document.getElementById("chip_2500").onclick=function () {bet_amount_displayer(2500);deal_and_double_event_activator();};
	document.getElementById("chip_10K").onclick=function () {bet_amount_displayer(10000);deal_and_double_event_activator();};
}

function chips_deactivator()	//	As soon as only deal is clicked, chips should get unclickable!
{
	document.getElementById("chip_100").src="images/faded_chips/100.PNG";
	document.getElementById("chip_500").src="images/faded_chips/500.PNG";
	document.getElementById("chip_2500").src="images/faded_chips/2500.PNG";
	document.getElementById("chip_10K").src="images/faded_chips/10K.PNG";
	
	document.getElementById("chip_100").onclick="";
	document.getElementById("chip_500").onclick="";
	document.getElementById("chip_2500").onclick="";
	document.getElementById("chip_10K").onclick="";
}

function pair_checker(c,g)
{
	/*if(c==g)
		{
			if(c==1)
				{
					return 2;
				}
			return 1;
		}
	
	else{
	
		}
	*/
	return 0;
	
}


function button_clicked()
{
	global_variable_initializer();
	chips_activator();
	button_deactivator();
	document.getElementById("bottom").innerHTML="";
}

function button_deactivator()
{
	document.getElementById("play_button").disabled = true;
	document.getElementById("play_button").style.backgroundColor="#000000";
}

function button_activator()
{
	document.getElementById("play_button").disabled=false;
	document.getElementById("play_button").style.backgroundColor="#A52A2A";
}
function deal_and_double_event_activator()
{
	document.getElementById("double").src="images/chips_and_events/double.PNG";
	document.getElementById("deal").src="images/chips_and_events/deal.PNG";
	
	document.getElementById("double").onclick = function () {bet_doubler();};
	document.getElementById("deal").onclick = function () {deal_card_displayer();double_deactivator();hit_and_stand_activator();deal_deactivator();};
}

function deal_deactivator()
{
	
	document.getElementById("deal").src="images/faded_events/deal.PNG";	
	document.getElementById("deal").onclick="";
	
}
function double_deactivator()
{
	document.getElementById("double").src="images/faded_events/double.PNG";
	document.getElementById("double").onclick="";
}
function hit_and_stand_activator()
{
	document.getElementById("hit").src="images/chips_and_events/hit.PNG";
	document.getElementById("stand").src="images/chips_and_events/stand.PNG";
	
	document.getElementById("hit").onclick = function () {player_hit_card_displayer('player_hit_card','player');deal_deactivator();};
	document.getElementById("stand").onclick = function () {stand();hit_deactivator();deal_deactivator();stand_deactivator();};	
}
function hit_deactivator()
{
	document.getElementById("hit").src="images/faded_events/hit.PNG";
	document.getElementById("hit").onclick="";
}
function stand_deactivator()
{
	document.getElementById("stand").src="images/faded_events/stand.PNG";
	document.getElementById("stand").onclick="";
}

function openpopup()
    {
         var mywindow = window.open('images/rules.PNG','my window','height=700,width=700,top=400,left=400');
    }
			 
function eligibility_checker()
	{
		var a=document.getElementById("text_input").value;
	    var b=parseInt(a);
		if(b<100)
			{
				window.alert("Oops! I think you need at least 100 Rs cash!"); 
			}
		if(b>=100){
					localStorage.setItem("storageName",b);
					window.alert("BEST OF LUCK!\nNow, you may proceed!");
					document.getElementById("linker").href="main.html";
				  }
	}

function exiting()
{
	if(wallet>initial_amount)
		{
			window.open('images/gifs/congrats.webp','my_window','height=250,width=250,top=200,left=500');
		}
	else{
			window.open('images/gifs/next_time.gif','my_window','height=250,width=250,top=100,left=500');
	}
	document.getElementById("finally_leaving").href="index.html";
}

/*

function sleep(ms)
{
	return new Promise(resolve => setTimeout(resolve,ms));
}
			
async function sleep_demo()
{
	await sleep(5000);
}
	
*/

function replay()
{
	document.getElementById("player_random_card1").src="";
	document.getElementById("player_random_card2").src="";
	document.getElementById("player_hit_card").src="";
	
	document.getElementById("dealer_random_card1").src="";
	document.getElementById("dealer_random_card2").src="";
	document.getElementById("dealer_hit_card1").src="";
	document.getElementById("dealer_hit_card2").src="";
	document.getElementById("dealer_hit_card3").src="";
	 
	document.getElementById("player_demo").innerHTML="";
	document.getElementById("dealer_demo").innerHTML="";
	document.getElementById("demo_for_bet_amount_and_wallet_amount").innerHTML="Remaining amount in wallet is -> "+wallet;
	document.getElementById("bottom").innerHTML="";
}

function play_again_activator()
{
	document.getElementById("again_play").onclick= function () {replay();pm_dm_deactivator();};
}

function pm_dm_activator()
{
	document.getElementById("pm").innerHTML="PLAYER'S CARDS -> ";
	document.getElementById("dm").innerHTML="DEALER'S CARDS -> ";
}

function pm_dm_deactivator()
{
	document.getElementById("pm").innerHTML="";
	document.getElementById("dm").innerHTML="";
}

function sleep(ms)
		{
			return new Promise(resolve => setTimeout(resolve,ms));
		}
	
async function sleeper_demo()
		{
			await sleep(20000);
		}