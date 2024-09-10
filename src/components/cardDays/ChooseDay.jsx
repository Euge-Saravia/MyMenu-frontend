import "./chooseDay.scss";
import PropTypes from "prop-types";

const ChooseDay = ({ day, breakfast, lunch, dinner, onMealClick }) => {
  return (
    <div className="containerChooseDay">
      <h5 className="dayOfWeek">{day}</h5>
      <div className="typeContainer" onClick={() => onMealClick({id: 1, name:"Breakfast"}, day)}>
        <h5 className="typeTitle">Breakfast</h5>{" "}
        {breakfast?.plate.description || "No meal planned"}
      </div>
      <div className="typeContainer" onClick={() => onMealClick({id: 2, name:"Lunch"}, day)}>
        <h5 className="typeTitle">Lunch</h5>{" "}
        {lunch?.plate.description || "No meal planned"}
      </div>
      <div className="typeContainer" onClick={() => onMealClick({id: 3, name:"Dinner"}, day)}>
        <h5 className="typeTitle">Dinner</h5>{" "}
        {dinner?.plate.description || "No meal planned"}
      </div>
    </div>
  );
};

ChooseDay.propTypes = {
  day: PropTypes.string.isRequired,
  breakfast: PropTypes.object,
  lunch: PropTypes.object,
  dinner: PropTypes.object,
  onMealClick: PropTypes.func
};

export default ChooseDay;
