import Flip from 'react-reveal/Flip';
import Bounce from 'react-reveal/Bounce';
import Fade from 'react-reveal/Fade';
import './Opinion.scss';
import Images from '../../../../assets/img/Image';
function Opinion() {
    const OpinionList = [
        {
            content: Images.Opinion.content1,
            text: (
                <span>
                    Tiết kiệm thời gian học bằng cách học <span className='highlight'> ĐÚNG </span>, xây dựng nền tảng ngữ pháp,
                    từ vựng có tính <span className='highlight'>ỨNG DỤNG CAO.</span>
                </span>
            ),
        },
        {
            content: Images.Opinion.content2,
            text: (
                <span>
                    Nắm được hình thức thi, format bài thi,<span className='highlight'> CHIẾN THUẬT</span> ẳm điểm cao trong các phần thi,
                    nâng cấp vốn từ.
                </span>
            ),
        },
        {
            content: Images.Opinion.content3,
            text: (
                <span>
                    Bộ câu hỏi <span className='highlight'> RIÊNG </span> giúp bạn dễ dàng duy trì - ôn luyện - bổ sung -
                    và cả mở mang ra những ngôn ngữ mới.
                </span>
            ),
        },
        {
            content: Images.Opinion.content4,
            text: (
                <span>
                    <span className='highlight'> CHẮT LỌC </span>kiến thức - xây dựng kho đề khi phong phú
                    truyền động lực  <span className='highlight'> HỌC </span> tiếng anh mỗi ngày
                </span>
            ),
        },
    ];
    return (
        <div className='opinion'>
            <Bounce bottom>
                <img className='logo' src={Images.Opinion.logo} alt='' />
            </Bounce>
            <Flip bottom>
                <h1 className='title' >QUAN ĐIỂM ĐỔI VỀ MỚI VỀ HỌC NGÔN NGỮ</h1>
            </Flip>
            <Fade bottom cascade>
                <span className='detail'> Xây dựng nền tảng - phát triển kĩ năng </span>
            </Fade>
            <div className='opinion-wrap'>
                {OpinionList.map((data, index) => (
                    <div key={`opinion_${index}`} className='opinion-item'>
                        <Flip bottom>
                            <img alt='' src={data.content} />
                        </Flip>
                        <Fade bottom cascade>
                            <div className='info'> {data.text} </div>
                        </Fade>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Opinion;






