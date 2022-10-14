import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (endpoint) => {
  const [data, setData] = useState([]);

  async function fetchData() {
    const {data} = await axios.get(endpoint);
    setData(data);
  }

  useEffect( () => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [endpoint] )

  return data;
}

export default useFetch;