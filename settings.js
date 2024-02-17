const choseSkinDiag = document.getElementById('choseSkin'); //Модальное окно выбора скина
choseSkinDiag.setAttribute('onclick', "closeGameRezult('choseSkin')");
const choseSkinContent = document.getElementById('choseSkinContent'); //Внутри диалога
const gameMap = document.getElementById('gameMap');
let renderCondition = false;

class Skin {
    constructor(URL) {
        this.URL = URL;
    }
}

let nulls = new Skin('null.png');
let krest = new Skin('krest.png');
let trap = new Skin('trap.png');
let oval = new Skin('oval.png');
let treangle = new Skin('treangle.png');
let romb = new Skin('romb.png');
let kvadrat = new Skin('kvadrat.png');
let plus = new Skin('plus.png');

let kvadratDot = new Skin('kvadratDot.png');
let spiralDot = new Skin('spiralDot.png');
let smileDot = new Skin('smileDot.png');
let dotOnly = new Skin('dotOnly.png');

let earthP = new Skin('earthDot.png');
let jupiterP = new Skin('jupiter.png');
let moonP = new Skin('moonP.png');
let satyrnP = new Skin('saturnP.png');

let blob1 = new Skin('blob1.png');
let blob2 = new Skin('blob2.png');
let blob3 = new Skin('blob3.png');
let blob4 = new Skin('blob4.png');

let baseSkins = [];
let dotSkins = [];
let planetSkins = [];
let blobs = [];
baseSkins.push(nulls, krest, trap, oval, treangle, romb, kvadrat, plus);
dotSkins.push(spiralDot, smileDot, kvadratDot, dotOnly);
planetSkins.push(earthP, moonP, jupiterP, satyrnP);
blobs.push(blob1, blob2, blob3, blob4);

function changeSkin(url, why) { //Меняем скин при нажатии
    let mapInSettings = JSON.parse(sessionStorage.getItem('map'));

    function changeGameLiBack(whyPl) { //Меняем скин в поле
        let i = 0;
        while (i < 16) {
            if (whyPl == '1') {
                if (mapInSettings[i] == whyPl) {
                    document.getElementById(`item_${i}`).style.backgroundImage = `url(${localStorage.getItem('people')})`;
                }
            } else if (whyPl == '2') {
                if (mapInSettings[i] == whyPl) {
                    document.getElementById(`item_${i}`).style.backgroundImage = `url(${localStorage.getItem('computer')})`;
                }
            }
            i++;
        }
    }

    if (why == '1') {
        localStorage.setItem('people', url);
        document.getElementById('peopleSkinChange').setAttribute('src', localStorage.getItem('people'));
        changeGameLiBack('1');
    } else {
        localStorage.setItem('computer', url);
        document.getElementById('computerSkinChange').setAttribute('src', localStorage.getItem('computer'));
        changeGameLiBack('2');
    }
}

function clickForChangeSkin(why) {
    function createHeadline(txt, important) {
        let headLine = document.createElement('p');
        headLine.innerHTML = txt;
        headLine.style.float = 'left';
        headLine.style.marginLeft = '5px';
        headLine.style.marginTop = '5px';
        headLine.style.display = 'block';
        headLine.style.backgroundColor = '#000000';
        headLine.style.width = '100%';
        if (important == 1) {
            headLine.style.position = 'fixed';
            headLine.style.float = 'left';
            headLine.style.marginLeft = '0px';
            headLine.style.marginTop = '0px';
            headLine.style.height = '20px';
            headLine.style.width = '120px';
            headLine.style.border = '1px #FFFFFF solid';
            headLine.style.top = document.getElementById('choseSkin').style.top - 5;
            headLine.style.left = document.getElementById('choseSkin').style.left - 5;
            choseSkinDiag.append(headLine);
        }
        choseSkinContent.append(headLine);
    }
    function addSkinToModal(url) {
        let skinIMG = document.createElement('img');
        skinIMG.setAttribute('src', url);
        skinIMG.setAttribute('onclick', `changeSkin('${url}', '${why}')`);
        skinIMG.style.cursor = 'pointer';
        skinIMG.style.height = '40px';
        skinIMG.style.weight = '40px';
        skinIMG.style.marginTop = '10px';
        skinIMG.style.marginLeft = '10px';
        skinIMG.style.marginBottom = '5px';
        skinIMG.style.border = '1px solid #FFF'
        skinIMG.style.backgroundSize = 'cover';
        choseSkinContent.append(skinIMG);
    }

    choseSkinContent.innerHTML = '';

    /*switch (why) {
        case 1:
            createHeadline('Ваш скин:', 1);
            break;
        case 2:
            createHeadline('Скин компьютера:', 1);
            break;
    }*/
    createHeadline('Базовые скины');
    baseSkins.forEach((item) => addSkinToModal(item.URL, 0));

    createHeadline('Скины - точки');
    dotSkins.forEach((item) => addSkinToModal(item.URL, 0));

    createHeadline('Планеты');
    planetSkins.forEach((item) => addSkinToModal(item.URL, 0));

    createHeadline('Кляксы');
    blobs.forEach((item) => addSkinToModal(item.URL, 0));

    choseSkinDiag.style.height = '130px';
    document.body.style.filter = 'blur(2px)';
    choseSkinDiag.showModal();
}

function reset() {
    localStorage.removeItem('wins');
    localStorage.removeItem('overs');
    localStorage.removeItem('nos');
    document.querySelector('#wins').innerHTML = '0';
    document.querySelector('#overs').innerHTML = '0';
    document.querySelector('#nos').innerHTML = '0';
}

function complexity(now) { //Уровень сложности
    switch (now) {
        case 'Лёгкий':
            document.getElementById('complexity').innerHTML = 'Стандартный';
            document.getElementById('complexity').style.color = '#FFFF00';
            localStorage.setItem('complexity', '1');
            break;
        case 'Стандартный':
            document.getElementById('complexity').innerHTML = 'Сложный';
            document.getElementById('complexity').style.color = '#FF0000';
            localStorage.setItem('complexity', '2');
            break;
        case 'Сложный':
            document.getElementById('complexity').innerHTML = 'Лёгкий';
            document.getElementById('complexity').style.color = '#00FF00';
            localStorage.setItem('complexity', '0');
            break;
    }
}