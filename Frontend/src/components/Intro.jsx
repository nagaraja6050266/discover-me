import { useNavigate } from "react-router-dom";
import Image from "../assets/image.jpg";
function Intro() {
    const navigate = useNavigate();
    function handleStartGame() {
        let name = document.getElementById("user-name").value;
        if (name.trim()) {
            navigate("/questions", { state: {name} });
        }
        else{
            document.getElementById('user-name').focus();
            document.getElementById('user-name').value='Remains Unknown';
        }
    }

    return (
        <div className="info-container">
            <h3>Lets know how much you know about Nagaraja</h3>
            <img src={Image} alt="inrimage" />
            <div className="info-questions-container">
                <label htmlFor="name">Enter your Name</label>
                <input type="text" name="name" id="user-name" />
                <button onClick={handleStartGame}>Start Game😉</button>
            </div>
        </div>
    );
}

export default Intro;
