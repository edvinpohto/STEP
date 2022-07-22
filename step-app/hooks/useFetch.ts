import { useState, useEffect } from "react";
import axios from "axios";

const BaseUrl = axios.create({
  baseURL: "http://localhost:3000/",
});

const useFetch = () => {
  const [data, setData]: any = useState({
    slug: "",
    results: {
      events: [],
    },
  });

  useEffect(() => {
    if (data.slug !== "") {
      const timeoutId = setTimeout(() => {
        const fetch = async () => {
          try {
            // console.log(data.slug)
            const res = await BaseUrl.get(`api/search/${data.slug}`);
            console.log(res)
            setData({ ...data, results: res.data });
          } catch (err) {
            console.log(err);
          }
        };
        fetch();
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [data.slug]);

  return { data, setData };
};

export default useFetch;