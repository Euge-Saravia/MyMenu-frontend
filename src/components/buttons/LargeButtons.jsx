import PropTypes from "prop-types";
import "./largeButton.scss";

const LargeButtons = ({title, onClick}) => {
  return (
       <div>
      <button className="largeButtons" onClick={onClick}>{title}</button>
    </div>
  )
}

LargeButtons.propTypes ={
    title: PropTypes.string,
    onClick: PropTypes.func.isRequired
};
export default LargeButtons
