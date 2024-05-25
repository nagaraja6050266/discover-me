import PropTypes from "prop-types";

function ResultCard(props) {

    const name=props.name;
    const score=props.score;
    console.log("Props are ", name, score);
    return (
        <div className="result-card">
            <h3>{name}</h3>
            <h4>{score}%</h4>
        </div>
    );
}

ResultCard.propTypes = {
    name: PropTypes.string,
    score: PropTypes.number,
};

ResultCard.defaultProps = {
    name: "Name",
    score: 0,
};

export default ResultCard;
