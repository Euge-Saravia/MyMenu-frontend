import { useState, useEffect } from "react";
import "./productsContainer.scss";
import Field from "../labels/Field";
import RoundedButton from "../buttons/RoundedButton";
import { API_DELETEALL_PRODUCTS, API_PRODUCTS } from "../../config/url";
import UseApiPostProd from "../../service/UseApiPostProd";
import ProductItem from "../items/ProductItem";
import LargeButtons from "../buttons/LargeButtons";
import UseApiDeleteAllProd from "../../service/UseApiDeleteAllProd";
import UseApiPut from "../../service/UseApiPut";
import UseApiGet from "../../service/UseApiGet";
import UseApiDelete from "../../service/UseApiDelete";

const ProductsContainer = () => {
  const [productName, setProductName] = useState("");
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]); // Estado local para almacenar los productos

  // Usar el hook UseApiGetProd para manejar el GET
  const {
    data,
    loading: loadingProducts,
    error: errorProducts,
  } = UseApiGet(API_PRODUCTS);

  // Usar el hook UseApiPostProd para manejar el POST
  const {
    postData,
    loading: loadingPost,
    error: errorPost,
  } = UseApiPostProd(API_PRODUCTS);

  const { editData } = UseApiPut(API_PRODUCTS);
  const { deleteData } = UseApiDelete(API_PRODUCTS);
  const { deleteAllData } = UseApiDeleteAllProd(API_DELETEALL_PRODUCTS);

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

  const handleDeleteAllProducts = async () => {
    const success = await deleteAllData();
    if (success) {
      setProducts([]); // Limpia el estado si la eliminación fue exitosa
    } else {
      console.error("Error al eliminar todos los productos");
    }
  };

  return (
    <div className="wrapperProductsContainer">
      <div className="inputAndButtonContainer">
        <Field
          name="product"
          placeholder="Add a product"
          value={productName}
          type="text"
          error={error}
          onChange={handleInputChange}
        />
        <RoundedButton onClick={handleAddProduct} />
      </div>

      {/* Mostrar mensajes de carga o error */}
      {loadingProducts && <p>Loading products...</p>}
      {errorProducts && <p>Error fetching products: {errorProducts}</p>}
      {loadingPost && <p>Adding product...</p>}
      {errorPost && <p>Error adding product: {errorPost}</p>}

      {/* Mostrar los productos si existen */}

      <ul className="ulContainer">
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
          <p className="notProducts">There are no products, add one</p>
        )}
      </ul>

      <div className="deleteAllButton">
        {products && products.length > 0 ? (
          <LargeButtons title="Delete All" onClick={handleDeleteAllProducts} />
        ) : null}
      </div>
    </div>
  );
};

export default ProductsContainer;
