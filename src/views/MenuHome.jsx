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
  const [currentDate, setCurrentDate] = useState(new Date());
  console.log(currentDate);
  const { data: menus, fetchData } = useApiGetMenu(API_GET_MENUS);
  const navigate = useNavigate();

  const startDate = format(
    startOfWeek(currentDate, { weekStartsOn: 1 }),
    "yyyy-MM-dd"
  );
  const endDate = format(
    endOfWeek(currentDate, { weekStartsOn: 1 }),
    "yyyy-MM-dd"
  );

  useEffect(() => {
    if (startDate && endDate) {
      fetchData({ starDate: startDate, enDate: endDate });
    }
  }, [startDate, endDate]);


  const getMenuForDayAndMeal = (day, mealType) => {
    const dayFormatted = format(day, "yyyy-MM-dd");
    console.log(`Buscando menús para ${mealType} el ${dayFormatted}`);

    return menus?.filter((menu) => {
      const menuDate = format(new Date(menu.date), "yyyy-MM-dd");
      console.log(`Comparando menú en ${menuDate} para ${menu.meal.type}`);
      return menuDate === dayFormatted && menu.meal.type === mealType;
    }) ||[]; 
  };
  
  const getFormattedWeek = (date) => {
    const startDate = startOfWeek(date, { weekStartsOn: 1 });
    const endDate = endOfWeek(date, { weekStartsOn: 1 });

    return `Week ${format(startDate, "MMMM")} ${format(
      startDate,
      "d"
    )} - ${format(endDate, "d")}`;
  };

  const formattedWeek = getFormattedWeek(currentDate);

  const handlePreviousWeek = () => {
    setCurrentDate(subWeeks(currentDate, 1));
  };
  
  const handleNextWeek = () => {
    setCurrentDate(addWeeks(currentDate, 1));
  };

  const handleMealClick = (mealType, day) => {
    
    navigate(`/addPlate`, { state: { mealType, day: format(day, "yyyy-MM-dd") } });
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
          const dayDate = addDays(startDate, index);
          return (
            <ChooseDay
              key={index}
              day={format(dayDate, "EEEE")} 
              breakfast={getMenuForDayAndMeal(dayDate, "Breakfast")}
              lunch={getMenuForDayAndMeal(dayDate, "Lunch")}
              dinner={getMenuForDayAndMeal(dayDate, "Dinner")}
              onMealClick={(mealType) => handleMealClick(mealType, dayDate)} 
            />
          );
        })}
      </div>
    </>
  );
};

export default MenuHome;
