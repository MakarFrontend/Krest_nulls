"use strict";
/* teams
0 - empty
1 - people
2 - computer
*/
let mapForMe = [0, 1, 2, 3,
                4, 5, 6, 7,
                8, 9, 10, 11,
                12, 13, 14, 15];
let map = [0, 0, 0, 0, /**/ 0, 0, 0, 0, /**/ 0, 0, 0, 0, /**/ 0, 0, 0, 0 /**/]; //Карта игрового поля
sessionStorage.setItem('map', JSON.stringify(map));
let button = document.getElementById('doButton'); //Кнопка второго, заново
let conditionAlwaysSecond = localStorage.getItem('alwaysSecond') || false; //Состояние второго всегда

if (conditionAlwaysSecond === 'false') { //Переводим строки в логику
    conditionAlwaysSecond = false;
} else if (conditionAlwaysSecond === 'true') {
    conditionAlwaysSecond = true;
}

if (localStorage.getItem('alwaysSecond') == 'true') { //Если Всегда второй включён
    computerPlay();
}

function alwaysSecond(inn) { //При нажатии на всегда второй, заново
    if (inn === 'Отключено') {
        document.querySelector('#conditionAlwaysSecond').innerHTML = 'Включено';
        document.querySelector('#conditionAlwaysSecond').style.color = '#00FF00';
        button.removeAttribute('onclick');
        button.setAttribute('onclick', `doButton("ag")`);
        button.innerHTML = 'Заново';
        conditionAlwaysSecond = true;
        localStorage.setItem('alwaysSecond', 'true');
        if (map.join(' ') == '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0') {
            computerPlay();
        }
    } else {
        document.querySelector('#conditionAlwaysSecond').innerHTML = 'Отключено';
        document.querySelector('#conditionAlwaysSecond').style.color = '#FF0000';
        conditionAlwaysSecond = false;
        localStorage.setItem('alwaysSecond', 'false');
    }
}

function closeGameRezult(whichDiag) { //Закрытие результата
    document.body.style.filter = 'blur(0px)';
    document.getElementById(whichDiag).close();
}

function gameRezult(what) { //Показывает результат игры
    let TXTWinOverNobody = document.getElementById('TXTWinOverNobody');
    TXTWinOverNobody.innerHTML = `<strong>${what}</strong>`;
    if (what == 'Ничья') {
        TXTWinOverNobody.style.color = '#FFF';
    } else if (what == 'Победа') {
        TXTWinOverNobody.style.color = '#00FF00';
    } else if (what == 'Поражение') {
        TXTWinOverNobody.style.color = '#FF0000';
    }
    document.body.style.filter = 'blur(2px)';
    document.getElementById('WinOverNobody').showModal();
}

function doButton(ev) { //Кнопка хода второго, Заново
    if (ev == 'second') {
        button.removeAttribute('onclick');
        button.setAttribute('onclick', `doButton("ag")`);
        button.innerHTML = 'Заново';
        computerPlay();
    } else if (ev == "ag") {
        againInMain();
        if (conditionAlwaysSecond == false) {
        button.removeAttribute('onclick');
        button.setAttribute('onclick', `doButton('second')`);
        button.innerHTML = 'Ходить вторым';
        }
    }
}

function againInMain() { //Заново
    let e = 0;
    while (e < 16) {
        document.getElementById(`item_${e}`).style.background = '#000';
        document.getElementById(`item_${e}`).style.backgroundSize = 'cover';
        document.getElementById(`item_${e}`).setAttribute('onclick', `Play(${e})`);
        e++;
    }
    if (conditionAlwaysSecond == true) {
        button.removeAttribute('onclick');
        button.setAttribute('onclick', `doButton("ag")`);
        button.innerHTML = 'Заново';
        document.getElementById('whyPlay').innerHTML = 'Ваш ход . . .';
        map = [0, 0, 0, 0, /**/ 0, 0, 0, 0, /**/ 0, 0, 0, 0, /**/ 0, 0, 0, 0, /**/];
        sessionStorage.setItem('map', JSON.stringify(map));
        computerPlay();
    } else {
        button.removeAttribute('onclick');
        button.setAttribute('onclick', `doButton("second")`);
        button.innerHTML = 'Ходить вторым';
        document.getElementById('whyPlay').innerHTML = 'Ваш ход . . .';
        map = [0, 0, 0, 0, /**/ 0, 0, 0, 0, /**/ 0, 0, 0, 0, /**/ 0, 0, 0, 0, /**/];
        sessionStorage.setItem('map', JSON.stringify(map));
    }
}

