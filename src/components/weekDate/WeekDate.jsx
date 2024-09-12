import "./weekDate.scss";
import PropTypes from "prop-types";

const WeekDate = ({ formattedWeek, onPreviousWeek, onNextWeek }) => {
  return (
    <div className="dateWrapper">
      <button className="arrowBtn" onClick={onPreviousWeek}>
        <img
          className="arrowImg"
          src="../../../public/assets/icons/left-chevron_9144318.png"
          alt="Arrow got to left"
        ></img>
      </button>
      <p className="formatWeek">{formattedWeek}</p>
      <button className="arrowBtn" onClick={onNextWeek}>
        <img
          className="arrowImg"
          src="../../../public/assets/icons/right-chevron_9144319.png"
          alt="Arrow got to right"
        ></img>
      </button>
    </div>
  );
};

WeekDate.propTypes = {
  formattedWeek: PropTypes.string,
  onPreviousWeek: PropTypes.func.isRequired,
  onNextWeek: PropTypes.func.isRequired,
};

export default WeekDate;
