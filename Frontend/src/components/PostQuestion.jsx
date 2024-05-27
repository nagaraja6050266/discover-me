import React from "react";
import QuestionCard from "./QuestionCard";
import { useNavigate, useLocation } from "react-router-dom";

function PostQuestion() {
    const navigate = useNavigate();
    const location = useLocation();
    const { name } = location.state || {};
    console.log("Name is", name);
    const set = [
        {
            question: "His Favourite Person...?",
            options: ["Siva", "Mani", "Bala", "None of the Above"],
        },
        {
            question: "Which role suits him the most...?",
            options: [
                "Class Representative",
                "Placement Coordinator",
                "Event Co ordinator",
                "All the above",
            ],
        },
        {
            question: "What could be his aim at his childhood...?",
            options: ["IPS", "Teacher", "Engineer", "None of the Above"],
        },
        {
            question: "His favourite place...?",
            options: [
                "Home",
                "Classroom",
                "Theatre",
                "Classroom without the staffs",
            ],
        },
        {
            question: "What could be his best personality trait...?",
            options: ["Brilliance"],
        },
    ];

    async function handleSubmit(event) {
        event.preventDefault();
        let answerArray = [];
        for (var i = 0; i < set.length; i++) {
            let elementName = "answer" + i;
            const selectedOption = document.querySelector(
                `input[name="${elementName}"]:checked`
            );
            if (selectedOption) {
                answerArray.push(selectedOption.value);
            } else {
                let parentDiv = document.querySelector(
                    `input[name="${elementName}"]`
                ).parentElement.parentElement.parentElement;
                parentDiv.scrollIntoView({ behavior: "smooth" });
                parentDiv.classList.add("shake");
                setTimeout(() => {
                    parentDiv.classList.remove("shake");
                }, 800);
                return;
            }
        }
        let score = 0.0;

        let correctAnswers = [
            "None of the Above",
            "All the above",
            "IPS",
            "Theatre",
            "Brilliacne",
        ];

        function calculateScore() {
            for (var i = 0; i < correctAnswers.length; i++) {
                console.log("Current Answer: ", answerArray[i]);
                console.log("Correct Answer: ", correctAnswers[i]);
                if (correctAnswers[i] === answerArray[i]) {
                    score++;
                    console.log("Matched");
                }
            }
            console.log("Score ", score);
            score = (score / correctAnswers.length) * 100;
        }

        calculateScore();
        console.log(JSON.stringify({ name, answerArray, score }));
        try {
            const response = await fetch(
                "https://discover-me-api.vercel.app/store-info",
                {
                    method: "POST",
                    body: JSON.stringify({ name, answerArray, score }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!response.ok) {
                throw new Error(
                    "Network response was not ok " + response.statusText
                );
            }
            const data = await response.json();
            console.log("Response stored successfully: ", data);
            alert("Data stored");
            navigate("/result", { state: { name, sendScore: score } });
        } catch (error) {
            console.log("Error while posting data: ", error);
        }
    }

    return (
        <div className="question-body">
            <h1>Questions</h1>
            <div className="question-cards">
                {set.map((s, i) => (
                    <QuestionCard
                        key={i}
                        indexId={"answer" + i}
                        question={s.question}
                        options={s.options}
                    />
                ))}
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}

export default PostQuestion;
