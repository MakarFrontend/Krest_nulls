/* teams
0 - empty
1 - people
2 - computer
*/
import {computerWin} from 'computerPlayFunctions.js';
let mapForMe = [0, 1, 2,
                3, 4, 5,
                6, 7, 8];
let map = [0, 0, 0, 0, 0, 0, 0, 0, 0];

let skins = ['url(null.png)', 'url(krest.png)', 'url(trap.png)', 'URL(oval.png)', 'url(treangle.png)', 'url(romb.png)', 'url(kvadrat.png)']; //Массив со скинами
let peopleSkin = skins[5]; //Скин человека
let computerSkin = skins[0]; //Скин компьютера

function checkWin(team) { //Проверка на победу
    function checkNobody() { //Функция Проверки ничьи
        let i = 0;
        let check = 0;
        while (i < 9) {
            let itemNow = map[i];
            if ((itemNow == 1) || (itemNow == 2)) {
                check++;
            }
            i++;
        }
        if (check == 9) {
            return true;
        } else {
            return false;
        }
    }
    let checkNobodyRezult = checkNobody();
    if ((map[0] == team)&&(map[1] == team)&&(map[2] == team)) {return true;} //0-1-2
    if ((map[3] == team)&&(map[4] == team)&&(map[5] == team)) {return true;} //3-4-5
    if ((map[6] == team)&&(map[7] == team)&&(map[8] == team)) {return true;} //6-7-8

    if ((map[0] == team)&&(map[3] == team)&&(map[6] == team)) {return true;} //0-3-6
    if ((map[1] == team)&&(map[4] == team)&&(map[7] == team)) {return true;} //1-4-7
    if ((map[2] == team)&&(map[5] == team)&&(map[8] == team)) {return true;} //2-5-8

    if ((map[2] == team)&&(map[4] == team)&&(map[6] == team)) {return true;} //Диагональ вверх
    if ((map[0] == team)&&(map[4] == team)&&(map[8] == team)) {return true;} //Диагональ вниз

    if (checkNobodyRezult == true) {let g = null; return g;}

    return false;
}


function computerPlay() { //Компьютер играет
    function computerCanWin(where) { //Компьютер сделал выбор
        document.getElementById(`item_${where}`).style.backgroundImage = computerSkin;
        document.getElementById(`item_${where}`).removeAttribute('onclick');
        map[where] = 2;
    }
    computerWin();
}


function peoplePlay(id) { //Ход человека
        document.getElementById(`item_${id}`).style.backgroundImage = peopleSkin;
        map[id] = 1;
}


function appToLocalStorage(event) {
    arrayString = localStorage.getItem("history");
    let history;
    if (arrayString == null) {
        history = [];
    } else {
        history = JSON.parse(localStorage.getItem("history"));
    }
    history.push(event);
    localStorage.setItem("history", JSON.stringify(history));
}


function Play(id) {
    peoplePlay(id);
    let whyPlayNow = document.querySelector('#whyPlay');
    let whyWin = checkWin(1);
    if (whyWin == true) {
        alert('Победа');
        whyPlayNow.innerHTML = 'Победа';
        appToLocalStorage("win");
    } else if (whyWin == null) {
        alert('Ничья');
        whyPlayNow.innerHTML = 'Ничья';
        appToLocalStorage("nobody");
    } else {
        function PlayElse() {
            computerPlay();
            whyWin = checkWin(2);
            if (whyWin == true) {
                alert('Поражение');
                whyPlayNow.innerHTML = 'Поражение';
                appToLocalStorage("gameOver");
            } else {
                whyPlayNow.innerHTML = 'Ваш ход . . .';
            }
        }
        whyPlayNow.innerHTML = 'Компьютер думает . . .';
        setTimeout(PlayElse, 500);
    }
}