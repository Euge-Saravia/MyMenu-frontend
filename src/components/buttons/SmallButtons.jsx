import PropTypes from "prop-types";
import "./smallButtons.scss";

const SmallButtons = ({ title, onClick }) => {
  return (
    <div>
      <button className="smallButtons" onClick={onClick}>
        {title}
      </button>
    </div>
  );
};

SmallButtons.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
export default SmallButtons;
