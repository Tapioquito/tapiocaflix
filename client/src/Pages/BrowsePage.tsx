import { useCallback, useRef, useState } from "react";
import BillBoard from "../components/Billboard";
import MovieList from "../components/MovieList";
import NavBar from "../components/NavBar";
import useMoviesList from "../hooks/useMoviesList";
import LoadingCards from "../components/LoadingCards";
export default function BrowsePage() {
  const [offSet, setOffset] = useState(0);
  const { data, loading, error } = useMoviesList(offSet);

  const observer = useRef<null | IntersectionObserver>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setOffset(offSet + 12);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading]
  );
  return (
    <div>
      <NavBar />
      <BillBoard />

      <div className="pb-5">
        {error && <p>{error} </p>}
        {data && <MovieList movies={data} lastElementRef={lastElementRef} />}

        {loading ? <LoadingCards /> : null}
      </div>
    </div>
  );
}
