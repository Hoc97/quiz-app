import Flip from 'react-reveal/Flip';
import Bounce from 'react-reveal/Bounce';
import Fade from 'react-reveal/Fade';
import './Opinion.scss';
import { Opinions } from '../../../../assets/img/Image';
function Opinion() {
    const OpinionList = [
        {
            content: Opinions.content1,
            text: (
                <span>
                    Ngân hàng đề thi được cập nhật <span className='highlight'>LIÊN TỤC </span> với bộ câu hỏi đa dạng
                    giúp bạn làm quen với đề thi thật, sẵn sàng 100% cho kỳ thi của bạn.
                </span>
            ),
        },
        {
            content: Opinions.content2,
            text: (
                <span>
                    Nắm được hình thức thi, format bài thi,<span className='highlight'> CHIẾN THUẬT</span> ẳm điểm cao trong các phần thi,
                    củng cố kiến thức, nâng cấp vốn từ.
                </span>
            ),
        },
        {
            content: Opinions.content3,
            text: (
                <span>
                    Bộ câu hỏi <span className='highlight'> RIÊNG </span> giúp bạn dễ dàng duy trì - ôn luyện - bổ sung -
                    và cả mở mang ra những ngôn ngữ mới.
                </span>
            ),
        },
        {
            content: Opinions.content4,
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
                <img className='logo' src={Opinions.logo} alt='' />
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






