import { useState, useEffect } from "react";
import "./productsContainer.scss";
import Field from "../labels/Field";
import RoundedButton from "../buttons/RoundedButton";
import { API_PRODUCTS } from "../../config/url";
import UseApiGetProd from "../../service/UseApiGetProd";
import UseApiPostProd from "../../service/UseApiPostProd";
import ProductItem from "../items/ProductItem";
import UseApiDeleteProd from "../../service/UseApiDeleteProd";
import UseApiPutProd from "../../service/UseApiPutProd";

const ProductsContainer = () => {
  const [productName, setProductName] = useState("");
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]); // Estado local para almacenar los productos

  // Usar el hook UseApiGetProd para manejar el GET
  const {
    data,
    loading: loadingProducts,
    error: errorProducts,
  } = UseApiGetProd(API_PRODUCTS);

  // Usar el hook UseApiPostProd para manejar el POST
  const {
    postData,
    loading: loadingPost,
    error: errorPost,
  } = UseApiPostProd(API_PRODUCTS);

  const { editData } = UseApiPutProd(API_PRODUCTS);
  const { deleteData } = UseApiDeleteProd(API_PRODUCTS);

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

  const handleEditProduct = async (id, newProductName) => {
    const updatedProduct = await editData(id, { product: newProductName });
    if (updatedProduct) {
      setProducts(
        products.map((product) =>
          product.id === id ? updatedProduct : product
        )
      );
    } else {
      console.error("Error al editar el producto");
    }
  };

  const handleDeleteProduct = async (id) => {
    const success = await deleteData(id);
    if (success) {
      setProducts(products.filter((product) => product.id !== id));
    } else {
      console.error("Error al eliminar el producto");
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
          products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onEdit={handleEditProduct}
              onDelete={(id) => handleDeleteProduct(id)}
            />
          ))
        ) : (
          <p>No hay productos disponibles</p>
        )}
      </ul>
    </div>
  );
};

export default ProductsContainer;
