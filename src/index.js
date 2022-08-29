import { blueCards, brownCards, greenCards } from "./data/mythicCards"

let Cthulthu12 = document.querySelector('.Cthulthu12');
let ShubNiggurath13 = document.querySelector('.ShubNiggurath13');
let IogSothoth14 = document.querySelector('.IogSothoth14');
let Azathoth15 = document.querySelector('.Azathoth15');

let newArrFirstStage = [];
let newArrSecondStage = [];
let newArrThirdStage = [];

let desk = document.querySelector('.desk');
let cardFace = document.querySelector('.card-face');
let shuffleButton = document.querySelector('.shuffle-button');

let index = 0;
let itemsForAllStage = [];

let stageFirstGreen = document.querySelector('.stage1-green');
let stageFirstBrown = document.querySelector('.stage1-brown');
let stageFirstBlue = document.querySelector('.stage1-blue');

let stageSecondGreen = document.querySelector('.stage2-green');
let stageSecondBrown = document.querySelector('.stage2-brown');
let stageSecondBlue = document.querySelector('.stage2-blue');

let stageThirdGreen = document.querySelector('.stage3-green');
let stageThirdBrown = document.querySelector('.stage3-brown');
let stageThirdBlue = document.querySelector('.stage3-blue');

let difficultyEasy = document.querySelector('.easy');
let difficultyAverage = document.querySelector('.average');
let difficultyHard = document.querySelector('.hard');
let selectedCard = "";



const inputData = {
    cthulthu: {
        firstStage: {
            greenCardsCount: 0,
            brownCardsCount: 2,
            blueCardsCount: 2
        },
        secondStage: {
            greenCardsCount: 1,
            brownCardsCount: 3,
            blueCardsCount: 0
        },
        thirdStage: {
            greenCardsCount: 3,
            brownCardsCount: 4,
            blueCardsCount: 0
        }
    },
    shubNiggurath: {
        firstStage: {
            greenCardsCount: 1,
            brownCardsCount: 2,
            blueCardsCount: 1
        },
        secondStage: {
            greenCardsCount: 3,
            brownCardsCount: 2,
            blueCardsCount: 1
        },
        thirdStage: {
            greenCardsCount: 2,
            brownCardsCount: 4,
            blueCardsCount: 0
        }
    },
    iogSothoth: {
        firstStage: {
            greenCardsCount: 0,
            brownCardsCount: 2,
            blueCardsCount: 1
        },
        secondStage: {
            greenCardsCount: 2,
            brownCardsCount: 3,
            blueCardsCount: 1
        },
        thirdStage: {
            greenCardsCount: 3,
            brownCardsCount: 4,
            blueCardsCount: 0
        }
    },
    azathoth: {
        firstStage: {
            greenCardsCount: 1,
            brownCardsCount: 2,
            blueCardsCount: 1
        },
        secondStage: {
            greenCardsCount: 2,
            brownCardsCount: 3,
            blueCardsCount: 1
        },
        thirdStage: {
            greenCardsCount: 2,
            brownCardsCount: 4,
            blueCardsCount: 0
        }
    }
}

//функция отображает количество карт в трекере текущего состояния колоды для выбранной карты древнего
const findSelectedCard = () => {
    if (Cthulthu12.classList.contains("luminous")) {
        setCountCardsWhenStart('cthulthu');
    }
    if (ShubNiggurath13.classList.contains("luminous")) {
        setCountCardsWhenStart('shubNiggurath');
    }
    if (IogSothoth14.classList.contains("luminous")) {
        setCountCardsWhenStart('iogSothoth');
    }
    if (Azathoth15.classList.contains("luminous")) {
        setCountCardsWhenStart('azathoth');
    }
}

//функция находит несколько рандомных неповторяющихся элементов в массиве
let getRandomElements = function(sourceArray, neededElements) {
    let result = [];
    for (let i = 0; result.length < neededElements; i++) {
        const index = Math.floor(Math.random() * sourceArray.length)
        if (result.find(item => item.id === sourceArray[index].id) === undefined) {
            result.push(sourceArray[index]);
        }
    }
    return result;
}

//функция перемешивания массива
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

