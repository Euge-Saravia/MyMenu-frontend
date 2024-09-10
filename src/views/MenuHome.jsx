import ChooseDay from "../components/cardDays/ChooseDay";
import Title from "../components/title/Title";
import "./menuHome.scss";
import WeekDate from "../components/weekDate/WeekDate";
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks, addDays } from "date-fns";
import { useEffect, useState } from "react";
import useApiGetMenu from "../service/UseApiGetMenu";
import { API_GET_MENUS } from "../config/url";
import { useNavigate } from "react-router-dom";

const MenuHome = () => {
  // Estado para manejar la fecha actual de la semana
  const [currentDate, setCurrentDate] = useState(new Date());
  const { data: menus, fetchData } = useApiGetMenu(API_GET_MENUS);
  const navigate = useNavigate();

  // const days = [
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   "Saturday",
  //   "Sunday",
  // ];

  const mealIds = {
    breakfast: 1,
    lunch: 2,
    dinner: 52
  };
  

  const startDate = format(
    startOfWeek(currentDate, { weekStartsOn: 1 }),
    "yyyy-MM-dd"
  );
  const endDate = format(
    endOfWeek(currentDate, { weekStartsOn: 1 }),
    "yyyy-MM-dd"
  );

  useEffect(() => {
    // Evitar la solicitud inicial si los datos ya están cargados
    if (startDate && endDate) {
      fetchData({ starDate: startDate, enDate: endDate });
    }
  }, [startDate, endDate]);


  // const getMenuForDayAndMeal = (day, mealType) => {
  //   return menus?.find((menu) => {
  //     const menuDate = format(new Date(menu.date), "yyyy-MM-dd"); // Usamos el formato completo de la fecha
  //     const dayFormatted = format(day, "yyyy-MM-dd"); // Formatear el día en el mismo formato
  //     return menuDate === dayFormatted && menu.meal.type === mealType;
  //   });
  // };

  const getMenuForDayAndMeal = (day, mealType) => {
    const dayFormatted = format(day, "yyyy-MM-dd");
    console.log(`Buscando menús para ${mealType} el ${dayFormatted}`);

    return menus?.filter((menu) => {
      const menuDate = format(new Date(menu.date), "yyyy-MM-dd");
      console.log(`Comparando menú en ${menuDate} para ${menu.meal.type}`);
      return menuDate === dayFormatted && menu.meal.type === mealType;
    })[0]; // Tomar el primer menú si coincide
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

  // Formatear la semana actual
  const formattedWeek = getFormattedWeek(currentDate);

  // Función para ir a la semana anterior
  const handlePreviousWeek = () => {
    setCurrentDate(subWeeks(currentDate, 1));
  };
  // Función para ir a la siguiente semana
  const handleNextWeek = () => {
    setCurrentDate(addWeeks(currentDate, 1));
  };

  const handleMealClick = (mealType, day) => {
    const mealId = mealIds[mealType]; // Obtener el ID de la comida
    navigate(`/addPlate`, { state: { mealId, day: format(day, "yyyy-MM-dd") } });
  };

  return (
    <>
      <Title title="Add a meal" />
      <WeekDate
        className="weekDate"
        formattedWeek={formattedWeek}
        onPreviousWeek={handlePreviousWeek}
        onNextWeek={handleNextWeek}
      />
      <div className="containerDays">
      {Array.from({ length: 7 }, (_, index) => {
          // Calcular la fecha de cada día a partir de startDate
          const dayDate = addDays(startDate, index);
          return (
            <ChooseDay
              key={index}
              day={format(dayDate, "EEEE")} 
              breakfast={getMenuForDayAndMeal(dayDate, "Breakfast")}
              lunch={getMenuForDayAndMeal(dayDate, "Lunch")}
              dinner={getMenuForDayAndMeal(dayDate, "Dinner")}
              onMealClick={(mealType) => handleMealClick(mealType, dayDate)} // Pasar la fecha al hacer clic
            />
          );
        })}
      </div>
    </>
  );
};

export default MenuHome;
