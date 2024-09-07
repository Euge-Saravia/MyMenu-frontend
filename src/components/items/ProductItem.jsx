import SmallButtons from "../buttons/SmallButtons";
import PropTypes from "prop-types";
import "./productItems.scss"

const ProductItem = ({ product, onEdit, onDelete }) => {
  return (
    <li>
      {product.product}
      <SmallButtons title="Editar" onClick={() => onEdit(product.id)} />
      <SmallButtons title="Eliminar" onClick={() => onDelete(product.id)} />
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
