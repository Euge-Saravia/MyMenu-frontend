import { useEffect, useState } from "react";
import { API_PLATES } from "../../config/url";
import UseApiGetProd from "../../service/UseApiGetProd";
import "./choosePlate.scss";
import PlateItem from "../items/PlateItem";

const ChooseMeal = () => {
  const [plates, setPlates] = useState([]);

  const {
    data,
    loading: loadingProducts,
    error: errorProducts,
  } = UseApiGetProd(API_PLATES);

  useEffect(() => {
    if (data) {
      setPlates(data); 
    }
  }, [data]);

  const handleEditPlate = () => {
    console.log("Click al btn edit");
  };

  return (
    <div className="choosePlate">
      <h3 className="titleChoosePlate">Choose a plate</h3>
      {/* Mostrar mensajes de carga o error */}
      {loadingProducts && <p>Loading products...</p>}
      {errorProducts && <p>Error fetching products: {errorProducts}</p>}

      <ul>
        {plates && plates.length > 0 ? (
          plates.map((plate) => (
            <PlateItem
              key={plate.id}
              plate={plate}
              onEdit={handleEditPlate}
            />
          ))
        ) : (
          <p className="notProducts">There are no products, add one</p>
        )}
      </ul>
    </div>
  );
};

export default ChooseMeal;
