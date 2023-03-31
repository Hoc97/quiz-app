import content2 from './opinion/content2';
const Images = {
    PreLoad: {
        logo: require('./preload/logo.svg').default,
        icon: require('./preload/icon_VN.png'),
        content: require('./preload/content.svg').default,
    },
    Headers: {
        logo: require('./header/logo.svg').default,
    },
    Home: {
        content: require('./home/content.svg').default,
    },
    Opinion: {
        logo: require('./opinion/logo.svg').default,
        content1: require('./opinion/content1.png'),
        content2: `data:image/jpeg;base64,${content2}`,
        content3: require('./opinion/content3.png'),
        content4: require('./opinion/content4.png'),

    },
    AboutMe: {
        logo: require('./aboutme/logo.png'),
        content1: require('./aboutme/coming soon.png'),

    },
    Genz: {
        content1: require('./genz/dashboard.png'),
        content2: require('./genz/onlineexam.png'),
        content3: require('./genz/result.png'),
        content4: require('./genz/history.png'),
    },
    Feedback: {
        star: require('./feedback/star.svg').default,
        starActive: require('./feedback/starActive.svg').default,
    },
    Feature: {

    },
    Quiz: {
        Correct: require('./icon-correct.png'),
        inCorrect: require('./icon-incorrect.png'),
    }



};

export default Images;