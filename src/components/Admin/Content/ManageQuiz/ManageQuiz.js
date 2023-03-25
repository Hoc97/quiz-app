import './ManageQuiz.scss';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UpdateQAQuiz from './Quiz/UpdateQAQuiz';
import AssignQuiz from './Quiz/AssignQuiz';
import EditQuiz from './Quiz/EditQuiz';
import { useState } from 'react';

function ManageQuiz() {
    const [key, setKey] = useState('home');

    return (
        <div className='quiz-container'>
            <Tabs
                activeKey={key}
                onSelect={(k) => { setKey(k); }}
                className="mb-3"
            >
                <Tab eventKey="home" title="Quizzes Management">
                    {key === 'home' && <EditQuiz />}
                </Tab>
                <Tab eventKey="profile" title="Update Q/A Quizzes">
                    {key === 'profile' && < UpdateQAQuiz />}
                </Tab>
                <Tab eventKey="contact" title="Assign to Users" >
                    {key === 'contact' && < AssignQuiz />}
                </Tab>
            </Tabs>
        </div>
    );
}

export default ManageQuiz;
