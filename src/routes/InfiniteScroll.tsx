import { useEffect, useState, useRef, useCallback } from "react";

interface BookSearchResult {
  books: string[];
  loading: boolean;
  hasMore: boolean;
}

const useBookSearch = (query: string, pageNumber: number): BookSearchResult => {
  const [books, setBooks] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);

  useEffect(() => {
    const URL = "http://openlibrary.org/search.json";
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${URL}?q=${encodeURIComponent(query)}&page=${pageNumber}`, {
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }

        const responseData = await response.json();
        const titles: string[] = responseData.docs.map((book: { title: string }) => book.title);

        setBooks((prev) => {
          const newBooks = prev ? [...prev, ...titles] : titles;
          return [...new Set(newBooks)];
        });

        setHasMore(responseData.docs.length > 0);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchData();

    return () => abortController.abort();
  }, [query, pageNumber]);

  return { books, loading, hasMore };
};

const InfiniteScroll = () => {
  const [query, setQuery] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(1);

  const { books, loading, hasMore } = useBookSearch(query, pageNumber);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastBookElementRef = useCallback(
    (node: HTMLLIElement) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setQuery((e.target as HTMLFormElement).querySelector("input")?.value || "");
    setPageNumber(1);
  };

  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return (
    <main>
      <h1>Book Search</h1>

      <form onSubmit={handleSearch} aria-label='search books'>
        <label htmlFor='search-input'>Input: </label>
        <input
          id='search-input'
          type='text'
          className='color-black'
          style={{ backgroundColor: "black", color: "white" }}
          placeholder='Enter Search...'
        />
        <button className='btn-primary' type='submit'>
          Submit
        </button>
      </form>

      {query.length > 0 && books.length > 0 ? (
        <ul>
          {books.map((book, id) => {
            if (books.length === id + 1) {
              return (
                <li ref={lastBookElementRef} key={book}>
                  {book}
                </li>
              );
            }

            return <li key={book}>{book}</li>;
          })}
        </ul>
      ) : null}

      {loading && <div>Loading...</div>}
    </main>
  );
};

export default InfiniteScroll;
