import { useEffect, useState } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(
    function () {
      async function fetchData() {
        try {
          const res = await fetch(url, {
            method: "GET",
          });
          const json = await res.json();
          setData(json);
          setLoading(false);
        } catch (e) {
          console.error(e);
          setLoading(false);
        }
      }
      fetchData();
    },
    [url]
  );
  return { data, loading };
}
