import { useEffect, useState } from "react";
import { API_GET_MENUS, API_PLATES } from "../../config/url";
import UseApiGetProd from "../../service/UseApiGetProd";
import "./choosePlate.scss";
import PlateItem from "../items/PlateItem";
import UseApiPutProd from "../../service/UseApiPutProd";
import UseApiPostProd from "../../service/UseApiPostProd";
import PropTypes from "prop-types";

const ChooseMeal = ({ selectedDay, mealType, fetchData }) => {
  const [plates, setPlates] = useState([]);

  const {
    data,
    loading: loadingProducts,
    error: errorProducts,
  } = UseApiGetProd(API_PLATES);

  const {
    postData,
  } = UseApiPostProd(API_GET_MENUS); // Hook para la solicitud POST

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

  // Función para crear un nuevo menú al hacer clic en el botón redondo
  const handleCreateMenu = async (plateId) => {
    const newMenu = {
      date: selectedDay, // Usa la fecha seleccionada
      meal: { id: mealType }, // Usa el ID del tipo de comida (1 = breakfast, 2 = lunch, etc.)
      plate: { id: plateId }, // Usa el plato seleccionado
    };

    try {
      const createdMenu = await postData(newMenu); // Enviar los datos al backend
      if (createdMenu) {
        console.log("Menu created successfully:", createdMenu);
        // Aquí volvemos a obtener los menús actualizados para que se refresque en la UI
        fetchData({ date: selectedDay, mealType: mealType });
      }
    } catch (error) {
      console.error("Error creating menu:", error);
    }
  };

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

      <ul className="plateDbContainer">
        {plates && plates.length > 0 ? (
          plates.map((plate) => (
            <PlateItem
              key={plate.id}
              plate={plate}
              onEdit={handleEditPlate}
              onRoundButtonClick={() => handleCreateMenu(plate.id)} // Pasa el plateId al hacer clic en el botón
            />
          ))
        ) : (
          <p className="notProducts">There are no products, add one</p>
        )}
      </ul>
    </div>
  );
};

ChooseMeal.propTypes = {
  selectedDay: PropTypes.string.isRequired, // selectedDay debe ser una cadena (fecha en formato string)
  mealType: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired, // mealType puede ser un número o una cadena (dependerá del valor que recibas)
  fetchData: PropTypes.func.isRequired // fetchData debe ser una función, ya que la estás usando para refrescar los datos
};

export default ChooseMeal;
