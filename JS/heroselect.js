const socket = io();

const jonSnow_portrait = document.getElementById('jonsnow_portrait');
const danny_portrait = document.getElementById('danarys_portrait');
const ctaText = document.getElementById('ctaText');
const cta = document.getElementById('cta');
const ctabox = document.getElementById('ctaBox');
let hero;


socket.on('hero', setHeroSelected);

function setHeroSelected (p) {
    if(p === 1) {
        hero = 'Jon Snow';
    } else {
        hero = 'Danerys Targaryen'
    }
    console.log(hero);
    heroSelected(p);
}





jonSnow_portrait.addEventListener('click', (e) => {
    heroSelected(e);
});
danny_portrait.addEventListener('click', (e) => {
    heroSelected(e);
});

function heroSelected(e) {
    e.target.classList.add('selected');

    if(e.target === jonSnow_portrait || e === 1) {
        danny_portrait.classList.remove('selected');
        cta.classList.remove('dannySelected_cta');
        ctabox.classList.remove('dannySelected_box')
        cta.classList.add('jonSelected_cta');
        ctabox.classList.add('jonSelected_box');
    } else {
        jonSnow_portrait.classList.remove('selected');
        cta.classList.remove('jonSelected_cta');
        ctabox.classList.remove('jonSelected_box');
        cta.classList.add('dannySelected_cta');
        ctabox.classList.add('dannySelected_box');
    }

    ctaText.innerText = 'play';
    
}
