import Field from "../components/labels/Field";
import Title from "../components/title/Title";
import RoundedButton from "../components/buttons/RoundedButton";
import "./homeAddPlate.scss";
import ChoosePlate from "../components/cardChooseaPlate/ChoosePlate";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const HomeAddAPlate = () => {
  const location = useLocation();
  const { mealId, day } = location.state || {};

  console.log(day);

  // Estado para almacenar el plato seleccionado
  const [plate, setPlate] = useState(null);
  // const [loading, setLoading] = useState(true); // Para mostrar un mensaje de carga

  useEffect(() => {
    // Simulación de la llamada a la API para obtener el plato por meal y day
    const fetchPlate = async () => {
      try {
        // Aquí debes realizar la llamada a la API para obtener el plato
        const response = await fetch(
          `http://localhost:3001/menu?date=${day}&mealType=${mealId}`
        );
        const data = await response.json();
        console.log(data);
        console.log(data.plate);
        if (data && data.plate) {
          setPlate(data.plate); // Asigna el plato si existe
        } else {
          setPlate(null); // No hay plato para la comida y el día seleccionado
        }
      } catch (error) {
        console.error("Error fetching plate:", error);
        setPlate(null); // En caso de error, no hay plato
      } finally {
        // setLoading(false); // Finaliza la carga
      }
    };

    fetchPlate();
  }, [mealId, day]);

  return (
    <>
      <Title title="Add a plate" />
      <h2>
        Add a plate for {mealId} on {day}
      </h2>
      <div className="wrapperInputBtn">
        <Field type="text" name="name" placeholder="Add a plate" />
        <RoundedButton />
      </div>
      <div className="wrapperChooseMeal">
        <div className="platesContainer">
        {console.log(plate)}
          {plate ? (
            <p>{plate.description}</p> // Muestra el plato si existe
          ) : (
            <p>
              No plates yet for {mealId} on {day}
            </p> // Muestra si no hay platos
          )}
        </div>
        <ChoosePlate />
      </div>
    </>
  );
};

export default HomeAddAPlate;
