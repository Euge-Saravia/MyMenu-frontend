import "./chooseDay.scss";
import PropTypes from "prop-types";
import MealType from "../mealtype/MealType";
import { Link } from "react-router-dom";

const ChooseDay = ({ day }) => {
  return (
    <div className="containerChooseDay">
      <h5 className="dayOfWeek">{day}</h5>
      <Link to="/addPlate">
        <MealType type="Breakfast" />
      </Link>
      <MealType type="Lunch" />
      <MealType type="Dinner" />
    </div>
  );
};

ChooseDay.propTypes = {
  day: PropTypes.string,
};

export default ChooseDay;
