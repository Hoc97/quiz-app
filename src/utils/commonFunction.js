

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
    // console.log(hours, minutes, seconds);
    return [hours, minutes, seconds]
        .map(v => v < 10 ? "0" + v : v)
        .join(" : ");
};

const timerQuizToSecs = (timerQuiz) => {
    if (timerQuiz === 0) return 0;
    let nexttHours = new Date(timerQuiz).getHours();
    let nextMinutes = new Date(timerQuiz).getMinutes();
    let nextSeconds = new Date(timerQuiz).getSeconds();
    let currentHours = new Date().getHours();
    let currentMinutes = new Date().getMinutes();
    let currentSeconds = new Date().getSeconds();
    if (nexttHours > currentHours) {
        nexttHours = nexttHours - 1;
        nextMinutes = nextMinutes + 60 - 1;
        nextSeconds = nextSeconds + 60;
    } else {
        nextMinutes = nextMinutes - 1;
        nextSeconds = nextSeconds + 60;
    }
    const time =
        (nexttHours - currentHours) * 3600
        + (nextMinutes - currentMinutes) * 60
        + (nextSeconds - currentSeconds);
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
    validateEmail,
    blobToBase64,
    urltoFile,
    tranferToAlphabet,
    timerQuizToSecs,
    toHHMMSS,
    sleep
};