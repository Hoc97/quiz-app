import Header from '../Header/Header';
import videoHomepage from '../assets/video/video-homepage.mp4';
import './Home.scss';
import { Button } from 'react-bootstrap';
function Home() {
    return (
        <div className='wrapper'>
            <Header />
            <div className='container-home'>
                <video autoPlay muted loop>
                    <source src={videoHomepage} type='video/mp4' />
                </video>
                <div className='home-content-box'>
                    <div className='content-title'>
                        <h1 className='content-title-h1'>There's a better way to ask</h1>
                        <p className='content-title-p'>
                            You don't want to make a boring form. And your audience won't answer one. Create a typeform
                            instead and make everyone happy.
                        </p>
                        <Button className='content-title-btn' variant='dark'>
                            Get started - it's free
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
