console.log("hi there");
// get the hand clickde
// animate it to the right position
// computer time to choose  and choose
// computer choose
// an algorithm showing prevelance


//global handinfo

//active handsign
let hand = null;
let comphand = null;
let score = 0;
const handsignContainer = document.querySelector(".handsign");
const handsignActive =  document.querySelector('.handsignActive');
const allhands = document.querySelectorAll(".handsign__sign");
const userChoice = document.querySelector(".handsignActive__player--user");
const compChoice = document.querySelector(".handsignActive__player--comp").children[1].children[0];
const resetButton = document.querySelector(".decision__button");
const decision = document.querySelector('.decision');

document.querySelector(".gamerules-modal").addEventListener("click",()=>{
    window.location.href="#";
})
resetButton.addEventListener('click',()=>{
    resetToDefault();
})
handsignContainer.addEventListener('click',(e)=>{
    const handsign = e.target.closest('.handsign__sign');
    hand = handsign.id;
    displayActiveView(hand,handsign);
    changeActiveHtml();
});

// VIEW
const displayActiveView = (hand,handsign)=>{
    if(!hand){
        return
    }
    //turn others into opacity 0    
    allhands[0].classList.add("fade");
    allhands[1].classList.add("fade");
    allhands[2].classList.add("fade");
    allhands[3].classList.add("fade");
    allhands[4].classList.add("fade");
    //display
    handsign.classList.add("active");
    setTimeout(()=>{
        toggleView(true)
    },1000)
}
const changeActiveHtml = ()=>{
    // change the img of the active
    userChoice.insertAdjacentHTML("beforeend",`<div class="prewinner prewinner--user"><div class='handsign__sign handsign__sign--choice handsign__sign--${hand}'><img src='images/icon-${hand}.svg' alt='${hand}'/></div></div>`)
    //
    comphand = randomChoice();
    setTimeout(()=>{
        compChoice.className = `handsign__sign handsign__sign--choice handsign__sign--${comphand}`;
        compChoice.innerHTML=`<img src='images/icon-${comphand}.svg' alt='${comphand}'/>`;
        const didWin = calculateWinner();
        //add active to somone's class
        if(didWin === "win"){
            userChoice.querySelector(".prewinner").insertAdjacentHTML("afterbegin","<div class='winner'></div>")
            boardView("WIN");
        }else if(didWin === "lose"){
            compChoice.insertAdjacentHTML("beforebegin","<div class='winner'></div>")
            boardView("LOSE");
        }else{
            boardView("DRAW");
        }
        scoreView()
    },0)
}
const scoreView = ()=>{
    //change score board
    document.querySelector(".game__scorenum").innerText = score;
}
const boardView = (text)=>{
    //display view and set to value
    decision.classList.add("decisionactive");
    decision.children[0].innerText = "YOU "+text;
}  











//CONTROLLERS

const randomChoice = ()=>{
    return ["rock","paper","scissors","lizard","spock"][Math.floor(Math.random() * 5)]
}
const calculateWinner = ()=>{
    const ruleobj = {
        rock:["lizard","scissors"],
        lizard:["spock","paper"],
        spock:["rock","scissor"],
        scissors:["paper","lizard"],
        paper:["rock","spock"]
    }
    //count score
    if(hand == comphand){
        return "draw"
    }
    if(ruleobj[hand].find(el=> el == comphand)){
        score++
        return "win"
    }else{
        score--
        return "lose"
    }
    //set active winner 
}
const resetToDefault = ()=>{
    //turn others into opacity 1    
    allhands[0].classList.remove("active");
    allhands[1].classList.remove("active");
    allhands[2].classList.remove("active");
    allhands[3].classList.remove("active");
    allhands[4].classList.remove("active");
    allhands[0].classList.remove("fade");
    allhands[1].classList.remove("fade");
    allhands[2].classList.remove("fade");
    allhands[3].classList.remove("fade");
    allhands[4].classList.remove("fade");
    hand = null;
    comphand = null;
    toggleView(false);
    //set active back to default
    userChoice.innerHTML = "<h2 class='handsignActive__heading'>You Picked</h2>";
    compChoice.className = "handsign__sign handsign__sign--choice preview";
    compChoice.innerHTML="";
    decision.classList.remove("decisionactive")
    for(item of document.querySelectorAll(".winner")){ 
        item.remove()
    }
}
const toggleView = (choice)=>{
    if(choice){
        handsignActive.style.display = "flex";
        handsignContainer.style.display = "none";
    }else{
        handsignActive.style.display = "none";
        handsignContainer.style.display = "block";
    }
}
//MODAL