import Field from "../components/labels/Field";
import RoundedButton from "../components/buttons/RoundedButton";
import "./homeAddPlate.scss";
import ChoosePlate from "../components/cardChooseaPlate/ChoosePlate";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { API_GET_MENU_BY_DATE_MEAL } from "../config/url";
import useApiGetMenu from "../service/UseApiGetMenu";

const HomeAddAPlate = () => {
  const location = useLocation();
  const { mealId, day } = location.state || {};

 // Usa el hook useApiGetMenu para hacer la solicitud
 const { data, error, loading, fetchData } = useApiGetMenu(API_GET_MENU_BY_DATE_MEAL);

 useEffect(() => {
   // Hacer la solicitud a la API usando fetchData con los parámetros de consulta (query params)
   fetchData({ date: day, mealType: mealId });
 }, [day, mealId]);

 // Extraer la descripción del plato
 const plateDescription = data && data.length > 0 ? data[0].plate.description : null;



  return (
    <>
      <h2 className="addAPlate">
        Add a plate for {mealId} on {day}
      </h2>
      <div className="wrapperInputBtn">
        <Field type="text" name="name" placeholder="Add a plate" />
        <RoundedButton />
      </div>
      <div className="wrapperChooseMeal">
        <div className="platesContainer">
        {console.log(plateDescription)}
        {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : plateDescription ? (
            <p>{plateDescription}</p>
          ) : (
            <p>No plates yet for {mealId} on {day}</p>
          )}
        </div>
        <ChoosePlate />
      </div>
    </>
  );
};

export default HomeAddAPlate;
