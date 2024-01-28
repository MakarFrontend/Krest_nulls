"use strict";
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