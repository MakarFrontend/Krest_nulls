/* teams
0 - empty
1 - people
2 - computer
*/
let mapForMe = [0, 1, 2,
                3, 4, 5,
                6, 7, 8];
let map = [0, 0, 0, 0, 0, 0, 0, 0, 0];

let skins = ['url(null.png)', 'url(krest.png)', 'url(trap.png)', 'URL(oval.png)', 'url(treangle.png)', 'url(romb.png)', 'url(kvadrat.png)']; //Массив со скинами
peopleSkin = skins[5]; //Скин человека
computerSkin = skins[0]; //Скин компьютера

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
        map[where] = 2;
    }
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
    //Теперь не даём выиграть человеку
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