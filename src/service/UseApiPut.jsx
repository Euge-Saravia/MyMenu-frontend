import { useState } from "react";

const UseApiPut = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const editData = async (id, updatedData) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(`Error! Status: ${response.status}`);
      }

      const jsonData = await response.json();
      return jsonData; // Devuelve la respuesta del servidor
    } catch (error) {
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { editData, loading, error };
};

export default UseApiPut;
