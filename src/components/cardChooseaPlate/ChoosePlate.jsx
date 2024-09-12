import { useEffect, useState } from "react";
import { API_GET_MENUS, API_PLATES } from "../../config/url";
import "./choosePlate.scss";
import PlateItem from "../items/PlateItem";
import UseApiPostProd from "../../service/UseApiPostProd";
import PropTypes from "prop-types";
import UseApiPut from "../../service/UseApiPut";
import UseApiGet from "../../service/UseApiGet";

const ChoosePlate = ({ selectedDay, mealType, fetchData }) => {
  const [plates, setPlates] = useState([]);

  const {
    data,
    loading: loadingProducts,
    error: errorProducts,
  } = UseApiGet(API_PLATES);

  const { postData } = UseApiPostProd(API_GET_MENUS);

  const {
    editData,
    loading: loadingEdit,
    error: errorEdit,
  } = UseApiPut(API_PLATES);

  useEffect(() => {
    if (data) {
      setPlates(data);
    }
  }, [data]);

  // Función para crear un nuevo menú al hacer clic en el botón redondo
  const handleCreateMenu = async (plateId) => {
    const newMenu = {
      date: selectedDay,
      meal: { id: mealType },
      plate: { id: plateId },
    };

    try {
      const createdMenu = await postData(newMenu);
      if (createdMenu) {
        fetchData({ date: selectedDay, mealType: mealType });
      }
    } catch (error) {
      console.error("Error creating menu:", error);
    }
  };

  const handleEditPlate = async (id, newDescription) => {
    const updatedPlate = { description: newDescription };

    try {
      const updatedData = await editData(id, updatedPlate);

      if (updatedData) {
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
              onRoundButtonClick={() => handleCreateMenu(plate.id)} 
            />
          ))
        ) : (
          <p className="notProducts">There are no products, add one</p>
        )}
      </ul>
    </div>
  );
};

ChoosePlate.propTypes = {
  selectedDay: PropTypes.string.isRequired,
  mealType: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  fetchData: PropTypes.func.isRequired,
};

export default ChoosePlate;
