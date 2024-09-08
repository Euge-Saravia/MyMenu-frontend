import ChooseDay from "../components/cardDays/ChooseDay";
import Title from "../components/title/Title";
import "./menuHome.scss";
import WeekDate from "../components/weekDate/WeekDate";
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks } from "date-fns";
import { useState } from "react";

const MenuHome = () => {
  // Estado para manejar la fecha actual de la semana
  const [currentDate, setCurrentDate] = useState(new Date());

  // Función para calcular el rango de la semana en formato deseado
  const getFormattedWeek = (date) => {
    const startDate = startOfWeek(date, { weekStartsOn: 1 });
    const endDate = endOfWeek(date, { weekStartsOn: 1 });

    return `Week ${format(startDate, "MMMM")} ${format(startDate, "d")} - ${format(endDate, "d")}`;
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

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

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
          <ChooseDay key={index} day={day} />
        ))}
      </div>
    </>
  );
};

export default MenuHome;
