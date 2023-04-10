import './TranstionPage.scss';
import { PreLoadImg } from '../img/Image';
function TranstionPage() {
    return (
        <div className='preload-container'>
            <div className='header'>
                <div className='logo'>
                    <img src={PreLoadImg.logo} alt='' />
                </div>
                <div className='language'>
                    <span>Chọn ngôn ngữ hiển thị</span>
                    <img src={PreLoadImg.icon} alt='' />
                </div>
            </div>
            <div className='content'>
                <div className='image-content'>
                    <img src={PreLoadImg.content} alt='' />
                </div>
                <div className='load-intro'>
                    <div className='load-intro__1'></div>
                    <div className='load-intro__2'>Welcome to</div>
                    <div className='load-intro__3'>Duolingo</div>
                    <div className='load-intro__4'>Code by ReactJS</div>
                    <div className='ball__1' />
                    <div className='ball__2' />
                    <div className='ball__3' />
                </div>
            </div>
        </div>

    );
}

export default TranstionPage;
