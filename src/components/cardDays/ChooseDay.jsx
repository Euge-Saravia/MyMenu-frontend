import "./chooseDay.scss";
import PropTypes from "prop-types";

const ChooseDay = ({ day }) => {
  return (
    <div className="containerChooseDay">
      <h5 className="dayOfWeek">{day}</h5>
    </div>
  );
};

ChooseDay.propTypes = {
  day: PropTypes.string,
};

export default ChooseDay;
