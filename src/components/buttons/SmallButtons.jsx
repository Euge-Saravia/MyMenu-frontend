import PropTypes from "prop-types";
import "./smallButtons.scss";

const SmallButtons = ({title}) => {
  return (
       <div>
      <button className="smallButtons">{title}</button>
    </div>
  )
}

SmallButtons.propTypes ={
    title: PropTypes.string,
};
export default SmallButtons