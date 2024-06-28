const go = document.getElementById('go_massage')
var CHAT = document.getElementById('chat');


go.addEventListener('click', function() {
// Найти элемент input на странице
var inputElement = document.getElementById('input_massage');

// Получить значение текста из input
var textFromInput = inputElement.value;
if (textFromInput == "") {}

else {
// Создать новый элемент основного дива
var mainDiv = document.createElement('div');

// Добавить класс к основному диву
mainDiv.classList.add('in');

// Создать новый элемент вложенного дива
var nestedDiv = document.createElement('div');

// Добавить класс к вложенному диву
nestedDiv.classList.add('massage_in');

// Установить текстовое содержимое во вложенном диве
nestedDiv.innerHTML = textFromInput;

// Добавить вложенный див в основной див
mainDiv.appendChild(nestedDiv);

// Найдите другой див, куда хотите добавить основной див
var CHAT = document.getElementById('chat');

// Добавить основной див внутрь другого дива
CHAT.appendChild(mainDiv);

document.getElementById("input_massage").value = '';

CHAT.scrollTop = CHAT.scrollHeight;

go_out();
go_out_two();
}});





function go_out() {


const randomTime = Math.floor(Math.random() * 5) + 1;

setTimeout(function() {
var mainDiv = document.createElement('div');

// Добавить класс к основному диву
mainDiv.classList.add('out');

// Создать новый элемент вложенного дива
var nestedDiv = document.createElement('div');

// Добавить класс к вложенному диву
nestedDiv.classList.add('massage_out');

// Установить текстовое содержимое во вложенном диве
nestedDiv.innerHTML = 'Запрос обрабатывается, подождите.';

// Добавить вложенный див в основной див
mainDiv.appendChild(nestedDiv);

// Найдите другой див, куда хотите добавить основной див
var CHAT = document.getElementById('chat');

// Добавить основной див внутрь другого дива
CHAT.appendChild(mainDiv);
CHAT.scrollTop = CHAT.scrollHeight;
}, randomTime * 300000);


};



function go_out_two() {


const randomTime = Math.floor(Math.random() * 5) + 1;

setTimeout(function() {
var mainDiv = document.createElement('div');

// Добавить класс к основному диву
mainDiv.classList.add('out');

// Создать новый элемент вложенного дива
var nestedDiv = document.createElement('div');

// Добавить класс к вложенному диву
nestedDiv.classList.add('massage_out');

// Установить текстовое содержимое во вложенном диве
nestedDiv.innerHTML = 'Обратитесь пожалуйста (ссылка) к главному администратору!';

// Добавить вложенный див в основной див
mainDiv.appendChild(nestedDiv);

// Найдите другой див, куда хотите добавить основной див
var CHAT = document.getElementById('chat');

// Добавить основной див внутрь другого дива
CHAT.appendChild(mainDiv);
CHAT.scrollTop = CHAT.scrollHeight;
}, randomTime * 300000);

};