const choseSkinDiag = document.getElementById('choseSkin'); //Модальное окно выбора скина
choseSkinDiag.setAttribute('onclick', "closeGameRezult('choseSkin')");
const choseSkinContent = document.getElementById('choseSkinContent'); //Внутри диалога
let renderCondition = false;

class Skin {
    constructor(URL, price) {
        this.URL = URL;
        this.price = price;
    }
}

let nulls = new Skin('null.png', 0);
let krest = new Skin('krest.png', 0);
let trap = new Skin('trap.png', 0);
let oval = new Skin('oval.png', 0);
let treangle = new Skin('treangle.png', 0);
let romb = new Skin('romb.png', 0);
let kvadrat = new Skin('kvadrat.png', 0);
let plus = new Skin('plus.png', 0);

let kvadratDot = new Skin('kvadratDot.png', 0);
let spiralDot = new Skin('spiralDot.png', 0);
let smileDot = new Skin('smileDot.png', 0);
let dotOnly = new Skin('dotOnly.png', 0);

let earthP = new Skin('earthDot.png', 0);
let jupiterP = new Skin('jupiter.png', 0);
let moonP = new Skin('moonP.png', 0);
let satyrnP = new Skin('saturnP.png', 0);

let baseSkins = [];
let dotSkins = [];
let planetSkins = [];
baseSkins.push(nulls, krest, trap, oval, treangle, romb, kvadrat, plus);
dotSkins.push(spiralDot, smileDot, kvadratDot, dotOnly);
planetSkins.push(earthP, moonP, jupiterP, satyrnP);

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
    function createHeadline(txt) {
        let headLine = document.createElement('p');
        headLine.style.float = 'left';
        headLine.style.marginLeft = '5px';
        headLine.style.marginTop = '5px';
        headLine.style.display = 'block';
        headLine.style.width = '100%';
        headLine.innerHTML = txt;
        choseSkinContent.append(headLine);
    }
    function addSkinToModal(url) {
        let skinIMG = document.createElement('img');
        skinIMG.setAttribute('src', url);
        skinIMG.setAttribute('onclick', `changeSkin('${url}', '${why}')`);
        skinIMG.style.cursor = 'pointer';
        skinIMG.style.height = '40px';
        skinIMG.style.weight = '40px';
        skinIMG.style.marginLeft = '10px';
        skinIMG.style.marginBottom = '5px';
        skinIMG.style.border = '1px solid #FFF'
        skinIMG.style.backgroundSize = 'cover';
        choseSkinContent.append(skinIMG);
    }

    choseSkinContent.innerHTML = '';

    switch (why) {
        case 1:
            createHeadline('Ваш скин:');
            break;
        case 2:
            createHeadline('Скин компьютера:');
            break;
    }
    createHeadline('Базовые скины');
    baseSkins.forEach((item) => addSkinToModal(item.URL));

    createHeadline('Скины - точки');
    dotSkins.forEach((item) => addSkinToModal(item.URL));

    createHeadline('Планеты');
    planetSkins.forEach((item) => addSkinToModal(item.URL));

    choseSkinDiag.style.height = '120px';
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