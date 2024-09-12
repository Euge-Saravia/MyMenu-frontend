import "./backButton.scss";

const BackButton = () => {
  return (
    <div>
      <button className="backButton">
        <img
          className="backButtonImg"
          src="../../../public/assets/icons/left-chevron_9144318.png"
          alt="Flecha para volver hacia atras"
        ></img>
        <h4 className="backButtonTitle">Back</h4>
      </button>
    </div>
  );
};

export default BackButton;
