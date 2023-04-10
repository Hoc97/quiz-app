import { AboutMeImg } from '../../../../assets/img/Image';
import Fade from 'react-reveal/Fade';
import Flip from 'react-reveal/Flip';
import Rotate from 'react-reveal/Rotate';
import './AboutMe.scss';

export default function AboutMe() {
    return (
        <div className='aboutMe' id='aboutus'>
            <Fade bottom>
                <span className='title'> về Duolingo app </span>
            </Fade>
            <Fade bottom>
                <span className='detail'>Duolingo là app demo học tiếng Anh tạo bởi Thái Học </span>
            </Fade>
            <Rotate left top  >
                <span className='promise'> <img alt='' src={AboutMeImg.content1} /></span>
            </Rotate>
            <Flip bottom>
                <img alt='' src={AboutMeImg.logo} />
            </Flip>
            <Fade bottom>
                <div className='ball'></div>
            </Fade>
            <Fade bottom>
                <div className='ball2' />
            </Fade>
        </div>
    );
}
