import "./chooseDay.scss";
import PropTypes from "prop-types";
import MealType from "../mealtype/MealType";

const ChooseDay = ({ day }) => {
  return (
    <div className="containerChooseDay">
      <h5 className="dayOfWeek">{day}</h5>
      <MealType type="Breakfast" />
      <MealType type="Lunch" />
      <MealType type="Dinner" />
    </div>
  );
};

ChooseDay.propTypes = {
  day: PropTypes.string,
};

export default ChooseDay;
