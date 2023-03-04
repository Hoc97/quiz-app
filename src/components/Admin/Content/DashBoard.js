import './DashBoard.scss';
import { ResponsiveContainer, BarChart, XAxis, Tooltip, Legend, Bar } from 'recharts';
import { getOverview } from '../../../services/apiService';
import { useEffect, useState } from 'react';
function DashBoard() {
    const [dataOverview, setDataOverview] = useState([]);
    const [dataChart, setDataChart] = useState([]);

    useEffect(() => {
        fetchDataOverview();
    }, []);

    const fetchDataOverview = async () => {
        let res = await getOverview();
        console.log(res);
        if (res.EC === 0) {
            let Qz = 0, Qs = 0, As = 0;
            Qz = res?.DT?.others?.countQuiz ?? 0;
            Qs = res?.DT?.others?.countQuestions ?? 0;
            As = res?.DT?.others?.countAnswers ?? 0;
            const data = [
                {
                    "name": "Quizzes",
                    "Qz": Qz,

                },
                {
                    "name": "Questions",
                    "Qs": Qs,

                },
                {
                    "name": "Answers",
                    "As": As,

                },
            ];
            setDataChart(data);
            setDataOverview(res.DT);
        }
    };


    return (
        <div className='dashboard-container'>
            <div className='title'>Analytics Dashboard</div>
            <div className='content'>
                <div className='c-left'>
                    <div className='total'>
                        <span className='text-1' >Total users</span>
                        <span className='text-2' >{dataOverview?.users?.total ? dataOverview.users.total : '0'}</span>
                    </div>
                    <div className='total'>
                        <span className='text-1'>Total quizzes</span>
                        <span className='text-2'>
                            {dataOverview?.others?.countQuiz ? dataOverview.others.countQuiz : '0'}
                        </span>
                    </div>
                    <div className='total'>
                        <span className='text-1'>Total questions</span>
                        <span className='text-2'>
                            {dataOverview?.others?.countQuestions ? dataOverview.others.countQuestions : '0'}
                        </span>
                    </div>
                    <div className='total'>
                        <span className='text-1'>Total answers</span>
                        <span className='text-2'>
                            {dataOverview?.others?.countAnswers ? dataOverview.others.countAnswers : '0'}
                        </span>
                    </div>
                </div>
                <div className='c-right'>
                    {dataChart.length > 0 &&
                        <ResponsiveContainer width={'80%'} height={'95%'}>
                            <BarChart data={dataChart}
                                margin={{ top: 5, right: 50, left: 20, bottom: 5 }}
                            >
                                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                <XAxis dataKey="name" />
                                {/* <YAxis /> */}
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Qz" fill="#8884d8" />
                                <Bar dataKey="Qs" fill="#82ca9d" />
                                <Bar dataKey="As" fill="#ffc658" />
                                {/* <Bar dataKey="occupied" barSize={'50'} fill="#05386b" /> */}
                            </BarChart>
                        </ResponsiveContainer>
                    }

                </div>
            </div>
        </div>
    );
}

export default DashBoard;
