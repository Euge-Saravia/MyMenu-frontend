import Field from "../components/labels/Field";
import Title from "../components/title/Title";
import RoundedButton from "../components/buttons/RoundedButton";
import "./homeAddPlate.scss";
import ChoosePlate from "../components/cardChooseaPlate/ChoosePlate";

const HomeAddAPlate = () => {
  return (
    <>
      <Title title="Add a plate" />
      <div className="wrapperInputBtn">
        <Field type="text" name="name" placeholder="Add a plate" />
        <RoundedButton />
      </div>
      <div className="wrapperChooseMeal">
      <ChoosePlate />
      </div>
      
    </>
  );
};

export default HomeAddAPlate;
