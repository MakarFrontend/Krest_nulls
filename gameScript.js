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
let map; //Карта игрового поля
let mapNow; //Какое поле сейчас
let button = document.getElementById('doButton'); //Кнопка второго, заново
let conditionAlwaysSecond = localStorage.getItem('alwaysSecond') || false; //Состояние второго всегда
let mapOnLoad = localStorage.getItem('size') || '3 на 3';
createGameMap(mapOnLoad);

if (conditionAlwaysSecond === 'false') { //Переводим строки в логику
    conditionAlwaysSecond = false;
} else if (conditionAlwaysSecond === 'true') {
    conditionAlwaysSecond = true;
}

if (conditionAlwaysSecond == true) { //Если Всегда второй включён
    alwaysSecond('Отключено');
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
        if ((map.join(' ') == '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0') || map.join(' ') == '0 0 0 0 0 0 0 0 0') {
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
    let r = 16;
    if (mapNow == 3) {
        r = 9
    }
    while (e < r) {
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
        if (mapNow == 3) { 
            map = [0, 0, 0, /**/ 0, 0, 0, /**/ 0, 0, 0];
        } else if (mapNow == 4) {
            map = [0, 0, 0, 0, /**/ 0, 0, 0, 0, /**/ 0, 0, 0, 0, /**/ 0, 0, 0, 0, /**/];
        }
        sessionStorage.setItem('map', JSON.stringify(map));
        computerPlay();
    } else {
        button.removeAttribute('onclick');
        button.setAttribute('onclick', `doButton("second")`);
        button.innerHTML = 'Ходить вторым';
        document.getElementById('whyPlay').innerHTML = 'Ваш ход . . .';
        if (mapNow == 3) { 
            map = [0, 0, 0, /**/ 0, 0, 0, /**/ 0, 0, 0];
        } else if (mapNow == 4) {
            map = [0, 0, 0, 0, /**/ 0, 0, 0, 0, /**/ 0, 0, 0, 0, /**/ 0, 0, 0, 0, /**/];
        }
        sessionStorage.setItem('map', JSON.stringify(map));
    }
}

function checkWin(team) { //Проверка на победу
    function checkNobody() { //Функция Проверки ничьи
        let i = 0;
        let u = 16;
        let check = 0;
        if (mapNow == 3) {
            u = 9;
        }
        while (i < u) {
            let itemNow = map[i];
            if ((itemNow == 1) || (itemNow == 2)) {
                check++;
            }
            i++;
        }
        if (check == u) {
            return true;
        } else {
            return false;
        }
    }
    function checking(start, step) { //Варианты
        if ((map[start] == team) && (map[start + step] == team) && (map[start + (step*2)] == team)) {
            check = true;
        } else if ((map[start] == team) && (map[start + step] == team) && (map[start + (step*2)] == team)) {
            check = true;
        } else if ((map[start] == team) && (map[start + step] == team) && (map[start + (step*2)] == team)) {
            check = true;
        }
    }
    let check = false;
    /*Горизонталь*/
    let i = 0;
    if (mapNow == 4) {
        while (i <= 12) {
            checking(i, 1);
            i += 4;
        }
        i = 1;
        while (i <= 13) {
            checking(i, 1);
            i += 4;
        }
    } else if (mapNow == 3) {
        while (i <= 6) {
            checking(i, 1);
            i += 3;
        }
    }
    /*Вертикаль*/
    i = 0;
    if (mapNow == 4) {
        while (i <= 3) {
            checking(i, 4);
            i += 1;
        }
        i = 4;
        while (i <= 7) {
            checking(i, 4);
            i += 1;
        }
    } else if (mapNow == 3) {
        while (i <= 2) {
            checking(i, 3);
            i += 1;
        }
    }
    /*Диагональ*/
    if (mapNow == 4) {
        checking(0, 5);
        checking(5, 5);
        checking(1, 5);
        checking(4, 5);
        /**/
        checking(2, 3);
        checking(3, 3);
        checking(6, 3);
        checking(7, 3);
    } else if (mapNow == 3) {
        checking(0, 4);
        checking(2, 2);
    }
    if (check == true) {
        return check;
    }
    let checkNobodyRezult = checkNobody();
    if (checkNobodyRezult == true) { //Если ничья
        check = null;
        }
    return check;
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
        if (mapNow == 4) {
            while (i <= 12) {
                lookingWin(i, 1, s);
                i += 4;
            }
            i = 1;
            while (i <= 13) {
                lookingWin(i, 1, s);
                i += 4;
            }
        } else if (mapNow == 3) {
            while (i <= 6) {
                lookingWin(i, 1, s);
                i += 3;
            }
        }
        /*Вертикаль*/
        i = 0;
        if (mapNow == 4) {
            while (i <= 3) {
                lookingWin(i, 4, s);
                i += 1;
            }
            i = 4;
            while (i <= 7) {
                lookingWin(i, 4, s);
                i += 1;
            }
        } else if (mapNow == 3) {
            while (i <= 2) {
                lookingWin(i, 3, s);
                i += 1;
            }
        }
        /*Диагональ*/
        if (mapNow == 4) {
            lookingWin(0, 5, s);
            lookingWin(5, 5, s);
            lookingWin(1, 5, s);
            lookingWin(4, 5, s);
            /**/
            lookingWin(2, 3, s);
            lookingWin(3, 3, s);
            lookingWin(6, 3, s);
            lookingWin(7, 3, s);
        } else if (mapNow == 3) {
            lookingWin(0, 4, s);
            lookingWin(2, 2, s);
        }
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
    /*Выигрываем по возможности, стандарт и сложный*/
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
    let ball = Number(localStorage.getItem(event));
    ball++;
    localStorage.setItem(String(event), String(ball)); //Запись в память

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

function Play(id) { //Функция игры
    let e = 0; //Счётчик
    let o; //Конец счётчика
    if (mapNow == 3) {
        o = 9;
    } else if (mapNow == 4) {
        o = 16;
    }
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
        while (e < o) {
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
                while (e < o) {
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

function newMap(whatMapNow) {
    const gameMap = document.getElementById('gameMap');
    let f = 0; //Счётчик
    switch (whatMapNow) {
        case '4 на 4':
            document.getElementById('mapSize').innerHTML = '3 на 3';
            mapNow = 3;
            map = [0, 0, 0, /**/ 0, 0, 0, /**/0, 0, 0];
            gameMap.innerHTML = '';
            gameMap.style.paddingLeft = '10px';
            while (f <= 8) {
                let y = document.createElement('button');
                y.className = 'gameLi';
                y.setAttribute('id', `item_${f}`);
                y.setAttribute('onclick', `Play(${f})`)
                y.style.width = '101px';
                y.style.height = '101px';
                gameMap.append(y);
                f += 1;
            }
            localStorage.setItem('size', '3 на 3');
            againInMain()
            break;
        case '3 на 3':
            document.getElementById('mapSize').innerHTML = '4 на 4';
            mapNow = 4;
            map = [0, 0, 0, 0, /**/0, 0, 0, 0, /**/0, 0, 0, 0, /**/0, 0, 0, 0/**/];
            gameMap.innerHTML = '';
            gameMap.style.paddingLeft = '12px';
            while (f <= 15) {
                let y = document.createElement('button');
                y.className = 'gameLi';
                y.setAttribute('id', `item_${f}`);
                y.setAttribute('onclick', `Play(${f})`)
                y.style.width = '75px';
                y.style.height = '75px';
                gameMap.append(y);
                f += 1;
            }
            localStorage.setItem('size', '4 на 4');
            againInMain()
            break;
    }
    sessionStorage.setItem('map', JSON.stringify(map));
}

function createGameMap(mapFromMemory) { //Делаем карту, в зависимости от той, которая была в памяти
    let f = 0; //переменная счётчик
    switch (mapFromMemory) {
        case '4 на 4':
            while (f <= 15) {
                let y = document.createElement('button');
                y.className = 'gameLi';
                y.setAttribute('id', `item_${f}`);
                y.setAttribute('onclick', `Play(${f})`)
                y.style.width = '75px';
                y.style.height = '75px';
                gameMap.append(y);
                f += 1;
            }
            document.getElementById('mapSize').innerHTML = '4 на 4';
            mapNow = 4;
            map = [0, 0, 0, 0, /**/0, 0, 0, 0, /**/0, 0, 0, 0, /**/0, 0, 0, 0/**/];
            gameMap.style.paddingLeft = '12px';
            break;
        case '3 на 3':
            while (f <= 8) {
                let y = document.createElement('button');
                y.className = 'gameLi';
                y.setAttribute('id', `item_${f}`);
                y.setAttribute('onclick', `Play(${f})`)
                y.style.width = '101px';
                y.style.height = '101px';
                gameMap.append(y);
                f += 1;
            }
            document.getElementById('mapSize').innerHTML = '3 на 3';
            mapNow = 3;
            map = [0, 0, 0, /**/ 0, 0, 0, /**/0, 0, 0];
            gameMap.style.paddingLeft = '10px';
            break;
    }
    againInMain();
}