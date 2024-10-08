import PropTypes from "prop-types";
import SmallButtons from "../buttons/SmallButtons";
import { useState } from "react";
import RoundedButton from "../buttons/RoundedButton";
import "./plateItem.scss";

const PlateItem = ({ plate, onEdit, onRoundButtonClick }) => {
  const [editMode, setEditMode] = useState(false);
  const [plateName, setPlateName] = useState(plate.description);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    setPlateName(e.target.value);
  };

  const handleSave = () => {
    setEditMode(false);
    onEdit(plate.id, plateName);
  };
  return (
    <>
      <li className="plateItem">
        {editMode ? (
          <input value={plateName} onChange={handleInputChange}></input>
        ) : (
          <span className="plateText">{plate.description}</span>
        )}
        <div className="buttonGroup">
          <RoundedButton onClick={onRoundButtonClick} />
          {editMode ? (
            <SmallButtons title="Save" onClick={handleSave} />
          ) : (
            <SmallButtons title="Edit" onClick={handleEditClick} />
          )}
        </div>
      </li>
    </>
  );
};

PlateItem.propTypes = {
  plate: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onRoundButtonClick: PropTypes.func.isRequired,
};

export default PlateItem;
