import Fade from 'react-reveal/Fade';
import './Feature.scss';
import { FaFileAlt, FaClipboard, FaClipboardList, FaChartLine, FaUsers, } from "react-icons/fa";
import { MdOutlineAdminPanelSettings, MdNotifications, MdManageHistory, MdAssignment } from 'react-icons/md';
import { TbListCheck } from 'react-icons/tb';
import { BsFillFileEarmarkBarGraphFill } from 'react-icons/bs';
import { GoAlert } from 'react-icons/go';

const FeatureList = [
    {
        img: <MdOutlineAdminPanelSettings />,
        text: 'Đăng nhập an toàn',
    },
    {
        img: <FaClipboard />,
        text: 'Thi mọi lúc mọi nơi',
    },
    {
        img: <FaClipboardList />,
        text: 'Thi online',
    },
    {
        img: <GoAlert />,
        text: 'Cảnh báo gian lận',
    },
    {
        img: <TbListCheck />,
        text: 'Xem lời giải chi tiết',
    },
    {
        img: <MdNotifications />,
        text: 'Xem thông báo',
    },
    {
        img: <MdManageHistory />,
        text: 'Xem tất cả lịch sử bài thi',
    },
    {
        img: <FaChartLine />,
        text: 'Hệ thống quản lý báo cáo mạnh mẽ',
    },
    {
        img: <FaUsers />,
        text: 'Quản lý người dùng',
    },
    {
        img: <MdAssignment />,
        text: 'Quản lý bài thi',
    },
    {
        img: <FaFileAlt />,
        text: 'Quản lý câu hỏi',
    },
    {
        img: <BsFillFileEarmarkBarGraphFill />,
        text: 'Xem kết quả thi người dùng',
    },


];

export default function Feature() {
    return (
        <div className='feature' id='feature'>
            <Fade bottom>
                <span className='title'>Các tính năng <span className='highlight'>tuyệt vời</span> của chúng tôi </span>
            </Fade>
            <div className='content'>
                {FeatureList.map((data, index) => (
                    <div key={`feature_${index}`} className='content-item'>
                        <Fade bottom>
                            <span className='icon'>{data.img}</span>
                            <span> {data.text} </span>
                        </Fade>
                    </div>
                ))}
            </div>
        </div>
    );
}
