import { useEffect, useState } from "react";

interface ReturnType<TData> {
  data: TData | null;
  setData: React.Dispatch<React.SetStateAction<TData | null>>;
  isLoading: boolean;
}

const useFetch = <TData>(url: string): ReturnType<TData> => {
  const [data, setData] = useState<TData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.json();

        setData(responseData);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error);
        }
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [url]);

  return { data, setData, isLoading };
};

export default useFetch;
