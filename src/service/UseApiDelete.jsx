import { useState } from "react";

const UseApiDelete = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteData = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error! Status: ${response.status}`);
      }

      return true; // Devuelve true si la eliminación fue exitosa
    } catch (error) {
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteData, loading, error };
};

export default UseApiDelete;
