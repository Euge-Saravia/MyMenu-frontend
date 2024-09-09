import ChooseDay from "../components/cardDays/ChooseDay";
import Title from "../components/title/Title";
import "./menuHome.scss";
import WeekDate from "../components/weekDate/WeekDate";
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks } from "date-fns";
import { useEffect, useState } from "react";
import useApiGetMenu from "../service/UseApiGetMenu";
import { useNavigate } from "react-router-dom";

const MenuHome = () => {
  const navigate = useNavigate();

  // Estado para manejar la fecha actual de la semana
  const [currentDate, setCurrentDate] = useState(new Date());
  const { data: menus, fetchData } = useApiGetMenu("http://localhost:3001/menus");

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const startDate = format(startOfWeek(currentDate, { weekStartsOn: 1 }), "yyyy-MM-dd");
  const endDate = format(endOfWeek(currentDate, { weekStartsOn: 1 }), "yyyy-MM-dd");

  useEffect(() => {
    if (startDate && endDate) {
      fetchData({ starDate: startDate, enDate: endDate });
    }
  }, [startDate, endDate]);

  // Obtener el menú por día y tipo de comida (desayuno, almuerzo, cena)
  const getMenuForDayAndMeal = (day, mealType) => {
    return menus?.find((menu) => {
      const menuDate = format(new Date(menu.date), "EEEE");
      return menuDate === day && menu.meal.type === mealType;
    });
  };

  // Función para calcular el rango de la semana en formato deseado
  const getFormattedWeek = (date) => {
    const startDate = startOfWeek(date, { weekStartsOn: 1 });
    const endDate = endOfWeek(date, { weekStartsOn: 1 });

    return `Week ${format(startDate, "MMMM")} ${format(
      startDate,
      "d"
    )} - ${format(endDate, "d")}`;
  };

  // Función para ir a la semana anterior
  const handlePreviousWeek = () => {
    setCurrentDate(subWeeks(currentDate, 1));
  };

  // Función para ir a la siguiente semana
  const handleNextWeek = () => {
    setCurrentDate(addWeeks(currentDate, 1));
  };

  // Función para manejar el clic en una comida (desayuno, almuerzo, cena)
  const handleMealClick = (day, mealType, menuId) => {
    // Navegamos a la pantalla de agregar plato, pasando día, tipo de comida y menuId
    navigate("/addPlate", { state: { day, mealType, menuId } });
  };

  return (
    <>
      <Title title="Add a meal" />
      <WeekDate
        className="weekDate"
        formattedWeek={getFormattedWeek(currentDate)}
        onPreviousWeek={handlePreviousWeek}
        onNextWeek={handleNextWeek}
      />
      <div className="containerDays">
        {days.map((day, index) => {
          const breakfast = getMenuForDayAndMeal(day, "Breakfast");
          const lunch = getMenuForDayAndMeal(day, "Lunch");
          const dinner = getMenuForDayAndMeal(day, "Dinner");

          return (
            <ChooseDay
              key={index}
              day={day}
              breakfast={breakfast}
              lunch={lunch}
              dinner={dinner}
              // Extraemos el menuId de breakfast, lunch o dinner
              onMealClick={(mealType) => {
                let menuId;
                if (mealType === "Breakfast" && breakfast) {
                  menuId = breakfast.id;
                } else if (mealType === "Lunch" && lunch) {
                  menuId = lunch.id;
                } else if (mealType === "Dinner" && dinner) {
                  menuId = dinner.id;
                }
                handleMealClick(day, mealType, menuId); // Pasamos el menuId al hacer clic
              }}
            />
          );
        })}
      </div>
    </>
  );
};

export default MenuHome;

