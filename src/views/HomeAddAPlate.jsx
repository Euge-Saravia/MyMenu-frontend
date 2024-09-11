import Field from "../components/labels/Field";
import RoundedButton from "../components/buttons/RoundedButton";
import "./homeAddPlate.scss";
import ChoosePlate from "../components/cardChooseaPlate/ChoosePlate";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  API_DELETE_MENU,
  API_GET_MENU_BY_DATE_MEAL,
  API_GET_MENUS,
} from "../config/url";
import useApiGetMenu from "../service/UseApiGetMenu";
import SmallButtons from "../components/buttons/SmallButtons";
import UseApiDeleteProd from "../service/UseApiDeleteProd";
import UseApiPostProd from "../service/UseApiPostProd";

const HomeAddAPlate = () => {
  const location = useLocation();
  const { mealType, day } = location.state || {};

  // Estado para el nuevo plato
  const [newPlateDescription, setNewPlateDescription] = useState("");

  // Usa el hook useApiGetMenu para hacer la solicitud
  const { data, error, loading, fetchData } = useApiGetMenu(
    API_GET_MENU_BY_DATE_MEAL
  );

  // Usa el hook UseApiDeleteProd para eliminar el menú
  const { deleteData } = UseApiDeleteProd(API_DELETE_MENU);

  // Usa el hook UseApiPostProd para crear un nuevo menú
  const { postData } = UseApiPostProd(API_GET_MENUS);

  useEffect(() => {
    // Hacer la solicitud a la API usando fetchData con los parámetros de consulta (query params)
    fetchData({ date: day, mealType: mealType.id });
  }, [day, mealType.id]);

  // Función para manejar el cambio de la descripción del nuevo plato
  const handleInputChange = (e) => {
    setNewPlateDescription(e.target.value);
  };

  // Función para manejar la creación de un nuevo menú
  const handleCreateMenu = async () => {
    if (!newPlateDescription) {
      console.log("Plate description is empty");
      return;
    }

    const newMenu = {
      date: day,
      meal: { id: mealType.id }, // Usa el ID del tipo de comida (1 = breakfast, 2 = lunch, etc.)
      plate: { description: newPlateDescription }, // Usa la descripción del plato
    };

    try {
      const createdMenu = await postData(newMenu); // Llamada a la API
      if (createdMenu) {
        console.log("Menu created successfully:", createdMenu);
        // Actualizar la lista de menús después de crear uno nuevo
        fetchData({ date: day, mealType: mealType.id });
      }
    } catch (error) {
      console.error("Error creating menu:", error);
    }
  };

  // Función para manejar la eliminación del menú
  const handleDelete = async (menuId) => {
    const success = await deleteData(menuId);
    if (success) {
      console.log("Menu deleted successfully");
      // Aquí puedes hacer lo que necesites, como volver a cargar la lista de menús o redirigir
      fetchData({ date: day, mealType: mealType.id }); // Opcionalmente recargar los datos después de la eliminación
    } else {
      console.error("Error deleting menu");
    }
  };

  return (
    <>
      <h2 className="addAPlate">
        Add a plate for {mealType.name} on {day}
      </h2>
      <div className="wrapperInputBtn">
        <Field
          type="text"
          name="name"
          placeholder="Add a plate"
          value={newPlateDescription} // Enlaza con el estado
          onChange={handleInputChange}
        />
        <RoundedButton onClick={handleCreateMenu} />
      </div>
      <div className="wrapperChooseMeal">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : data && data.length > 0 ? (
          data.map((menu) => (
            <div className="plateAndButtonWrapper" key={menu.id}>
              <p>{menu.plate.description}</p>
              <SmallButtons
                title="Delete"
                onClick={() => handleDelete(menu.id)}
              />
            </div>
          ))
        ) : (
          <p>
            No plates yet for {mealType.name} on {day}
          </p>
        )}
        <ChoosePlate
          selectedDay={day}
          mealType={mealType.id}
          fetchData={fetchData}
        />
      </div>
    </>
  );
};

export default HomeAddAPlate;
