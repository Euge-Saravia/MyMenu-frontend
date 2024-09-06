import { useEffect, useState } from "react";
import "./productsContainer.scss";
import Field from "../labels/Field";
import RoundedButton from "../buttons/RoundedButton";
import { API_GET_PRODUCTS } from "../../config/url";

const ProductsContainer = () => {
  const [productName, setProductName] = useState("");
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]); // Estado para almacenar los productos

  // useEffect para hacer la solicitud GET al cargar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_GET_PRODUCTS);
        if (response.ok) {
          const data = await response.json();
          setProducts(data); // Almacenar los productos en el estado
        } else {
          console.error("Error al obtener los productos");
        }
      } catch (error) {
        console.error("Error en la solicitud GET:", error);
      }
    };

    fetchProducts();
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez cuando se monte el componente

  const handleInputChange = (e) => {
    setProductName(e.target.value);
  };

  const handleAddProduct = async () => {
    if (!productName) {
      setError("El nombre del producto no puede estar vacío");
      return;
    }
    setError("");

    try {
      const response = await fetch("http://localhost:3001/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product: productName }),
      });

      if (response.ok) {
        const newProduct = await response.json();
        setProducts([...products, newProduct]); // Agregar el nuevo producto al estado
        setProductName(""); // Limpiar el campo de input
      } else {
        console.error("Error al agregar el producto");
      }
    } catch (error) {
      console.error("Error en la solicitud POST:", error);
    }
  };

  return (
    <div>
      <Field
        name="product"
        placeholder="Ingrese el nombre del producto"
        value={productName}
        type="text"
        error={error}
        onChange={handleInputChange}
      />
      <RoundedButton onClick={handleAddProduct} />

      {/* Mostrar los productos si existen */}
      <ul>
        {products.length > 0 ? (
          products.map((product) => <li key={product.id}>{product.product}</li>)
        ) : (
          <p>No hay productos disponibles</p>
        )}
      </ul>
    </div>
  );
};

export default ProductsContainer;
