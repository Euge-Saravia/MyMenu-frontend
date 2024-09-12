import { useState } from "react";

const useApiGetMenu = (endpoint) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (params = {}) => {
    setLoading(true);
    try {
      // Construir la URL con los parámetros de consulta (query params)
      const queryParams = new URLSearchParams(params).toString();
      const url = `${endpoint}?${queryParams}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, fetchData };
};

export default useApiGetMenu;