function checkWin(team) { //Проверка на победу
    function checkNobody() { //Функция Проверки ничьи
        let i = 0;
        let check = 0;
        while (i < 16) {
            let itemNow = map[i];
            if ((itemNow == 1) || (itemNow == 2)) {
                check++;
            }
            i++;
        }
        if (check == 16) {
            return true;
        } else {
            return false;
        }
    }

    /*Функции проверки победы по: 
        горизонтали
        вертикали
        диагонали*/
    function checkHorizontal(k) { //Поверка победы по горизонтали
        let chHo = 0;
        while (chHo < 4) {
            if ((map[k] == team) && (map[k + 1] == team) && (map[k + 2] == team)) {
                return true;
            }
            chHo++;
            k = k + 4;
        }
        return false;
    }
    function checkVertical(k) { //Поверка победы по вертикали
        let chVe = 0; //
        while (chVe < 4) {
            if ((map[k] == team) && (map[k + 4] == team) && (map[k + 8] == team)) {
                return true;
            }
            chVe++;
            k = k + 1;
        }
        return false;
    }
    function checkDiagonal(k, side) { //Проверка победы по диагонали
        if ((map[k] == team) && (map[k + side] == team) && (map[k + (side*2)] == team)) {
            return true;
        }
        return false;
    }

    let option_left_ho = checkHorizontal(0); //Варианты слева, горизонталь
    let option_right_ho = checkHorizontal(1); //Варианты справа, горизонталь
    /**/
    let option_top_ve = checkVertical(0); //Вертикали сверху
    let option_down_ve = checkVertical(4); //Вертикали снизу
    /*Диагонали слева направо*/
    let option_0_5_10_di = checkDiagonal(0, 5)
    let option_5_10_15_di = checkDiagonal(5, 5)
    let option_4_9_14_di = checkDiagonal(4, 5)
    let option_1_6_11_di = checkDiagonal(1, 5)
    /*Диагонали справо налево*/
    let option_2_5_8_di = checkDiagonal(2, 3)
    let option_3_6_9_di = checkDiagonal(3, 3)
    let option_6_9_12_di = checkDiagonal(6, 3)
    let option_7_10_13_di = checkDiagonal(7, 3)
    /*Если выигрыш*/
    if ((option_left_ho == true) || (option_right_ho == true) || //Горизонтали
        (option_top_ve == true) || (option_down_ve == true) || //Вертикали
        (option_0_5_10_di == true) || (option_5_10_15_di == true) || //Диагонали
        (option_4_9_14_di == true) || (option_1_6_11_di == true) ||
        (option_2_5_8_di == true) || (option_3_6_9_di == true) ||
        (option_6_9_12_di == true) || (option_7_10_13_di == true)) { 
        return true;
    }

    let checkNobodyRezult = checkNobody();
    if (checkNobodyRezult == true) { //Если ничья
        let g = null;
        return g;}
    return false;
}

