function QuestionCard(props) {
    return (
        <div className="question-card">
            <div className="question">
                <label>{props.question}</label>
            </div>
            <div className="options">
                {props.options.map((option, index) => (
                    <div key={index} className="option">
                        <input
                            type="radio"
                            id={`${props.indexId}-${index}`}
                            name={props.indexId}
                            value={option}
                        />
                        <label htmlFor={`${props.indexId}-${index}`}>
                            {option}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QuestionCard;