//функция формирования колоды для выбранного уровня уровня
function formDeckForLevel(key, greenCards, brownCards, blueCards) {
    const data = inputData[key];
    newArrFirstStage = [...getRandomElements(greenCards, data.firstStage.greenCardsCount).concat(getRandomElements(brownCards, data.firstStage.brownCardsCount)).concat(getRandomElements(blueCards, data.firstStage.blueCardsCount))];
    newArrSecondStage = [...getRandomElements(greenCards, data.secondStage.greenCardsCount).concat(getRandomElements(brownCards, data.secondStage.brownCardsCount)).concat(getRandomElements(blueCards, data.secondStage.blueCardsCount))];
    newArrThirdStage = [...getRandomElements(greenCards, data.thirdStage.greenCardsCount).concat(getRandomElements(brownCards, data.thirdStage.brownCardsCount)).concat(getRandomElements(blueCards, data.thirdStage.blueCardsCount))];
    itemsForAllStage = [...newArrFirstStage, ...newArrSecondStage, ...newArrThirdStage];
}


//функция перемешивания и окончательной колоды
function getCardsForStages() {
    desk.classList.add('active');
    shuffleButton.classList.add('luminous');
    shuffle(newArrFirstStage);
    shuffle(newArrSecondStage);
    shuffle(newArrThirdStage);
}

//функция сборки колоды для выбранной карты древнего
function chooseCardAncient() {
    if (Cthulthu12.classList.contains('luminous')) {
        getCardsForStages('cthulthu');
    }
    if (ShubNiggurath13.classList.contains('luminous')) {
        getCardsForStages('shubNiggurath');
    }
    if (IogSothoth14.classList.contains('luminous')) {
        getCardsForStages('iogSothoth');
    }
    if (Azathoth15.classList.contains('luminous')) {
        getCardsForStages('azathoth');
    }
    findSelectedCard();
    index = 0;
    cardFace.innerHTML = "";
}
shuffleButton.addEventListener('click', chooseCardAncient);

//функция считает количество оставшихся карт в игре (трекер текущего состояния колоды)
const setCountCards = (currentItem, itemGreen, itemBrown, itemBlue) => {
    if (currentItem.color === "green") {
        itemGreen.innerHTML = Number(itemGreen.innerHTML) - 1;
    }
    if (currentItem.color === "brown") {
        itemBrown.innerHTML = Number(itemBrown.innerHTML) - 1;
    }
    if (currentItem.color === "blue") {
        itemBlue.innerHTML = Number(itemBlue.innerHTML) - 1;
    }
}

//функция вывода текущей карты на экран
function showCard() {
    let image;
    let currentItem;
    cardFace.innerHTML = "";
    shuffleButton.classList.remove('luminous');
    if (index < itemsForAllStage.length) {
        currentItem = itemsForAllStage[index];
        index++;
        image = document.createElement('img');
        image.src = currentItem.cardFace;
        image.style.maxWidth = '150px';
        image.style.borderRadius = '5px';
        image.style.marginLeft = '10px';
        cardFace.innerHTML = "";
        cardFace.appendChild(image);
        if (stageFirstGreen.innerHTML !== "0" || stageFirstBrown.innerHTML !== "0" || stageFirstBlue.innerHTML !== "0") {
            setCountCards(currentItem, stageFirstGreen, stageFirstBrown, stageFirstBlue)
        } else if (stageSecondGreen.innerHTML !== "0" || stageSecondBrown.innerHTML !== "0" || stageSecondBlue.innerHTML !== "0") {
            setCountCards(currentItem, stageSecondGreen, stageSecondBrown, stageSecondBlue)
        } else if (stageThirdGreen.innerHTML !== "0" || stageThirdBrown.innerHTML !== "0" || stageThirdBlue.innerHTML !== "0") {
            setCountCards(currentItem, stageThirdGreen, stageThirdBrown, stageThirdBlue)
        }
    }
    if (index === itemsForAllStage.length) {
        index = 0;
        cardFace.innerHTML = "";
        desk.classList.remove('active');
    }
}
desk.addEventListener('click', showCard);

//Функция отображает каличество карт в игре для каждого древнего (трекер текущего состояния колоды)
const setCountCardsWhenStart = (key) => {
    const data = inputData[key]
    stageFirstGreen.innerHTML = data.firstStage.greenCardsCount;
    stageFirstBrown.innerHTML = data.firstStage.brownCardsCount;
    stageFirstBlue.innerHTML = data.firstStage.blueCardsCount;

    stageSecondGreen.innerHTML = data.secondStage.greenCardsCount;
    stageSecondBrown.innerHTML = data.secondStage.brownCardsCount;
    stageSecondBlue.innerHTML = data.secondStage.blueCardsCount;

    stageThirdGreen.innerHTML = data.thirdStage.greenCardsCount;
    stageThirdBrown.innerHTML = data.thirdStage.brownCardsCount;
    stageThirdBlue.innerHTML = data.thirdStage.blueCardsCount;
}

