import './PreLoad.scss';
function PreLoad() {
    return (
        <div className='preload-container'>
            <div className='header'>
                <div className='logo'>
                    <img src='https://design.duolingo.com/7d3b95abf67001cde6ea.svg' alt='' />
                </div>
                <div className='language'>
                    <span>Chọn ngôn ngữ hiển thị</span>
                    <img src='https://learn.mochidemy.com/image/1b93d0e0dcc21b519b136dd948ec3e80.png' alt='' />
                </div>
            </div>
            <div className='content'>
                <div className='image-content'>
                    <img src='https://design.duolingo.com/fe225c25f1c6afe81424.svg' alt='' />
                </div>
                <div className='load-intro'>
                    <div className='load-intro__1'></div>
                    <div className='load-intro__3'>Welcome To...</div>
                    <div className='load-intro__4'>Duolingo</div>
                    <div className='load-intro__5'>Coded By ReactJS</div>
                    <div className='load-intro__6'>By Thai Hoc</div>
                    <div className='ball__1' />
                    <div className='ball__2' />
                    <div className='ball__3' />
                </div>
            </div>

        </div>

    );
}

export default PreLoad;
