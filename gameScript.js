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

function alwaysSecond(inn) { //При нажатии на всегда второй
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
    let complexityInGameScriptJS = localStorage.getItem('complexity'); //Сложность
    let e = localStorage.getItem('computer') || 'krest.png'; //Файл скина из памяти
    let computerSkin = `url(${e})`; //Скин компьютера с url
    function computerCanWin(where) { //Компьютер сделал выбор
        document.getElementById(`item_${where}`).style.backgroundImage = computerSkin;
        document.getElementById(`item_${where}`).removeAttribute('onclick');
        map[where] = 2;
        sessionStorage.setItem('map', JSON.stringify(map));
    }
    function lookingWin(start, step, team) { //Варианты
        if ((map[start] == team) && (map[start + step] == team) && (map[start + (step*2)] == 0)) {
            shoot = start + (step*2);
        }
        if ((map[start] == team) && (map[start + step] == 0) && (map[start + (step*2)] == team)) {
            shoot = start + step;
        }
        if ((map[start] == 0) && (map[start + step] == team) && (map[start + (step*2)] == team)) {
            shoot = start;
        }
    }
    function lookBestWin(s) { //Поиск вариантов
        //lookingWin(start, step, team);
        /*Горизонталь*/
        i = 0;
        while (i <= 12) {
            lookingWin(i, 1, s);
            i += 4;
        }
        i = 1;
        while (i <= 13) {
            lookingWin(i, 1, s);
            i += 4;
        }
        /*Вертикаль*/
        i = 0;
        while (i <= 3) {
            lookingWin(i, 4, s);
            i += 1;
        }
        i = 1;
        while (i <= 7) {
            lookingWin(i, 4, s);
            i += 1;
        }
        /*Диагональ*/
        lookingWin(0, 5, s);
        lookingWin(5, 5, s);
        lookingWin(1, 5, s);
        lookingWin(4, 5, s);
        /**/
        lookingWin(2, 3, s);
        lookingWin(3, 3, s);
        lookingWin(6, 3, s);
        lookingWin(7, 3, s);
    }
    let shoot; //Выстрел
    let mx = 0; //Ограничение количества циклов, в зависимости от поля, (3 на 3) || (4 на 4)
    /*Для начала стреляем в случайное место*/
    let i = 1; //Счётчик для циклов
    mx = 16;
    while (i == 1) {
        shoot = Math.floor(Math.random() * mx);
        if (map[shoot] == 0) {
            i++;
        }
    }

    /*Не даём человеку выиграть, сложный режим*/
    if (complexityInGameScriptJS == '2') {
        lookBestWin(1);
    }

    /*Выигрываем по возможности*/
    if ((complexityInGameScriptJS == '1') || (complexityInGameScriptJS == '2')) {
        lookBestWin(2);
    }

    /*Стреляем*/
    computerCanWin(shoot);
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