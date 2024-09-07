import { useState, useEffect } from "react";
import "./productsContainer.scss";
import Field from "../labels/Field";
import RoundedButton from "../buttons/RoundedButton";
import { API_GET_PRODUCTS, API_POST_PRODUCTS } from "../../config/url";
import UseApiGetProd from "../../service/UseApiGetProd"; // Importa el hook para GET
import UseApiPostProd from "../../service/UseApiPostProd"; // Importa el hook para POST

const ProductsContainer = () => {
  const [productName, setProductName] = useState("");
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]); // Estado local para almacenar los productos

  // Usar el hook UseApiGetProd para manejar el GET
  const { data, loading: loadingProducts, error: errorProducts } = UseApiGetProd(API_GET_PRODUCTS);

  // Usar el hook UseApiPostProd para manejar el POST
  const { postData, loading: loadingPost, error: errorPost } = UseApiPostProd(API_POST_PRODUCTS);

  // Actualizar los productos cuando se obtienen de la API
  useEffect(() => {
    if (data) {
      setProducts(data); // Almacenar los productos en el estado
    }
  }, [data]);

  const handleInputChange = (e) => {
    setProductName(e.target.value);
  };

  const handleAddProduct = async () => {
    if (!productName) {
      setError("El nombre del producto no puede estar vacío");
      return;
    }
    setError("");

    const newProduct = await postData({ product: productName });

    if (newProduct) {
      // Si la respuesta es exitosa, agregar el nuevo producto al estado
      setProducts([...products, newProduct]);
      setProductName(""); // Limpiar el campo de input
    }
  };

  return (
    <div>
      <Field
        name="product"
        placeholder="Add a product"
        value={productName}
        type="text"
        error={error}
        onChange={handleInputChange}
      />
      <RoundedButton onClick={handleAddProduct} />

      {/* Mostrar mensajes de carga o error */}
      {loadingProducts && <p>Loading products...</p>}
      {errorProducts && <p>Error fetching products: {errorProducts}</p>}
      {loadingPost && <p>Adding product...</p>}
      {errorPost && <p>Error adding product: {errorPost}</p>}

      {/* Mostrar los productos si existen */}
      <ul>
        {products && products.length > 0 ? (
          products.map((product) => <li key={product.id}>{product.product}</li>)
        ) : (
          <p>No hay productos disponibles</p>
        )}
      </ul>
    </div>
  );
};

export default ProductsContainer;
