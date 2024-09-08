import ChooseDay from "../components/cardDays/ChooseDay";
import Title from "../components/title/Title";
import "./menuHome.scss";

const MenuHome = () => {
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
      <Title title="Meal Planer" />
      <div className="containerDays">
        {days.map((day, index) => (
          <ChooseDay key={index} day={day} />
        ))}
      </div>
    </>
  );
};

export default MenuHome;
