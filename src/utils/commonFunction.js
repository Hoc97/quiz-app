import { store } from '../redux/store';



function setCookie(cname, cvalue, exhours) {
    const d = new Date();
    d.setTime(d.getTime() + (exhours * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


function checkCookie() {
    let user = getCookie("username");
    if (user !== "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user !== "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const toHHMMSS = (secs) => {
    const sec_num = parseInt(secs, 10);
    const hours = Math.floor(sec_num / 3600);
    const minutes = Math.floor(sec_num / 60) % 60;
    const seconds = sec_num % 60;
    return [hours, minutes, seconds]
        .map(v => v < 10 ? "0" + v : v)
        .join(" : ");
};

const timerQuizToSecs = (timerQuiz) => {
    const { dispatch } = store;
    if (timerQuiz === 0) return 0;
    const time = (new Date(timerQuiz) - new Date()) / 1000;
    if (time <= 0) dispatch({ type: 'REFRESH_LISTQUIZ' });
    return time > 0 ? time : 0;
};



const tranferToAlphabet = (charA, charZ) => {
    let a = [];
    let i = `${charA}`.charCodeAt(0) + 17;
    let j = `${charZ}`.charCodeAt(0) + 17;
    for (; i <= j; ++i) {
        a.push(String.fromCharCode(i));
    }
    return a;
};


const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

// blob is e.target.files[0] => return data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQAB...
const blobToBase64 = (blob) => {
    return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
};

//return a promise that resolves with a File instance
const urltoFile = (url, filename, mimeType) => {
    return (fetch(url)
        .then(function (res) { return res.arrayBuffer(); })
        .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
    );
};



export {
    setCookie,
    getCookie,
    checkCookie,
    validateEmail,
    blobToBase64,
    urltoFile,
    tranferToAlphabet,
    timerQuizToSecs,
    toHHMMSS,
    sleep
};