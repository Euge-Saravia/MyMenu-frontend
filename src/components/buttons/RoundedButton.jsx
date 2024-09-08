import "./roundedButton.scss";
import PropTypes from "prop-types";

const RoundedButton = ({onClick}) => {
  return (
  
      <button className="roundedButton" onClick={onClick}>+</button>
  
  )
}

RoundedButton.propTypes = {
  onClick: PropTypes.func, 
};

export default RoundedButton
