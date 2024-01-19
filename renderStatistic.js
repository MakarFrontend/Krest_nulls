let forKarmaFunc = 0;
function sumKarma(acc, item) {
    if (item == 'gameOver') {
        forKarmaFunc = acc - 1;
    } else if (item == 'win') {
        forKarmaFunc = acc + 2;
    }
    return forKarmaFunc;
}
let history = JSON.parse(localStorage.getItem("history"));
let ulHistory = document.getElementById('hisroriesOfWin');
let karma = history.reduce(sumKarma, 0);
if (history != null) {
    history.forEach((item) => {
        let li = document.createElement('li');
        if (item == 'gameOver') {
            li.innerHTML = '<strong>Поражение</strong>';
            li.style.backgroundColor = '#B22222';
        } else if (item == 'win') {
            li.innerHTML = '<strong>Победа</strong>';
            li.style.backgroundColor = '#00FF00';
        } else if (item == 'nobody') {
            li.innerHTML = '<strong>Ничья</strong>';
            li.style.backgroundColor = '#696969';
        }
        ulHistory.prepend(li);
    });
    document.querySelector('#karma').innerHTML = karma;
}