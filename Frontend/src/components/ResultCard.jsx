import PropTypes from "prop-types";

function ResultCard(props) {
    return (
        <div className="result-card">
            <h3>{props.index}. {props.name}</h3>
            <h4>{props.score}%</h4>
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
