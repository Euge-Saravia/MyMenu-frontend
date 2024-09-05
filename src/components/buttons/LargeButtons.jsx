import PropTypes from "prop-types";
import "./largeButton.scss";

const LargeButtons = ({title}) => {
  return (
       <div>
      <button className="largeButtons">{title}</button>
    </div>
  )
}

LargeButtons.propTypes ={
    title: PropTypes.string,
};
export default LargeButtons
