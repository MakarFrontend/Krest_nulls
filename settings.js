const choseSkinDiag = document.getElementById('choseSkin');
choseSkinDiag.setAttribute('onclick', "closeGameRezult('choseSkin')");
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

let baseSkins = []; 
baseSkins.push(nulls, krest, trap, oval, treangle, romb, kvadrat);

function changeSkin(url, why) {
    if (why == 1) {
        localStorage.setItem('people', url);
        document.getElementById('peopleSkinChange').setAttribute('src', localStorage.getItem('people'));
    } else {
        localStorage.setItem('computer', url);
        document.getElementById('computerSkinChange').setAttribute('src', localStorage.getItem('computer'));
    }
}

function clickForChangeSkin(why) {
    function addSkinToModal(url) {
        let skinIMG = document.createElement('img');
        skinIMG.setAttribute('src', url);
        skinIMG.setAttribute('onclick', `changeSkin("${url}", "${why}")`);
        skinIMG.style.cursor = 'pointer';
        skinIMG.style.height = '40px';
        skinIMG.style.weight = '40px';
        skinIMG.style.marginLeft = '10px';
        skinIMG.style.marginBottom = '5px';
        skinIMG.style.border = '1px solid #FFF'
        skinIMG.style.backgroundSize = 'cover';
        choseSkinDiag.append(skinIMG);
    }

    document.getElementById('choseSkin').innerHTML = "";

    baseSkins.forEach((item) => addSkinToModal(item.URL));

    choseSkinDiag.style.height = '120px';
    choseSkinDiag.showModal();
}