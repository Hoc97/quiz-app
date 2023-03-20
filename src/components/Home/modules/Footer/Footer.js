import Images from '../../../../assets/img/Image';
import Fade from 'react-reveal/Fade';
import './Footer.scss';
import { BsFacebook, BsLinkedin, } from "react-icons/bs";
import { SiGmail } from "react-icons/si";

export default function Footer() {
    const InfoList = [
        {
            img: <SiGmail />,
            value: 'thaihocc.01@gmail.com',
        },
        {
            img: <BsLinkedin />,
            value: 'linkedin.com/in/cao-thai-hoc-56049523b/',
        },
        {
            img: <BsFacebook />,
            value: 'facebook.com/thaihoc.cao.9/',
        },
    ];

    return (
        <div className='footer' id='contact'>
            <Fade bottom>
                <div className='logo'>
                    <img alt='' src={Images.Headers.logo} />
                </div>
            </Fade>
            <div className='content-wrap'>
                <div className='contact'>Contact with us</div>
                <div className='info-ls'>
                    {InfoList.map((info, index) => (
                        <Fade bottom key={`info_${index}`}>
                            <div className='info'>
                                <span className='icon'>{info.img}</span><span> {info.value} </span>
                            </div>
                        </Fade>
                    ))}
                </div>
            </div>
        </div>
    );
}
