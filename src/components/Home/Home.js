import './Home.scss';
import Content from './modules/Content/Content';
import Opinion from './modules/Opinion/Opinion';
import GenZ from './modules/Genz/Genz';
import AboutMe from './modules/AboutMe/AboutMe';
import Feedback from './modules/Feedback/Feedback';
import Footer from './modules/Footer/Footer';
import Feature from './modules/Feature/Feature';

function Home() {
  // document.location.reload(true);
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
