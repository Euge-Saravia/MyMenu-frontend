import Field from "../components/labels/Field";
import RoundedButton from "../components/buttons/RoundedButton";
import "./homeAddPlate.scss";
import ChoosePlate from "../components/cardChooseaPlate/ChoosePlate";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { API_DELETE_MENU, API_GET_MENU_BY_DATE_MEAL } from "../config/url";
import useApiGetMenu from "../service/UseApiGetMenu";
import SmallButtons from "../components/buttons/SmallButtons";
import UseApiDeleteProd from "../service/UseApiDeleteProd";

const HomeAddAPlate = () => {
  const location = useLocation();
  const { mealType, day } = location.state || {};

 // Usa el hook useApiGetMenu para hacer la solicitud
 const { data, error, loading, fetchData } = useApiGetMenu(API_GET_MENU_BY_DATE_MEAL);

 // Usa el hook UseApiDeleteProd para eliminar el menú
 const { deleteData } = UseApiDeleteProd(API_DELETE_MENU);

 useEffect(() => {
   // Hacer la solicitud a la API usando fetchData con los parámetros de consulta (query params)
   fetchData({ date: day, mealType: mealType.id });
 }, [day, mealType.id]);

 // Extraer la descripción del plato
 const plateDescription = data && data.length > 0 ? data[0].plate.description : null;
 const menuId = data && data.length > 0 ? data[0].id : null;

// Función para manejar la eliminación del menú
const handleDelete = async () => {
  if (menuId) {
    const success = await deleteData(menuId);
    if (success) {
      console.log("Menu deleted successfully");
      // Aquí puedes hacer lo que necesites, como volver a cargar la lista de menús o redirigir
      fetchData({ date: day, mealType: mealType.id }); // Opcionalmente recargar los datos después de la eliminación
    } else {
      console.error("Error deleting menu");
    }
  }
};

  return (
    <>
      <h2 className="addAPlate">
        Add a plate for {mealType.name} on {day}
      </h2>
      <div className="wrapperInputBtn">
        <Field type="text" name="name" placeholder="Add a plate" />
        <RoundedButton />
      </div>
      <div className="wrapperChooseMeal">
        <>
        {console.log(plateDescription)}
        {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : plateDescription ? (
            <div className="plateAndButtonWrapper">
            <p>{plateDescription}</p> 
            <SmallButtons title="Delete" onClick={handleDelete}/>
            </div>
          ) : (
            <p>No plates yet for {mealType.name} on {day}</p>
          )}
        </>
        <ChoosePlate />
      </div>
    </>
  );
};

export default HomeAddAPlate;
