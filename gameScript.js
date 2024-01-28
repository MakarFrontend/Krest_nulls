"use strict";
function closeGameRezult(whichDiag) {
    document.getElementById(whichDiag).close();
}
function gameRezult(what) {
    let TXTWinOverNobody = document.getElementById('TXTWinOverNobody');
    TXTWinOverNobody.innerHTML = `<strong>${what}</strong>`;
    if (what == 'Ничья') {
        TXTWinOverNobody.style.color = '#FFF';
    } else if (what == 'Победа') {
        TXTWinOverNobody.style.color = '#00FF00';
    } else if (what == 'Поражение') {
        TXTWinOverNobody.style.color = '#FF0000';
    }
    document.getElementById('WinOverNobody').showModal();
}

let button = document.getElementById('doButton');
function doButton(ev) { //Кнопка хода второго, Заново
    if (ev == 'second') {
        button.removeAttribute('onclick');
        button.setAttribute('onclick', `doButton("ag")`);
        button.innerHTML = 'Заново';
        computerPlay();
    } else if (ev == "ag") {
        againInMain();
        button.removeAttribute('onclick');
        button.setAttribute('onclick', `doButton('second')`);
        button.innerHTML = 'Ходить вторым';
    }
}
function againInMain() { //Заново
    let e = 0;
    while (e < 9) {
        document.getElementById(`item_${e}`).style.background = '#000';
        document.getElementById(`item_${e}`).style.backgroundSize = 'cover';
        document.getElementById(`item_${e}`).setAttribute('onclick', `Play(${e})`);
        e++;
    }
    document.getElementById('whyPlay').innerHTML = 'Ваш ход . . .';
    map = [0, 0, 0, 0, 0, 0, 0, 0, 0];
}
/* teams
0 - empty
1 - people
2 - computer
*/
let mapForMe = [0, 1, 2,
                3, 4, 5,
                6, 7, 8];
