const clues = [
    "The treasure is hidden somewhere in the forest.",
    "There is a river that runs through the forest.",
    "The treasure is buried under a large rock.",
    "The treasure is guarded by a snake.",
    "The treasure is located near a tree with a heart-shaped trunk."
  ];
  
  const deadEnds = [
    "If you cross the river, you will be attacked by a tribe of cannibals.",
    "If you dig under a tree with a heart-shaped trunk, you will find nothing but dirt."
  ];
  
  let currentStep = 0;
  
  document.getElementById("input-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const userInput = document.getElementById("input").value.toLowerCase();
    let resultText = "";
    
    switch(currentStep) {
      case 0:
        if(userInput === "cross river") {
          resultText = deadEnds[0];
          currentStep = -1;
        } else if(userInput === "dig under tree") {
          resultText = deadEnds[1];
          currentStep = -1;
        } else if(userInput === "look for a large rock" || userInput === "look for rock" ) {
          resultText = "You found the large rock!";
          currentStep = 1;
        } else {
          resultText = "Invalid move. Please try again.";
        }
        break;
      case 1:
        if(userInput === "move the rock" || userInput === "move the large rock") {
          resultText = "You moved the rock and found the treasure!";
          updatescore();
          currentStep = 2;
        } else {
          resultText = "Invalid move. Please try again.";
        }
        break;
      default:
        resultText = "Game over. Please refresh the page to try again.";
    }
    
    document.getElementById("result").textContent = resultText;
    document.getElementById("input").value = "";
  });
  if(localStorage.getItem("mypuzzletoken2")==undefined){
		window.location.href = "login.html";
	}
  async function updatescore(){
    const response2 = await fetch(
      `https://puzzle123.onrender.com/auth/getuser`,
      {
        method: "POST",
  
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("mypuzzletoken2")
        },
  
      }
    );
    const json2 = await response2.json();
	console.log(json2)
	let email = json2.email;
	//console.log(email)

	const response = await fetch(
		`https://puzzle123.onrender.com/auth/updatescore`,
		{
			method: "POST",

			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: email,score:23}),
		}
	);
	const json = await response.json();

	if (json.sucess) {
		window.location.href = "leaderboard.html";

	}
	else {
		alert("something went wrong please restart the game")
	}
}
