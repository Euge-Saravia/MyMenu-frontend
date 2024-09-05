import "./field.scss";
import PropTypes from "prop-types";

const Field = ({ name, placeholder, value, type, error }) => {
  return (
    <div>
      {/* <label htmlFor="Name"></label> */}
      <input
        className="addInput"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
      />
      {error && <p className="invalidInputText">{error}</p>}
    </div>
  );
};

Field.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.error,
};

export default Field;
