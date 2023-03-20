import Images from '../../../../assets/img/Image';
import Fade from 'react-reveal/Fade';
import Flip from 'react-reveal/Flip';
import './Feedback.scss';


export default function Feedback() {
    return (
        <div className='feedback'>
            <Fade bottom>
                <div className='ball' />
            </Fade>
            <div className='content-wrap'>
                <Fade bottom>
                    <span className='title'> Luôn lắng nghe những tâm tư của bạn </span>
                </Fade>
            </div>
            <div className='feedback-ls'>
                {[1, 2, 3, 4, 5, 6].map((index) => (
                    <Flip bottom key={`feedback_${index}`}>
                        <div className='item'>
                            <div className='header'>
                                <div className='avatar'> </div>
                                <div className='title'>
                                    <span> Tên người dùng </span>
                                    <div className='star-ls'>
                                        <img src={Images.Feedback.starActive} alt='' />
                                        <img src={Images.Feedback.starActive} alt='' />
                                        <img src={Images.Feedback.starActive} alt='' />
                                        <img src={Images.Feedback.starActive} alt='' />
                                        <img src={Images.Feedback.star} alt='' />
                                    </div>
                                </div>
                            </div>
                            <span className='detail'>
                                “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.Duis aute eu fugiat nulla pariatur.Excepteur
                                sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                                est laborum.”
                            </span>
                        </div>
                    </Flip>
                ))}
            </div>
        </div>
    );
}
