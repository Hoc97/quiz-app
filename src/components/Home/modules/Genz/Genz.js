import Slider from 'react-slick';
import './Genz.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Fade from 'react-reveal/Fade';
import Slide from 'react-reveal/Slide';
import { useRef } from 'react';
import { GrNext, GrPrevious } from "react-icons/gr";
import Images from '../../../../assets/img/Image';
export default function GenZ() {
    const sliderRef = useRef();
    const genzList = [
        {
            content: Images.Genz.content2
        },
        {
            content: Images.Genz.content2
        },
        {
            content: Images.Genz.content3
        },
        {
            content: Images.Genz.content4
        },
        {
            content: Images.Genz.content4
        },
    ];
    return (
        <div className='genz'>
            <Fade bottom>
                <div className='title'>
                    <span>
                        <span className='line-through'> Liên tục cập nhật</span> ngân hàng câu hỏi{' '}
                        <span className='line-through'> bám sát cấu trúc</span>, chương trình{' '}
                        <span className='line-through'>học tập. </span>
                    </span>
                </div>
            </Fade>
            <div className='content'>
                <Slide right >
                    <div className='prev' onClick={() => sliderRef.current.slickPrev()}><span><GrPrevious /></span></div>
                    <div className='phone-list'>
                        <Slider
                            ref={sliderRef}
                            dots={true}
                            infinite
                            speed={1000}
                            // autoplay={true}
                            // autoplaySpeed={4000}
                            slidesToShow={1}
                            slidesToScroll={1}
                            arrows={false}
                        >
                            {genzList.map((item, index) => (
                                <div className='phone' key={`genz_${index}`}>
                                    <img src={item.content} alt='' />
                                </div>
                            ))}
                        </Slider>
                    </div>
                    <div className='next' onClick={() => sliderRef.current.slickNext()}><span><GrNext /></span></div>
                </Slide>
            </div>

        </div>
    );
}
