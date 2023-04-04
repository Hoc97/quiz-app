import './Content.scss';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Images from '../../../../assets/img/Image';
import Rotate from 'react-reveal/Rotate';
import Fade from 'react-reveal/Fade';
import { FaArrowRight } from 'react-icons/fa';

function Content() {
    const isAuthenticated = useSelector((state) => state.accountManage.isAuthenticated);
    const navigate = useNavigate();
    return (
        <div className='home-container'>
            <div className='content'>
                <div className='text'>
                    <div className='title'>
                        <Fade bottom>
                            <h1 className='title-h1'>TIẾNG ANH KHÓ, CÓ DUOLINGO</h1>
                            <p className='title-p'>
                                2023, Luyện thi TOEIC & Học tiếng Anh theo cách mới!
                            </p>

                            {isAuthenticated === false ? (
                                <Button
                                    className='title-btn'
                                    variant='dark'
                                    onClick={() => navigate('/login')}
                                >
                                    <span>ĐĂNG NHẬP</span>
                                    <span className='arrow-icon'><FaArrowRight /></span>
                                </Button>
                            ) : (
                                <Button
                                    className='title-btn'
                                    variant='success'
                                    onClick={() => navigate('/user')}
                                >
                                    <span>BẮT ĐẦU NGAY</span>
                                    <span className='arrow-icon'><FaArrowRight /></span>
                                </Button>
                            )}
                        </Fade>
                    </div>
                </div>
                <Rotate top right>
                    <div className='image'>
                        <img src={Images.Home.content} alt='' />
                    </div>
                </Rotate>
            </div>
            <div className='bg-infinite-text'>
                <div className='infinite-text'>
                    <p>Luyện tập hiệu quả, đạt thành tích cao nhé</p>
                    <p>Luyện tập hiệu quả, đạt thành tích cao nhé</p>
                    <p>Luyện tập hiệu quả, đạt thành tích cao nhé</p>
                    <p>Luyện tập hiệu quả, đạt thành tích cao nhé</p>
                    <p>Luyện tập hiệu quả, đạt thành tích cao nhé</p>
                    <p>Luyện tập hiệu quả, đạt thành tích cao nhé</p>
                    <p>Luyện tập hiệu quả, đạt thành tích cao nhé</p>
                    <p>Luyện tập hiệu quả, đạt thành tích cao nhé</p>

                </div>
            </div>
            <Fade right>
                <div className='home-footer'></div>
            </Fade>
        </div>
    );
}

export default Content;