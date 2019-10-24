import step1 from './assets/img/bean-1.jpg'
import step2 from './assets/img/bean-2.jpg'
import step3 from './assets/img/bean-3.jpg'
import step4 from './assets/img/bean-4.jpg'
import step5 from './assets/img/bean-5.jpg'
import step6 from './assets/img/bean-6.jpg'

const $step = document.querySelector('#current-step');
const $image = document.querySelector('#sprout-img');
const $waitingMessage = document.querySelector('#waiting-message');
const $aboutButton = document.querySelector('#about-button');
const $aboutInfo = document.querySelector('#about-info');
const $aboutClose = document.querySelector('#about-close');

const initImage = () => {
    if (!localStorage.getItem('sproutLastUpdate')) {
        $step.textContent = '1';
        $image.src = step1;
        localStorage.setItem('sproutStep', 1);
    } else {
        setImageFromMemory();
    }
}

const setImageFromMemory = () => {
    let step = localStorage.getItem('sproutStep');

    switch (parseInt(step)) {
        case 1:
            $step.textContent = '1';
            $image.src = step1;
            break;
        case 2:
            $step.textContent = '2';
            $image.src = step2;
            break;
        case 3:
            $step.textContent = '3';
            $image.src = step3;
            break;
        case 4:
            $step.textContent = '4';
            $image.src = step4;
            break;
        case 5:
            $step.textContent = '5';
            $image.src = step5;
            break;
        case 6:
            $step.textContent = '6';
            $image.src = step6;
            $image.classList.add('stable', 'last-step');
            $image.removeEventListener('click', updateIfAllowed);
            break;
        default:
            $image.src = step1;
    }

    if (!shouldImageUpdate()) {
        $image.classList.add('stable');
    } 
}

const shouldImageUpdate = () => {
    const lastUpdate = new Date(localStorage.getItem('sproutLastUpdate')) || new Date();
    const now = new Date();

    if (now.getMinutes() >= lastUpdate.getMinutes() + 10 || now.getHours() > lastUpdate.getHours() || now.getMonth() > lastUpdate.getMonth() || now.getFullYear() > lastUpdate.getFullYear()) {
        return true;
    }

    return false;
}

const updateIfAllowed = () => {
    shouldImageUpdate()
        ? updateImage() 
        : flashMessage()
}

const flashMessage = () => {
    $waitingMessage.style.opacity = 1;
    window.setTimeout(() => {
        $waitingMessage.style.opacity = 0
    }, 2000);
}

const updateImage = () => {
    let step = localStorage.getItem('sproutStep');

    $image.style.opacity = 0;

    window.setTimeout(() => {
        switch (parseInt(step)) {
            case 1:
                $step.textContent = '2';
                $image.src = step2;
                break;
            case 2:
                $step.textContent = '3';
                $image.src = step3;
                break;
            case 3:
                $step.textContent = '4';
                $image.src = step4;
                break;
            case 4:
                $step.textContent = '5';
                $image.src = step5;
                break;
            case 5:
                $step.textContent = '6';
                $image.src = step6;
                $image.classList.add('last-step');
                $image.removeEventListener('click', updateIfAllowed);
                break;
        }

        $image.classList.add('stable');
        window.setTimeout(() => {
            $image.style.opacity = 1;
        }, 100);
    
        const now = new Date();
        localStorage.setItem('sproutLastUpdate', now.toISOString());
        localStorage.setItem('sproutStep', parseInt(step) + 1);
    }, 500);

    

    
}

$aboutButton.addEventListener('click', () => {
    $aboutInfo.setAttribute('open', '');
});
$aboutClose.addEventListener('click', () => {
    $aboutInfo.removeAttribute('open')
});


$image.addEventListener('click', updateIfAllowed);

initImage();
