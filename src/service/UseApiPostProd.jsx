import { useState } from "react";

const UseApiPostProd = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error! Status: ${response.status}`);
      }

      const json_data = await response.json();
      return json_data; // Devuelve la respuesta del servidor
    } catch (error) {
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { postData, loading, error };
};

export default UseApiPostProd;
