import "./chooseDay.scss";
import PropTypes from "prop-types";

const ChooseDay = ({ day, breakfast, lunch, dinner, onMealClick }) => {
  return (
    <div className="containerChooseDay">
      <h5 className="dayOfWeek">{day}</h5>
      <div className="typeContainer" onClick={() => onMealClick({id: 1, name:"Breakfast"}, day)}>
        <h5 className="typeTitle">Breakfast</h5>{" "}
        {breakfast.length > 0 ? (
          breakfast.map((menu, index) => (
            <p key={index}>{menu.plate.description}</p>
          ))
        ) : (
          <p>No meal planned</p>
        )}
      </div>
      <div className="typeContainer" onClick={() => onMealClick({id: 2, name:"Lunch"}, day)}>
        <h5 className="typeTitle">Lunch</h5>{" "}
        {lunch.length > 0 ? (
          lunch.map((menu, index) => (
            <p key={index}>{menu.plate.description}</p>
          ))
        ) : (
          <p>No meal planned</p>
        )}
      </div>
      <div className="typeContainer" onClick={() => onMealClick({id: 3, name:"Dinner"}, day)}>
        <h5 className="typeTitle">Dinner</h5>{" "}
        {dinner.length > 0 ? (
          dinner.map((menu, index) => (
            <p key={index}>{menu.plate.description}</p>
          ))
        ) : (
          <p>No meal planned</p>
        )}
      </div>
    </div>
  );
};

ChooseDay.propTypes = {
  day: PropTypes.string.isRequired,
  breakfast: PropTypes.object,
  lunch: PropTypes.object,
  dinner: PropTypes.object,
  onMealClick: PropTypes.func.isRequired
};

export default ChooseDay;
