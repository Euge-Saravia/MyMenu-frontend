import "./mealType.scss";
import PropTypes from "prop-types";

const MealType = ({type}) => {
  return (
    <div className="typeContainer">
      <h5 className="typeTitle">{type}</h5>
    </div>
  )
}
MealType.propTypes ={
    type: PropTypes.string,
};

export default MealType
