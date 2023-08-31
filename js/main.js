window.onload = () => {
    var highscore = sessionStorage.getItem('record');
    if (highscore !== null) {
        record.innerHTML = highscore;
    }
}

const findClass = (className) => document.querySelector(className);

function pontua(position) {
    return (position / container.clientWidth * 100) > 80;
}

const mario = findClass('.mario');
const pipe = findClass('.pipe');
const cloud = findClass('.clouds');
const reset = findClass('.reset');
const placar = findClass('.placar');
const record = findClass('.highscore');
const container = findClass('.container');

window.onbeforeunload = () => {
    sessionStorage.setItem('record', record.innerHTML);
}

let actualplacar = 0;

let gameIsOver = false;

function jump() {
    if (gameIsOver === false) {
        mario.classList.add('jump');

        setTimeout(() => {
            mario.classList.remove('jump');
            const pipePosition = pipe.offsetLeft;
            const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

            if (pontua(pipePosition) && marioPosition < 20) {
                actualplacar = +placar.innerHTML;
                placar.innerHTML = actualplacar + 1;
            }

        }, 600);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    const cloudPosition = cloud.offsetLeft;

    if (pipePosition <= 80 && pipePosition > 0 && marioPosition < 80) {

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;
        mario.style.width = '60px';
        mario.style.marginLeft = '20px';
        mario.src = './images/game-over.png';

        cloud.style.animation = 'none';
        cloud.style.left = `${cloudPosition}px`;

        sleep(160).then(() => {
            reset.style.opacity = '1';
            document.addEventListener('keydown', (e) => {
                if (e.key === " ") {
                    reset.click();
                }
            })
            reset.onclick = () => {
                location.reload();
            }
        })

        actualplacar = +placar.innerHTML;

        let highrecord = +record.innerHTML;

        if (actualplacar > highrecord) {
            record.innerHTML = actualplacar;
            highrecord = +record.innerHTML;
        }

        gameIsOver = true;

        clearInterval(loop);
    }

}, 10);

document.addEventListener('keydown', (event) => {
    if (event.repeat === true) {
        return;
    }
    jump();
});