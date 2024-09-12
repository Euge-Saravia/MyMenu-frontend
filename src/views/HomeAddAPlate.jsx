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
import UseApiPostProd from "../service/UseApiPostProd";
import UseApiDelete from "../service/UseApiDelete";

const HomeAddAPlate = () => {
  const location = useLocation();
  const { mealType, day } = location.state || {};

  const [newPlateDescription, setNewPlateDescription] = useState("");

  const { data, error, loading, fetchData } = useApiGetMenu(
    API_GET_MENU_BY_DATE_MEAL
  );

  const { deleteData } = UseApiDelete(API_DELETE_MENU);

  const { postData } = UseApiPostProd(API_GET_MENUS);

  useEffect(() => {
    fetchData({ date: day, mealType: mealType.id });
  }, [day, mealType.id]);

  const handleInputChange = (e) => {
    setNewPlateDescription(e.target.value);
  };

  const handleCreateMenu = async () => {
    if (!newPlateDescription) {
      console.log("Plate description is empty");
      return;
    }

    const newMenu = {
      date: day,
      meal: { id: mealType.id }, 
      plate: { description: newPlateDescription }, 
    };

    try {
      const createdMenu = await postData(newMenu); 
      if (createdMenu) {
        fetchData({ date: day, mealType: mealType.id });
        setNewPlateDescription("");
      }
    } catch (error) {
      console.error("Error creating menu:", error);
    }
  };

  const handleDelete = async (menuId) => {
    const success = await deleteData(menuId);
    if (success) {
      fetchData({ date: day, mealType: mealType.id }); 
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
