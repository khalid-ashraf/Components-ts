import { useEffect, useState } from "react";

const useFetch = <TData>(
  url: string,
  limit: number
): { data: TData | null; isLoading: boolean } => {
  const [data, setData] = useState<TData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`${url}${limit}`);
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
  }, []);

  return { data, isLoading };
};
export default useFetch;
