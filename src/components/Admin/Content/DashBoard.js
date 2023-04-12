import './DashBoard.scss';
import { Pie, Column } from '@ant-design/plots';
import { getOverview } from '../../../services/apiService';
import { useEffect, useState } from 'react';
function DashBoard() {
    const [dataOverview, setDataOverview] = useState([]);

    useEffect(() => {
        fetchDataOverview();
    }, []);

    const fetchDataOverview = async () => {
        let res = await getOverview();
        if (res.EC === 0) {
            const data = [res.DT.users, res.DT.others];
            setDataOverview(data);
        }
    };

    // 1
    const countAdmin = dataOverview[0]?.countAdmin;
    const countUsers = dataOverview[0]?.countUsers;
    const total = dataOverview[0]?.total;
    const data1 = [
        {
            type: `${countAdmin} Admin`,
            value: countAdmin
        },
        {
            type: `${countUsers} User`,
            value: countUsers
        }
    ];

    // 2
    const DemoColumn = () => {
        const data = [
            {
                type: `Part${1}`,
                sales: 3
            },
            {
                type: `Part${2}`,
                sales: 4
            },
            {
                type: `Part${3}`,
                sales: 2
            },
            {
                type: `Part${4}`,
                sales: 2
            },
            {
                type: `Part${5}`,
                sales: 2
            },
            {
                type: `Part${6}`,
                sales: 2
            },
            {
                type: `Part${7}`,
                sales: 4
            },
        ];
        const config = {
            data,
            xField: 'type',
            yField: 'sales',
            label: {
                position: 'middle',
                style: {
                    fill: '#000',
                    opacity: 1,
                },
            },
            xAxis: {
                label: {
                    autoHide: true,
                    autoRotate: false,
                    style: {
                        fill: '#000000de'
                    }
                },
            },

        };
        return <Column {...config} />;
    };

    // 3
    const countQuiz = dataOverview[1]?.countQuiz;

    // 4
    const countQuestions = dataOverview[1]?.countQuestions;

    const DemoPie = ({ data }) => {
        const config = {
            appendPadding: 0,
            data,
            angleField: 'value',
            color: ['#7666f9', '#12bbd0', '#f6c022'],
            colorField: 'type',
            radius: 1,
            innerRadius: 0.7,
            fontSize: 30,
            label: {
                fontColor: 'red',
                color: 'red',
                type: 'inner',
                offset: '-50%',
                content: '',
                style: {
                    textAlign: 'center',
                    fontSize: 20,
                    color: 'red'
                },
            },
            interactions: [
                {
                    type: 'element-selected',
                },
                {
                    type: 'element-active',
                },
            ],
            statistic: {
                title: false,
                content: {
                    style: {
                        color: 'red',
                        whiteSpace: 'pre-wrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontSize: 20,
                    },
                    content: `Total users\n${total}`,
                },
            }
        };
        return <Pie {...config} />;
    };
    return (
        <div className='dashboard-container'>
            <div className='title'>Analytics Dashboard</div>
            <div className='content'>

                <div className='c-left'>
                    <div className='total total1'>
                        <span className='text-1'>Total quizzes</span>
                        <span className='text-2'>
                            {countQuiz ? countQuiz : '0'}
                        </span>
                    </div>
                    <div className='total total2'>
                        <span className='text-1'>Total questions</span>
                        <span className='text-2'>
                            {countQuestions ? countQuestions : '0'}
                        </span>
                    </div>
                </div>
                <div className='c-right'>
                    <div className='total '>
                        <span className='text-1'>Total Quiz Part Toiec </span>
                        <span className='text-2'>
                            {Object.keys(dataOverview).length > 0 && <DemoColumn />}
                        </span>
                    </div>
                    <div className='total'>
                        {Object.keys(dataOverview).length > 0 && <DemoPie data={data1} />}
                    </div>
                </div>
            </div>


        </div>
    );
}

export default DashBoard;
