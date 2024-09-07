import SmallButtons from "../buttons/SmallButtons";
import PropTypes from "prop-types";
import "./productItems.scss";
import { useState } from "react";

const ProductItem = ({ product, onEdit, onDelete }) => {
  const [editMode, setEditMode] = useState(false);
  const [productName, setProductName] = useState(product.product);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    setProductName(e.target.value)
  };

  const handleSave = () => {
    setEditMode(false);
    onEdit(product.id, productName);
  };

  return (
    <li>
      {editMode ? <input value={productName} onChange={handleInputChange}></input> : product.product}
      {editMode ? <SmallButtons title="Save" onClick={handleSave}/> : <SmallButtons title="Edit" onClick={handleEditClick} />}
      <SmallButtons title="Delete" onClick={() => onDelete(product.id)} />
    </li>
  );
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    product: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ProductItem;
