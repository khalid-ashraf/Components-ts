import { useState } from "react";
import useFetch from "../hooks/useFetch";

interface Product {
  id: number;
  title: string;
}

interface FetchData {
  products: Product[];
}

const LoadMore: React.FC = () => {
  const URL = "https://dummyjson.com/products?limit=10&skip=";

  const [loadMore, setLoadMore] = useState(0);

  const { data, setData, isLoading } = useFetch<FetchData>(`${URL}${loadMore}`);

  const handleLoadMore = async (): Promise<void> => {
    const response = await fetch(`${URL}${loadMore + 10}`);
    const responseData = await response.json();

    setData((prev) =>
      prev ? { ...prev, products: [...prev.products, ...responseData.products] } : responseData
    );
    setLoadMore((prev) => prev + 10);
  };

  return (
    <section aria-label='Product List' role='region' aria-live='polite' className='text-center'>
      {isLoading ? (
        <p role='status' aria-live='assertive'>
          Loading...
        </p>
      ) : (
        <ul role='list' aria-label='Product listings'>
          {data?.products.map((product: Product) => (
            <li key={product.id} role='listitem' aria-label={`Product: ${product.title}`}>
              {product.title}
            </li>
          ))}
        </ul>
      )}

      <button
        className={`btn-primary ${loadMore === 90 ? "btn-disabled" : ""}`}
        onClick={handleLoadMore}
        disabled={loadMore === 90}
        aria-disabled={loadMore === 90}
        aria-label={loadMore === 90 ? "No more products to load" : "Load more products"}
      >
        Load More
      </button>
    </section>
  );
};
export default LoadMore;