let map = [0, 0, 0, 0, 0, 0, 0, 0, 0];

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
    let computerSkin = `url(${localStorage.getItem('computer')}`; //Скин компьютера
    function computerCanWin(where) { //Компьютер сделал выбор
        document.getElementById(`item_${where}`).style.backgroundImage = computerSkin;
        document.getElementById(`item_${where}`).removeAttribute('onclick');
        map[where] = 2;
    }
    function computerWin() {
        //Горизонталь
        //По горизонтали вариант 0-1-2 победа
        if ( ((map[0] == 2 && map[1] == 2) && (map[2] == 0)) ) {
            computerCanWin(2);
        } else if ( ((map[0] == 2 && map[2] == 2) && (map[1] == 0)) ) {
            computerCanWin(1);
        } else if ( ((map[1] == 2 && map[2] == 2) && (map[0] == 0)) ) {
            computerCanWin(0);
        }
        //По горизонтали вариант 3-4-5 победа
        else if ( ((map[3] == 2 && map[4] == 2) && (map[5] == 0)) ) {
            computerCanWin(5);
        } else if ( ((map[3] == 2 && map[5] == 2) && (map[4] == 0)) ) {
            computerCanWin(4);
        } else if ( ((map[4] == 2 && map[5] == 2) && (map[3] == 0)) ) {
            computerCanWin(3);
        }
        //По горизонтали вариант 6-7-8 победа
        else if ( ((map[6] == 2 && map[7] == 2) && (map[8] == 0)) ) {
            computerCanWin(8);
        } else if ( ((map[6] == 2 && map[8] == 2) && (map[7] == 0)) ) {
            computerCanWin(7);
        } else if ( ((map[7] == 2 && map[8] == 2) && (map[6] == 0)) ) {
            computerCanWin(6);
        }
        //Вертикаль
        //По вертикали вариант 0-3-6 победа
        else if ( ((map[0] == 2 && map[3] == 2) && (map[6] == 0)) ) {
            computerCanWin(6);
        } else if ( ((map[0] == 2 && map[6] == 2) && (map[3] == 0)) ) {
            computerCanWin(3);
        } else if ( ((map[3] == 2 && map[6] == 2) && (map[0] == 0)) ) {
            computerCanWin(0);
        }
        //По вертикали вариант 1-4-7 победа
        else if ( ((map[1] == 2 && map[4] == 2) && (map[7] == 0)) ) {
            computerCanWin(7);
        } else if ( ((map[1] == 2 && map[7] == 2) && (map[4] == 0)) ) {
            computerCanWin(4);
        } else if ( ((map[4] == 2 && map[7] == 2) && (map[1] == 0)) ) {
            computerCanWin(1);
        }
        //По вертикали вариант 2-5-8 победа
        else if ( ((map[2] == 2 && map[5] == 2) && (map[8] == 0)) ) {
            computerCanWin(8);
        } else if ( ((map[2] == 2 && map[8] == 2) && (map[5] == 0)) ) {
            computerCanWin(5);
        } else if ( ((map[5] == 2 && map[8] == 2) && (map[2] == 0)) ) {
            computerCanWin(2);
        }
        //Диагонали
        //Вариант 2-4-6 победа
        else if ( ((map[2] == 2 && map[4] == 2) && (map[6] == 0)) ) {
            computerCanWin(6);
        } else if ( ((map[2] == 2 && map[6] == 2) && (map[4] == 0)) ) {
            computerCanWin(4);
        } else if ( ((map[4] == 2 && map[6] == 2) && (map[2] == 0)) ) {
            computerCanWin(2);
        }
        //Вариант 0-4-8 победа
        else if ( (map[0] == 2 && map[4] == 2 && map[8] == 0) ) {
            computerCanWin(8);
        } else if ( ((map[0] == 2 && map[8] == 2) && (map[4] == 0)) ) {
            computerCanWin(4);
        } else if ( ((map[4] == 2 && map[8] == 2) && (map[0] == 0)) ) {
            computerCanWin(0);
        }
        //
        //
        //
        //Не даём выиграть человеку
        //
        //Диагонали
        //Вариант 2-4-6 человек
        //
        else if (((map[2] == 1 && map[4] == 1) && (map[6] == 0))) {
            computerCanWin(6);
        } else if (((map[2] == 1 && map[6] == 1) && (map[4] == 0))) {
            computerCanWin(4);
        } else if (((map[4] == 1 && map[6] == 1) && (map[2] == 0))) {
            computerCanWin(2);
        }
        //Вариант 0-4-8 человек
        else if ((map[0] == 1 && map[4] == 1) && (map[8] == 0)) {
            computerCanWin(8);
        } else if (((map[0] == 1 && map[8] == 1) && (map[4] == 0))) {
            computerCanWin(4);
        } else if (((map[4] == 1 && map[8] == 1) && (map[0] == 0))) {
            computerCanWin(0);
        }
        //Горизонталь
        //По горизонтали вариант 0-1-2 человек
        else if (((map[0] == 1 && map[1] == 1) && (map[2] == 0))) {
            computerCanWin(2);
        } else if (((map[0] == 1 && map[2] == 1) && (map[1] == 0))) {
            computerCanWin(1);
        } else if (((map[1] == 1 && map[2] == 1) && (map[0] == 0))) {
            computerCanWin(0);
        }
        //По горизонтали вариант 3-4-5 человек
        else if (((map[3] == 1 && map[4] == 1) && (map[5] == 0))) {
            computerCanWin(5);
        } else if (((map[3] == 1 && map[5] == 1) && (map[4] == 0))) {
            computerCanWin(4);
        } else if (((map[4] == 1 && map[5] == 1) && (map[3] == 0))) {
            computerCanWin(3);
        }
        //По горизонтали вариант 6-7-8 человек
        else if (((map[6] == 1 && map[7] == 1) && (map[8] == 0))) {
            computerCanWin(8);
        } else if (((map[6] == 1 && map[8] == 1) && (map[7] == 0))) {
            computerCanWin(7);
        } else if (((map[7] == 1 && map[8] == 1) && (map[6] == 0))) {
            computerCanWin(6);
        }
        //Вертикаль
        //По вертикали вариант 0-3-6 человек
        else if (((map[0] == 1 && map[3] == 1) && (map[6] == 0))) {
            computerCanWin(6);
        } else if (((map[0] == 1 && map[6] == 1) && (map[3] == 0))) {
            computerCanWin(3);
        } else if (((map[3] == 1 && map[6] == 1) && (map[0] == 0))) {
            computerCanWin(0);
        }
        //По вертикали вариант 1-4-7 человек
        else if (((map[1] == 1 && map[4] == 1) && (map[7] == 0))) {
            computerCanWin(7);
        } else if (((map[1] == 1 && map[7] == 1) && (map[4] == 0))) {
            computerCanWin(4);
        } else if (((map[4] == 1 && map[7] == 1) && (map[1] == 0))) {
            computerCanWin(1);
        }
        //По вертикали вариант 2-5-8 человек
        else if (((map[2] == 1 && map[5] == 1) && (map[8] == 0))) {
            computerCanWin(8);
        } else if (((map[2] == 1 && map[8] == 1) && (map[5] == 0))) {
            computerCanWin(5);
        } else if (((map[5] == 1 && map[8] == 1) && (map[2] == 0))) {
            computerCanWin(2);
        } else {
            let i = 1;
            let shoot;
            while (i == 1) {
                shoot = Math.floor(Math.random() *  9);
                if (map[shoot] == 0) {
                    i++;
                }
            }
            computerCanWin(shoot);
        }
    }
    computerWin();
}


