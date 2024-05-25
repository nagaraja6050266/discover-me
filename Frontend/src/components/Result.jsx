import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ResultCard from "./ResultCard";

function Result() {
    const location = useLocation();
    const { name, sendScore } = location.state || {};
    const [results, setResults] = useState([]); //can share all using navigate
    const [resultText, setResultText] = useState("Your guess matcher with me");
    const [score,setScore] = useState(0);

    useEffect(() => {
        const getResults = async () => {
            try {
                const data = await fetch("https://discover-me-api.vercel.app/result", {
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin":"*"
                    },
                });
                setResults(await data.json());
            } catch (error) {
                console.log("Error while fetching");
            }
        };
        getResults();
    }, []);

    useEffect(() => {
        function findCurrentAnswers() {
            setScore(sendScore);
            if (score >= 90) {
                setResultText(
                    "Wow... You've got an impressive understanding of who I am🤩"
                );
            } else if (score >= 60) {
                setResultText(
                    "Good try... You have a solid grasp of who I am🤗"
                );
            } else if (score >= 30) {
                setResultText(
                    "Good effort... But there's a lot more to discover😊"
                );
            } else {
                setResultText(
                    "Oh.. It's ok. Give another try! Every attempt helps you get closer to me"
                );
            }
        }
        findCurrentAnswers();
    }, [results, name]);

    return (
        <div className="result-body">
            <div className="own-result-container">
                <h1>{resultText}</h1>
                <div className="score">
                    <h2>{score}%</h2>
                </div>
            </div>
            <h1 className="all-participants">All Participants:</h1>
            <div className="all-results-container">
                {results.map((r, i) => (
                    <ResultCard key={i} name={r.name} score={r.score} />
                ))}
            </div>
        </div>
    );
}

export default Result;
