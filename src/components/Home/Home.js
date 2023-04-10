import './Home.scss';
import { lazy } from 'react';
const Content = lazy(() => import('./modules/Content/Content'));
const Opinion = lazy(() => import('./modules/Opinion/Opinion'));
const GenZ = lazy(() => import('./modules/Genz/Genz'));
const AboutMe = lazy(() => import('./modules/AboutMe/AboutMe'));
const Feedback = lazy(() => import('./modules/Feedback/Feedback'));
const Footer = lazy(() => import('./modules/Footer/Footer'));
const Feature = lazy(() => import('./modules/Feature/Feature'));


function Home() {
  return (
    <div className='home-wrapper'>
      <Content />
      <Opinion />
      <Feature />
      <GenZ />
      <AboutMe />
      <Feedback />
      <Footer />
    </div>
  );
}

export default Home;
