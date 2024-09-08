import "./chooseDay.scss";
import PropTypes from "prop-types";
// import MealType from "../mealtype/MealType";
// import { Link } from "react-router-dom";

const ChooseDay = ({ day, breakfast, lunch, dinner }) => {
  return (
    <div className="containerChooseDay">
      <h5 className="dayOfWeek">{day}</h5>
      <div className="meal">
        <strong>Breakfast:</strong> {breakfast?.plate.name || "No meal planned"}
      </div>
      <div className="meal">
        <strong>Lunch:</strong> {lunch?.plate.name || "No meal planned"}
      </div>
      <div className="meal">
        <strong>Dinner:</strong> {dinner?.plate.name || "No meal planned"}
      </div>
      {/* <Link to="/addPlate">
        <MealType type="Breakfast" />
      </Link>
      <MealType type="Lunch" />
      <MealType type="Dinner" /> */}
    </div>
  );
};

// ChooseDay.propTypes = {
//   day: PropTypes.string,
// };

ChooseDay.propTypes = {
  day: PropTypes.string.isRequired,
  breakfast: PropTypes.object,
  lunch: PropTypes.object,
  dinner: PropTypes.object,
};

export default ChooseDay;
