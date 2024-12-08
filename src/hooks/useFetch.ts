/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react";

interface FetchDataResponse<T> {
  result: T[];
}

const useFetch = <T>(
  fetchData: () => Promise<FetchDataResponse<T>>,
  transformData?: (data: FetchDataResponse<T>) => T[]
) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const memoizedFetchData = useCallback(fetchData, []);
  const memoizedTransformData = useCallback(
    (data: FetchDataResponse<T>) =>
      transformData ? transformData(data) : data.result,
    [transformData]
  );

  useEffect(() => {
    let isMounted = true;

    const fetchItems = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await memoizedFetchData();

        if (!response || !response.result) {
          throw new Error("No data received.");
        }

        const finalData = memoizedTransformData(response);

        if (isMounted) {
          setData(finalData);
        }
      } catch (error: unknown) {
        if (isMounted) {
          setError(
            error instanceof Error
              ? error.message
              : "An unknown error occurred."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchItems();

    return () => {
      isMounted = false;
    };
  }, [memoizedFetchData, memoizedTransformData]);

  return { data, loading, error };
};

export default useFetch;
