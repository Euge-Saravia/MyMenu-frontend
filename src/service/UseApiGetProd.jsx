import { useState, useEffect } from "react";

const UseApiGetProd = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async (url) => {
      setLoading(true);  // Inicia la carga
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error! Status: ${response.status}`);
        }
        const json_data = await response.json();
        setData(json_data);
      } catch (error) {
        console.error(`Error fetching data: ${error}`);
        setError(error.message);  // Guarda el error
        setData(null);
      } finally {
        setLoading(false);  // Finaliza la carga
      }
    };

    getData(url);
  }, [url]);

  return { data, loading, error };
};

export default UseApiGetProd;

