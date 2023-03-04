import Header from '../Header/Header';
import videoHomepage from '../../assets/video/video-homepage.mp4';
import './Home.scss';
import { Button } from 'react-bootstrap';
// import SideBar from '../SideBar/SideBar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
function Home() {
    const isAuthenticated = useSelector((state) => state.userManage.isAuthenticated);
    const navigate = useNavigate();
    const { t } = useTranslation();
    return (
        <div className='wrapper'>
            <Header />
            <div className='home-container'>
                <div className='content'>
                    <video autoPlay muted loop>
                        <source src={videoHomepage} type='video/mp4' />
                    </video>
                    <div className='content-box'>
                        <div className='content-title'>
                            {/* <h1 className='content-title-h1'>There's a better way to ask</h1>
                            <p className='content-title-p'>
                                You don't want to make a boring form. And your audience won't answer one. Create a
                                typeform instead and make everyone happy.
                            </p> */}
                            <h1 className='content-title-h1'>{t('homepage.title1')}</h1>
                            <p className='content-title-p'>
                                Bạn không muốn làm một hình thức nhàm chán. Và khán giả của bạn sẽ không trả lời một.
                                Thay vào đó, hãy tạo một kiểu chữ và khiến mọi người hài lòng.
                            </p>
                            {isAuthenticated === false ? (
                                <Button
                                    className='content-title-btn'
                                    variant='dark'
                                    onClick={() => navigate('/login')}
                                >
                                    Get started - it's free
                                </Button>
                            ) : (
                                <Button
                                    className='content-title-btn take-quiz'
                                    variant='success'
                                    onClick={() => navigate('/user')}
                                >
                                    Take the quiz now &gt;&gt;&gt;&gt;
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
