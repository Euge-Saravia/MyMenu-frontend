import "./title.scss";
import PropTypes from "prop-types";

const Title = ({title}) => {
  return (
    <div>
      <h2 className="pageTitle">{title}</h2>
    </div>
  )
}

Title.propTypes ={
    title: PropTypes.string,
};

export default Title
