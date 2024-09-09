import Field from "../components/labels/Field";
import Title from "../components/title/Title";
import RoundedButton from "../components/buttons/RoundedButton";
import "./homeAddPlate.scss";
import ChoosePlate from "../components/cardChooseaPlate/ChoosePlate";
import LargeButtons from "../components/buttons/LargeButtons"
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import useApiAddPlateToMenu from "../service/UseApiAddPlateToMenu";

const HomeAddAPlate = () => {
  const location = useLocation(); // Obtiene los datos de día y tipo de comida
  const navigate = useNavigate();
  const { day, mealType, menuId } = location.state; // Usamos los datos pasados desde MenuHome

  const [selectedPlate, setSelectedPlate] = useState(null); // Para almacenar el Plate seleccionado
  const { addPlateToMenu } = useApiAddPlateToMenu(); // Usamos nuestro hook personalizado para la API

  const handleSave = async () => {
    if (!selectedPlate) {
      console.log("No plate selected");
      return;
    }
    try {
      // Llama a la API para guardar el Plate en el backend
      await addPlateToMenu(menuId, selectedPlate.id, mealType);
      navigate("/"); // Redirige a la página principal tras el guardado
    } catch (error) {
      console.error("Error saving plate to menu", error);
    }
  };

  const handlePlateSelect = (plate) => {
    setSelectedPlate(plate); // Actualizamos el Plate seleccionado
  };

  return (
    <>
       <Title title={`Add a plate for ${mealType} on ${day}`} />
      <div className="wrapperInputBtn">
        <Field type="text" name="name" placeholder="Add a plate" />
        <RoundedButton />
      </div>
      <LargeButtons title="Save" onClick={handleSave}/>
      <div className="wrapperChooseMeal">
      <ChoosePlate onPlateSelect={handlePlateSelect} />
      </div>
      
    </>
  );
};

export default HomeAddAPlate;
