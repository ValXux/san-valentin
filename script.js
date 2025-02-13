const btnOpenElement = document.querySelector('#open');
const btnCloseElement = document.querySelector('#close');
const yesNoElement = document.querySelector('.boton');
const btnYes = document.querySelector('#yes');
const btnNo = document.querySelector('#no');

btnCloseElement.disabled = true;

btnOpenElement.addEventListener('click', () => {
    btnOpenElement.disabled = true;
    btnCloseElement.disabled = false;
    const coverElement = document.querySelector('.cover');
    coverElement.classList.add('open-cover');

    setTimeout(() => {
        coverElement.style.zIndex = -1;
        const paperElement = document.querySelector('.paper');
        paperElement.classList.remove('close-paper');
        paperElement.classList.add('open-paper');
        yesNoElement.style.display = 'flex';
        const heartElement = document.querySelector('.heart');
        heartElement.style.display = 'block';
    }, 500);
});

btnCloseElement.addEventListener('click', () => {
    btnOpenElement.disabled = false;
    btnCloseElement.disabled = true;
    const coverElement = document.querySelector('.cover');
    const paperElement = document.querySelector('.paper');
    paperElement.classList.remove('open-paper');
    paperElement.classList.add('close-paper');
    yesNoElement.style.display = 'none';

    setTimeout(() => {
        coverElement.style.zIndex = 0;
        coverElement.classList.remove('open-cover');
        const heartElement = document.querySelector('.heart');
        heartElement.style.display = 'none';
        btnNo.style.width = 'auto';
        btnNo.style.height = 'auto';
        btnYes.style.width = 'auto';
        btnYes.style.height = 'auto';
        stopEmojiRain();
        removeYesMessage();
    }, 500);
});

btnYes.addEventListener('click', () => {
    btnYes.classList.add('btn-fullscreen');
    createEmojiRain();
    showYesMessage();
});

btnNo.addEventListener('click', () => {
    btnNo.classList.add('btn-fullscreen');
    const currentWidth = parseInt(window.getComputedStyle(btnYes).width);
    const currentHeight = parseInt(window.getComputedStyle(btnYes).height);
    btnYes.style.width = `${currentWidth + 10}px`;
    btnYes.style.height = `${currentHeight + 10}px`;

    // Cambiar el texto del botón "No"
    currentTextIndex = (currentTextIndex + 1) % noButtonTexts.length;
    btnNo.textContent = noButtonTexts[currentTextIndex];
});

// Array de textos para el botón "No"
const noButtonTexts = ["No", "Que?", "Estas segura?", "Mamawebo", "Olvídalo"];
let currentTextIndex = 0;

function createEmojiRain() {
    const emojiArray = ["❤️", "😍", "😘", "🍆", "💘", "🥑", "🍑"];
    const emojiCount = 100;

    for (let i = 0; i < emojiCount; i++) {
        const emoji = document.createElement('div');
        emoji.classList.add('emoji');
        emoji.textContent = emojiArray[Math.floor(Math.random() * emojiArray.length)];
        emoji.style.left = `${Math.random() * 100}vw`;
        emoji.style.animationDuration = `${Math.random() * 2 + 3}s`;
        document.body.appendChild(emoji);

        // Remove emoji after animation ends
        emoji.addEventListener('animationend', () => {
            emoji.remove();
        });
    }
}

function showYesMessage() {
    const message = document.createElement('div');
    message.textContent = "Sabía que dirías que SÍ";
    message.classList.add('yes-message');
    document.body.appendChild(message);
}

function stopEmojiRain() {
    const emojis = document.querySelectorAll('.emoji');
    emojis.forEach(emoji => emoji.remove());
}

function removeYesMessage() {
    const message = document.querySelector('.yes-message');
    if (message) {
        message.remove();
    }
}