//выбор карты древнего
Cthulthu12.addEventListener('click', function() {
    setCountCardsWhenStart('cthulthu');
    this.classList.add('luminous');
    ShubNiggurath13.classList.remove('luminous');
    IogSothoth14.classList.remove('luminous');
    Azathoth15.classList.remove('luminous');
})

ShubNiggurath13.addEventListener('click', function() {
    setCountCardsWhenStart('shubNiggurath');
    this.classList.add('luminous');
    Cthulthu12.classList.remove('luminous');
    IogSothoth14.classList.remove('luminous');
    Azathoth15.classList.remove('luminous');
})

IogSothoth14.addEventListener('click', function() {
    setCountCardsWhenStart('iogSothoth');
    this.classList.add('luminous');
    Cthulthu12.classList.remove('luminous');
    ShubNiggurath13.classList.remove('luminous');
    Azathoth15.classList.remove('luminous');
})

Azathoth15.addEventListener('click', function() {
    setCountCardsWhenStart('azathoth');
    this.classList.add('luminous');
    Cthulthu12.classList.remove('luminous');
    ShubNiggurath13.classList.remove('luminous');
    IogSothoth14.classList.remove('luminous');
})

//функция выбирает уровень сложности
difficultyEasy.addEventListener('click', function() {
    this.classList.add('luminous');
    difficultyAverage.classList.remove('luminous');
    difficultyHard.classList.remove('luminous');
    const greenCardsEasy = greenCards.filter(card => card.difficulty === "easy" || card.difficulty === "normal");
    const brownCardsEasy = brownCards.filter(card => card.difficulty === "easy" || card.difficulty === "normal");
    const blueCardsEasy = blueCards.filter(card => card.difficulty === "easy" || card.difficulty === "normal");
    if (Cthulthu12.classList.contains("luminous")) {
        formDeckForLevel("cthulthu", greenCardsEasy, brownCardsEasy, blueCardsEasy)
    }
    if (ShubNiggurath13.classList.contains("luminous")) {
        formDeckForLevel("shubNiggurath", greenCardsEasy, brownCardsEasy, blueCardsEasy)
    }
    if (IogSothoth14.classList.contains("luminous")) {
        formDeckForLevel("iogSothoth", greenCardsEasy, brownCardsEasy, blueCardsEasy)
    }
    if (Azathoth15.classList.contains("luminous")) {
        formDeckForLevel("azathoth", greenCardsEasy, brownCardsEasy, blueCardsEasy)
    }

})
difficultyAverage.addEventListener('click', function() {
    this.classList.add('luminous');
    difficultyEasy.classList.remove('luminous');
    difficultyHard.classList.remove('luminous');
    if (Cthulthu12.classList.contains("luminous")) {
        formDeckForLevel("cthulthu", greenCards, brownCards, blueCards)
    }
    if (ShubNiggurath13.classList.contains("luminous")) {
        formDeckForLevel("shubNiggurath", greenCards, brownCards, blueCards)
    }
    if (IogSothoth14.classList.contains("luminous")) {
        formDeckForLevel("iogSothoth", greenCards, brownCards, blueCards)
    }
    if (Azathoth15.classList.contains("luminous")) {
        formDeckForLevel("azathoth", greenCards, brownCards, blueCards)
    }

})
difficultyHard.addEventListener('click', function() {
    this.classList.add('luminous');
    difficultyEasy.classList.remove('luminous');
    difficultyAverage.classList.remove('luminous');
    const greenCardsHard = greenCards.filter(card => card.difficulty === "hard" || card.difficulty === "normal");
    const brownCardsHard = brownCards.filter(card => card.difficulty === "hard" || card.difficulty === "normal");
    const blueCardsHard = blueCards.filter(card => card.difficulty === "hard" || card.difficulty === "normal");
    if (Cthulthu12.classList.contains("luminous")) {
        formDeckForLevel("cthulthu", greenCardsHard, brownCardsHard, blueCardsHard)
    }
    if (ShubNiggurath13.classList.contains("luminous")) {
        formDeckForLevel("shubNiggurath", greenCardsHard, brownCardsHard, blueCardsHard)
    }
    if (IogSothoth14.classList.contains("luminous")) {
        formDeckForLevel("iogSothoth", greenCardsHard, brownCardsHard, blueCardsHard)
    }
    if (Azathoth15.classList.contains("luminous")) {
        formDeckForLevel("azathoth", greenCardsHard, brownCardsHard, blueCardsHard)
    }
})