function computerPlay() { //Компьютер играет
    let e = localStorage.getItem('computer') || 'krest.png'; //Файл скина из памяти
    let computerSkin = `url(${e})`; //Скин компьютера с url
    function computerCanWin(where) { //Компьютер сделал выбор
        document.getElementById(`item_${where}`).style.backgroundImage = computerSkin;
        document.getElementById(`item_${where}`).removeAttribute('onclick');
        map[where] = 2;
        sessionStorage.setItem('map', JSON.stringify(map));
    }

    let r;
    let k = 0;
    /*Проверяем горизонталь на возможность победы*/
    while (k <= 12) {
        if ((map[k] == 2) && (map[k + 1] == 2) && (map[k + 2] == 0)) {
            r = k + 2;
            computerCanWin(r);
            return;
        } else if ((map[k] == 2) && (map[k + 1] == 0) && (map[k + 2] == 2)) {
            r = k + 1;
            computerCanWin(r);
            return;
        } else if ((map[k] == 0) && (map[k + 1] == 2) && (map[k + 2] == 2)) {
            r = k;
            computerCanWin(r);
            return;
        }
        k = k + 4;
    }
    k = 1;
    while (k < 13) {
        if ((map[k] == 2) && (map[k + 1] == 2) && (map[k + 2] == 0)) {
            r = k + 2;
            computerCanWin(r);
            return;
        }
        if ((map[k] == 2) && (map[k + 1] == 0) && (map[k + 2] == 2)) {
            r = k + 1;
            computerCanWin(r);
            return;
        }
        if ((map[k] == 0) && (map[k + 1] == 2) && (map[k + 2] == 2)) {
            r = k;
            computerCanWin(r);
            return;
        }
        k = k + 4;
    }
    /*Проверка горизонтали окончена*/
    /**/
    /*Проверяем вертикаль на возможность победы*/
    k = 0;
    let iForVerticalCheck = 0;
    while (iForVerticalCheck <= 4) {
        if ((map[k] == 2) && (map[k + 4] == 2) && (map[k + 8] == 0)) {
            r = k + 8;
            computerCanWin(r);
            return;
        } else if ((map[k] == 2) && (map[k + 4] == 0) && (map[k + 8] == 2)) {
            r = k + 4;
            computerCanWin(r);
            return;
        } else if ((map[k] == 0) && (map[k + 4] == 2) && (map[k + 8] == 2)) {
            r = k;
            computerCanWin(r);
            return;
        }
        k = k + 1;
        iForVerticalCheck += 1;
    }
    k = 4;
    iForVerticalCheck = 0;
    while (iForVerticalCheck <= 4) {
        if ((map[k] == 2) && (map[k + 4] == 2) && (map[k + 8] == 0)) {
            r = k + 8;
            computerCanWin(r);
            return;
        } else if ((map[k] == 2) && (map[k + 4] == 0) && (map[k + 8] == 2)) {
            r = k + 4;
            computerCanWin(r);
            return;
        } else if ((map[k] == 0) && (map[k + 4] == 2) && (map[k + 8] == 2)) {
            r = k;
            computerCanWin(r);
            return;
        }
        k = k + 1;
        iForVerticalCheck += 1;
    }
    /*Проверка вертикали окончена*/
    /**/
    /*Проверка диагонали на возможность победы*/
    function checkDiagonalForWin(start, step) {
        let shot;
        if ((map[start] == 2) && (map[start + step] == 2) && (map[start + (step*2)] == 0)) {
            shot = start + (step*2);
            computerCanWin(shot);
            return true;
        } else if ((map[start] == 2) && (map[start + step] == 0) && (map[start + (step*2)] == 2)) {
            shot = start + step;
            computerCanWin(shot);
            return true;
        } else if ((map[start] == 0) && (map[start + step] == 2) && (map[start + (step*2)] == 2)) {
            shot = start;
            computerCanWin(shot);
            return true;
        }
        return false;
    }
    let win_di_0 = checkDiagonalForWin(0, 5);
    let win_di_1 = checkDiagonalForWin(5, 5);
    let win_di_2 = checkDiagonalForWin(4, 5);
    let win_di_3 = checkDiagonalForWin(1, 5);
    let win_di_4 = checkDiagonalForWin(2, 3);
    let win_di_5 = checkDiagonalForWin(3, 3);
    let win_di_6 = checkDiagonalForWin(6, 3);
    let win_di_7 = checkDiagonalForWin(7, 3);
    //Если победили по горизонтали
    if (win_di_0 || win_di_1 || win_di_2 || win_di_3 || win_di_4 || win_di_5 || win_di_6 || win_di_7) {
        return;
    }
    /*Проверка диагонали окончена*/
    /**/
    /**/
    /*Не даём человеку выиграть*/
    let peopleNotWin = 0; //Срабатола ли функция снизу. 0 - нет, 1 - да
    ;(function peopleNoWin() {
        let r;
        let k = 0;
        /*Проверяем горизонталь не даём её человеку*/
        while (k <= 12) {
            if ((map[k] == 1) && (map[k + 1] == 1) && (map[k + 2] == 0)) {
                r = k + 2;
                peopleNotWin++;
                computerCanWin(r);
                return;
            } else if ((map[k] == 1) && (map[k + 1] == 0) && (map[k + 2] == 1)) {
                r = k + 1;
                peopleNotWin++;
                computerCanWin(r);
                return;
            } else if ((map[k] == 0) && (map[k + 1] == 1) && (map[k + 2] == 1)) {
                r = k;
                peopleNotWin++;
                computerCanWin(r);
                return;
            }
            k = k + 4;
        }
        k = 1;
        while (k < 13) {
            if ((map[k] == 1) && (map[k + 1] == 1) && (map[k + 2] == 0)) {
                r = k + 2;
                peopleNotWin++;
                computerCanWin(r);
                return;
            }
            if ((map[k] == 1) && (map[k + 1] == 0) && (map[k + 2] == 1)) {
                r = k + 1;
                peopleNotWin++;
                computerCanWin(r);
                return;
            }
            if ((map[k] == 0) && (map[k + 1] == 1) && (map[k + 2] == 1)) {
                r = k;
                peopleNotWin++;
                computerCanWin(r);
                return;
            }
            k = k + 4;
        }
        /*Проверка горизонтали окончена*/
        /**/
        /*Проверяем вертикаль не даём её человеку*/
        k = 0;
        let iForVerticalCheck = 0;
        while (iForVerticalCheck <= 4) {
            if ((map[k] == 1) && (map[k + 4] == 1) && (map[k + 8] == 0)) {
                r = k + 8;
                peopleNotWin++;
                computerCanWin(r);
                return;
            } else if ((map[k] == 1) && (map[k + 4] == 0) && (map[k + 8] == 1)) {
                r = k + 4;
                peopleNotWin++;
                computerCanWin(r);
                return;
            } else if ((map[k] == 0) && (map[k + 4] == 1) && (map[k + 8] == 1)) {
                r = k;
                peopleNotWin++;
                computerCanWin(r);
                return;
            }
            k = k + 1;
            iForVerticalCheck += 1;
        }
        k = 4;
        iForVerticalCheck = 0;
        while (iForVerticalCheck <= 4) {
            if ((map[k] == 1) && (map[k + 4] == 1) && (map[k + 8] == 0)) {
                r = k + 8;
                peopleNotWin++;
                computerCanWin(r);
                return;
            } else if ((map[k] == 1) && (map[k + 4] == 0) && (map[k + 8] == 1)) {
                r = k + 4;
                peopleNotWin++;
                computerCanWin(r);
                return;
            } else if ((map[k] == 0) && (map[k + 4] == 1) && (map[k + 8] == 1)) {
                r = k;
                peopleNotWin++;
                computerCanWin(r);
                return;
            }
            k = k + 1;
            iForVerticalCheck += 1;
        }
        /*Проверка вертикали окончена*/
        /**/
        /*Проверка диагонали не даём её человеку*/
        function checkDiagonalForWin(start, step) {
            let shot;
            if ((map[start] == 1) && (map[start + step] == 1) && (map[start + (step*2)] == 0)) {
                shot = start + (step*2);
                peopleNotWin++;
                return shot;
            } else if ((map[start] == 1) && (map[start + step] == 0) && (map[start + (step*2)] == 1)) {
                shot = start + step;
                peopleNotWin++;
                return shot;
            } else if ((map[start] == 0) && (map[start + step] == 1) && (map[start + (step*2)] == 1)) {
                shot = start;
                peopleNotWin++;
                return shot;
            }
            return 'false';
        }
        let win_di_0 = checkDiagonalForWin(0, 5);
        let win_di_1 = checkDiagonalForWin(5, 5);
        let win_di_2 = checkDiagonalForWin(4, 5);
        let win_di_3 = checkDiagonalForWin(1, 5);
        let win_di_4 = checkDiagonalForWin(2, 3);
        let win_di_5 = checkDiagonalForWin(3, 3);
        let win_di_6 = checkDiagonalForWin(6, 3);
        let win_di_7 = checkDiagonalForWin(7, 3);
        //Если победили по диагонали
        if (win_di_0 !== 'false') {
            computerCanWin(win_di_0);
        } else if (win_di_1 !== 'false') {
            computerCanWin(win_di_1);
        }
        /**/ else if (win_di_2 !== 'false') {
            computerCanWin(win_di_2);
        } else if (win_di_3 !== 'false') {
            computerCanWin(win_di_3);
        }
        /**/ else if (win_di_4 !== 'false') {
            computerCanWin(win_di_4);
        } else if (win_di_5 !== 'false') {
            computerCanWin(win_di_5);
        }
        /**/ else if (win_di_6 !== 'false') {
            computerCanWin(win_di_6);
        } else if (win_di_7 !== 'false') {
            computerCanWin(win_di_7);
        }
        /*Проверка диагонали окончена*/
    })()

    if (peopleNotWin == 0) {
        let i = 1;
        let shoot;
        while (i == 1) {
            shoot = Math.floor(Math.random() * 16);
            if (map[shoot] == 0) {
                i++;
            }
        }
        computerCanWin(shoot);
    }
}

