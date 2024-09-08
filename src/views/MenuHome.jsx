import ChooseDay from "../components/cardDays/ChooseDay";
import Title from "../components/title/Title";
import "./menuHome.scss";
import WeekDate from "../components/weekDate/WeekDate";
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks } from "date-fns";
import { useEffect, useState } from "react";
import useApiGetMenu from "../service/UseApiGetMenu";

const MenuHome = () => {
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
  }, [startDate, endDate, fetchData]);

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

  return (
    <>
      <Title title="Add a meal" />
      <WeekDate
        formattedWeek={formattedWeek}
        onPreviousWeek={handlePreviousWeek}
        onNextWeek={handleNextWeek}
      />
      <div className="containerDays">
        {days.map((day, index) => (
          <ChooseDay
            key={index}
            day={day}
            breakfast={getMenuForDayAndMeal(day, "Breakfast")}
            lunch={getMenuForDayAndMeal(day, "Lunch")}
            dinner={getMenuForDayAndMeal(day, "Dinner")}
          />
        ))}
      </div>
    </>
  );
};

export default MenuHome;
