import { useState } from "react";

const useApiAddPlateToMenu = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addPlateToMenu = async (menuId, plateId, mealType) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3001/menus/${menuId}/addPlate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plate: {
            id: plateId,
          },
          mealType: mealType,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add plate to menu");
      }

      const data = await response.json();
      return data; // Retorna los datos en caso de éxito

    } catch (err) {
      setError(err.message);
      console.error("Error al guardar el plato", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { addPlateToMenu, loading, error };
};

export default useApiAddPlateToMenu;
