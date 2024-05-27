import React from "react";
import QuestionCard from "./QuestionCard";
import { useNavigate, useLocation } from "react-router-dom";

function PostQuestion() {
    const navigate = useNavigate();
    const location = useLocation();
    const { name } = location.state || {};
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
            options: ["Selfless", "Leadership", "Extrovert", "All the above"],
        },
        {
            question: "Guess his birthday...?",
            options: [
                "18th Oct",
                "25th Oct",
                "28th September",
                "None of the Above",
            ],
        },
        {
            question: "Who is his most favourite personality...?",
            options: ["Vijay", "MS Dhoni", "Anirudh", "All the above"],
        },
        {
            question: "For what he's always afraid of...?",
            options: [
                "Exam Results",
                "Placements",
                "All the above",
                "None of the above",
            ],
        },
        {
            question:
                "If not Engineering, what could be his future profession...?",
            options: ["Teacher", "RJ", "Film Maker", "None of the above"],
        },
        {
            question: "Rate his skills...!",
            options: ["10", "8", "6", "4"],
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
            "All the above",
            "None of the Above",
            "MS Dhoni",
            "None of the above",
            "RJ",
            "8",
        ];

        function calculateScore() {
            for (var i = 0; i < correctAnswers.length; i++) {
                if (correctAnswers[i] === answerArray[i]) {
                    score++;
                }
            }
            score = (score / correctAnswers.length) * 100;
        }
        calculateScore();
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
                const errorText = await response.text(); // Capture the response text for detailed error info
                throw new Error("Network response was not ok: " + errorText);
            }
            const data = await response.json();
            alert("Now lets see the results...😉");
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
