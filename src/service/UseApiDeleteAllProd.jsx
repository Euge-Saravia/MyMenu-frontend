import { useState } from "react";

const UseApiDeleteAllProd = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteAllData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error! Status: ${response.status}`);
      }

      return true; // Retorna true si la eliminación fue exitosa
    } catch (error) {
      setError(error.message);
      return false; // Retorna false si hubo un error
    } finally {
      setLoading(false);
    }
  };

  return { deleteAllData, loading, error };
};

export default UseApiDeleteAllProd;
