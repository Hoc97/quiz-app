import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import User from './components/User/User';
import Admin from './components/Admin/Admin';

function App() {
    return (
        <div className="App-container">
            <BrowserRouter>
                <Routes>
                    {/* Phân bố route con tại vị trí này , phần động*/}
                    <Route path="/" element={<Home />} />
                    <Route path="/user" element={<User />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
