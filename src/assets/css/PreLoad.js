import './PreLoad.scss';
import Images from '../img/Image';
function PreLoad() {
    return (
        <div className='preload-container'>
            <div className='header'>
                <div className='logo'>
                    <img src={Images.PreLoad.logo} alt='' />
                </div>
                <div className='language'>
                    <span>Chọn ngôn ngữ hiển thị</span>
                    <img src={Images.PreLoad.icon} alt='' />
                </div>
            </div>
            <div className='content'>
                <div className='image-content'>
                    <img src={Images.PreLoad.content} alt='' />
                </div>
                <div className='load-intro'>
                    <div className='load-intro__1'></div>
                    <div className='load-intro__3'>Chào mừng đến...</div>
                    <div className='load-intro__4'>Duolingo</div>
                    <div className='load-intro__5'>Code bằng ReactJS</div>
                    <div className='load-intro__6'>Bởi Thái Học</div>
                    <div className='ball__1' />
                    <div className='ball__2' />
                    <div className='ball__3' />
                </div>
            </div>
        </div>

    );
}

export default PreLoad;