function peoplePlay(id) { //Ход человека
    let peopleSkin = `url(${localStorage.getItem('people')})`; //Скин человека
    document.getElementById(`item_${id}`).style.backgroundImage = peopleSkin;
    document.getElementById(`item_${id}`).removeAttribute('onclick');
    map[id] = 1;
}


function appToLocalStorage(event) {
    let ball = Number(localStorage.getItem(event)); //Запись в память
    ball++;
    localStorage.setItem(String(event), String(ball));

    let wins = Number(localStorage.getItem('wins')) || 0; // Получение из памяти
    let overs = Number(localStorage.getItem('overs')) || 0;
    let nos = Number(localStorage.getItem('nos')) || 0;
    
    let score = wins + overs + nos; //Всего игр
    if (wins != 0) {wins = (((wins / score) * 100)).toFixed(2);} //Получение процентов
    if (overs != 0) {overs = (((overs / score) * 100)).toFixed(2);}
    if (nos != 0) {nos = (((nos / score) * 100)).toFixed(2);}
    
    document.getElementById('wins').innerHTML = wins; //Запись в документ
    document.getElementById('overs').innerHTML = overs;
    document.getElementById('nos').innerHTML = nos;
}


function Play(id) {
    if (button.innerHTML == 'Ходить вторым') { //Меняем текст кнопки если игрок первый
        button.removeAttribute('onclick');
        button.setAttribute('onclick', `doButton("ag")`);
        button.innerHTML = 'Заново';
    }
    peoplePlay(id);
    let whyPlayNow = document.querySelector('#whyPlay');
    let whyWin = checkWin(1);
    if (whyWin == true) {
        gameRezult('Победа');
        whyPlayNow.innerHTML = 'Победа';
        let e = 0;
        while (e < 9) {
            document.getElementById(`item_${e}`).removeAttribute('onclick');
            e++;
        }
        appToLocalStorage("wins");
    } else if (whyWin == null) {
        gameRezult('Ничья');
        whyPlayNow.innerHTML = 'Ничья';
        appToLocalStorage("nos");
    } else {
        function PlayElse() {
            computerPlay();
            whyWin = checkWin(2);
            if (whyWin == true) {
                gameRezult('Поражение');
                whyPlayNow.innerHTML = 'Поражение';
                let e = 0;
                while (e < 9) {
                    document.getElementById(`item_${e}`).removeAttribute('onclick');
                    e++;
                }
                appToLocalStorage("overs");
            } else if (whyWin == null) {
                gameRezult('Ничья');
                whyPlayNow.innerHTML = 'Ничья';
                appToLocalStorage("nos");
            } else {
                whyPlayNow.innerHTML = 'Ваш ход . . .';
            }
        }
        whyPlayNow.innerHTML = 'Компьютер думает . . .';
        setTimeout(PlayElse, 500);
    }
}