import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostQuestion from './PostQuestion.jsx';
import Result from './Result.jsx';
import Intro from './Intro.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Intro />} />
                <Route path="/questions" element={<PostQuestion />} />
                <Route path="/result" element={<Result />} />
            </Routes>
        </Router>
    );
}
export default App
