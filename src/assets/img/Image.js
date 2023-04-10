import content2 from './opinion/content2';
export const PreLoadImg = {
    logo: require('./preload/logo.svg').default,
    icon: require('./preload/icon_VN.png'),
    content: require('./preload/content.svg').default,
};
export const Headers = {
    logo: require('./header/logo.svg').default,
};

export const Home = {
    content: require('./home/content.svg').default,
};
export const Opinions = {
    logo: require('./opinion/logo.svg').default,
    content1: require('./opinion/content1.png'),
    content2: `data:image/jpeg;base64,${content2}`,
    content3: require('./opinion/content3.png'),
    content4: require('./opinion/content4.png'),

};
export const AboutMeImg = {
    logo: require('./aboutme/logo.png'),
    content1: require('./aboutme/coming soon.png'),

};
export const Genz = {
    content1: require('./genz/1.PNG'),
    content2: require('./genz/2.PNG'),
    content3: require('./genz/3.PNG'),
    content4: require('./genz/4.PNG'),
    content5: require('./genz/4.1.PNG'),
    content6: require('./genz/5.PNG'),
    content7: require('./genz/6.PNG'),
};
export const FeedbackImg = {
    star: require('./feedback/star.svg').default,
    starActive: require('./feedback/starActive.svg').default,
};
export const Feature = {

};
export const Quiz = {
    Correct: require('./icon-correct.png'),
    inCorrect: require('./icon-incorrect.png'),
};
export const Doing = {
    icon: require('./doing/doing.png')
};
export const Admin = {
    admin: require('./admin/admin.svg').default,
};

const Images = {
    PreLoadImg,
    Headers,
    Home,
    Opinions,
    AboutMeImg,
    Genz,
    FeedbackImg,
    Feature,
    Quiz,
    Doing,
    Admin
};

export default Images;