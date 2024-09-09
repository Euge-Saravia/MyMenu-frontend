import { useEffect, useState } from "react";
import { API_PLATES } from "../../config/url";
import UseApiGetProd from "../../service/UseApiGetProd";
import "./choosePlate.scss";
import PlateItem from "../items/PlateItem";
import UseApiPutProd from "../../service/UseApiPutProd";

const ChooseMeal = () => {
  const [plates, setPlates] = useState([]);

  const {
    data,
    loading: loadingProducts,
    error: errorProducts,
  } = UseApiGetProd(API_PLATES);

  // Usar el hook personalizado para PUT
  const {
    editData,
    loading: loadingEdit,
    error: errorEdit,
  } = UseApiPutProd(API_PLATES);

  useEffect(() => {
    if (data) {
      setPlates(data);
    }
  }, [data]);

  // Marcar la función como async
  const handleEditPlate = async (id, newDescription) => {
    const updatedPlate = { description: newDescription };

    try {
      // Llamada a la función editData desde el hook
      const updatedData = await editData(id, updatedPlate);

      if (updatedData) {
        // Actualizar visualmente el estado de los platos si la respuesta fue exitosa
        setPlates((prevPlates) =>
          prevPlates.map((plate) =>
            plate.id === updatedData.id ? updatedData : plate
          )
        );
      }
    } catch (error) {
      console.error("Error updating plate:", error);
    }
  };

  return (
    <div className="choosePlate">
      <h3 className="titleChoosePlate">Choose a plate</h3>
      {/* Mostrar mensajes de carga o error */}
      {loadingProducts && <p>Loading products...</p>}
      {errorProducts && <p>Error fetching products: {errorProducts}</p>}
      {loadingEdit && <p>Saving plate...</p>}
      {errorEdit && <p>Error updating plate: {errorEdit}</p>}

      <ul>
        {plates && plates.length > 0 ? (
          plates.map((plate) => (
            <PlateItem key={plate.id} plate={plate} onEdit={handleEditPlate} />
          ))
        ) : (
          <p className="notProducts">There are no products, add one</p>
        )}
      </ul>
    </div>
  );
};

export default ChooseMeal;
