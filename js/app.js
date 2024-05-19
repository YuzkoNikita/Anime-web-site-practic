/* Библиотека Swiper start */
const swiperText = new Swiper('.swiper' , {
    speed: 800,
    pagination: {
        el: '.swiper-pagination', 
        clickable: true,
    },
    navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next'
    }
})
/* Библиотека Swiper end */

let next_btn = document.querySelector('.swiper-button-next');
let prev_btn = document.querySelector('.swiper-button-prev');
let playpause_btn = document.querySelector('.playpause-track');
let randomIcon = document.querySelector('.random-track');
let volume_slider = document.querySelector('.volume_slider');

let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        music :  "music/opening_-_klinok-rassekayuschiy-demonov.mp3"
    },
    {
        music :  "music/ВанПис-1опенинг_(muzmo.su).mp3"
    },
    {
        music :  "music/Eve Kaikai Kitan.mp3"
    },
];

alert ("Для воспроизвидения звука нажмите на иконку звука в правом верхнем углу экрана");

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();
    curr_track.play();
    setVolume();

    curr_track.addEventListener('ended', repeatTrack);
}

function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}

function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}

function reset(){
}

function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}

function playTrack(){
    curr_track.play();
    isPlaying = true;
}

function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
}

function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}

function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
