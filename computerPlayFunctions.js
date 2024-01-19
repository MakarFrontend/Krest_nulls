export function computerWin() {
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