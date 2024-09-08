import PropTypes from "prop-types";
import SmallButtons from "../buttons/SmallButtons";
import { useState } from "react";

const PlateItem = ({ plate, onEdit }) => {
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
      <li>
        {editMode ? (
          <input value={plateName} onChange={handleInputChange}></input>
        ) : (
          plate.description
        )}
        {editMode ? (
          <SmallButtons title="Save" onClick={handleSave} />
        ) : (
          <SmallButtons title="Edit" onClick={handleEditClick} />
        )}
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
};

export default PlateItem;
