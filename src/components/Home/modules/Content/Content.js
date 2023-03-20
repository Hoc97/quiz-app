import './Content.scss';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
import Images from '../../../../assets/img/Image';
import Rotate from 'react-reveal/Rotate';
import Fade from 'react-reveal/Fade';

function Content() {
    const isAuthenticated = useSelector((state) => state.userManage.isAuthenticated);
    const navigate = useNavigate();
    // const { t } = useTranslation();
    return (
        <div className='home-container'>
            <div className='content'>
                <div className='text'>
                    <div className='title'>
                        <Fade bottom>
                            <h3 className='title-h1'>CÓ MỘT CÁCH TỐT HƠN ĐỂ HỎI</h3>
                            <p className='title-p'>
                                Bạn không muốn làm một hình thức nhàm chán. Và khán giả của bạn sẽ không trả lời một.
                                Thay vào đó, hãy tạo một vài thứ và khiến mọi người hài lòng.
                            </p>

                            {isAuthenticated === false ? (
                                <Button
                                    className='title-btn'
                                    variant='dark'
                                    onClick={() => navigate('/login')}
                                >
                                    <span>ĐĂNG NHẬP</span>
                                </Button>
                            ) : (
                                <Button
                                    className='title-btn'
                                    variant='success'
                                    onClick={() => navigate('/user')}
                                >
                                    <span>BẮT ĐẦU NGAY</span>
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
            <Fade right>
                <div className='home-footer'></div>
            </Fade>
        </div>
    );
}

export default Content;