function peoplePlay(id) { //Ход человека
    let e = localStorage.getItem('people') || 'null.png';
    let peopleSkin = `url(${e})`; //Скин человека
    document.getElementById(`item_${id}`).style.backgroundImage = peopleSkin;
    document.getElementById(`item_${id}`).removeAttribute('onclick');
    map[id] = 1;
    sessionStorage.setItem('map', JSON.stringify(map));
}

function appToLocalStorage(event) { //Запись в память результата и обновление статистики
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
    document.getElementById('plug').style.display = 'block';
    if (conditionAlwaysSecond == false) { //Меняем текст кнопки если игрок первый
        button.removeAttribute('onclick');
        button.setAttribute('onclick', `doButton("ag")`);
        button.innerHTML = 'Заново';
    }
    peoplePlay(id);
    let whyPlayNow = document.querySelector('#whyPlay');
    let whyWin = checkWin(1);
    if (whyWin == true) {
        document.getElementById('plug').style.display = 'none';
        gameRezult('Победа');
        whyPlayNow.innerHTML = 'Победа';
        let e = 0;
        while (e < 16) {
            document.getElementById(`item_${e}`).removeAttribute('onclick');
            e++;
        }
        appToLocalStorage("wins");
    } else if (whyWin == null) {
        document.getElementById('plug').style.display = 'none';
        gameRezult('Ничья');
        whyPlayNow.innerHTML = 'Ничья';
        appToLocalStorage("nos");
    } else {
        function PlayElse() {
            computerPlay();
            whyWin = checkWin(2);
            if (whyWin == true) {
                document.getElementById('plug').style.display = 'none';
                gameRezult('Поражение');
                whyPlayNow.innerHTML = 'Поражение';
                let e = 0;
                while (e < 16) {
                    document.getElementById(`item_${e}`).removeAttribute('onclick');
                    e++;
                }
                appToLocalStorage("overs");
            } else if (whyWin == null) {
                document.getElementById('plug').style.display = 'none';
                gameRezult('Ничья');
                whyPlayNow.innerHTML = 'Ничья';
                appToLocalStorage("nos");
            } else {
                document.getElementById('plug').style.display = 'none';
                whyPlayNow.innerHTML = 'Ваш ход . . .';
            }
        }
        whyPlayNow.innerHTML = 'Компьютер думает . . .';
        setTimeout(PlayElse, 500);
    }
}