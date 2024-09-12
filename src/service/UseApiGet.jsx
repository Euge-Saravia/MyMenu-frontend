import { useState, useEffect } from "react";

const UseApiGet = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async (url) => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error! Status: ${response.status}`);
        }
        const json_data = await response.json();
        setData(json_data);
      } catch (error) {
        console.error(`Error fetching data: ${error}`);
        setError(error.message);  
        setData(null);
      } finally {
        setLoading(false);  
      }
    };

    getData(url);
  }, [url]);

  return { data, loading, error };
};

export default UseApiGet;

