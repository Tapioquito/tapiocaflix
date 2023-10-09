import { useEffect, useReducer } from "react";
import { Movie } from "../Types/index";
import axios from "axios";

interface State {
  data: null | Movie;
  error: null | string;
  loading: boolean;
}

enum ActionType {
  LOADING,
  SUCCESS,
  FAILED,
}

type Action =
  | { type: ActionType.LOADING }
  | { type: ActionType.SUCCESS; payload: Movie }
  | { type: ActionType.FAILED; payload: string };

const initialState: State = {
  data: null,
  error: null,
  loading: false,
};
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.LOADING:
      return {
        ...state,
        loading: true,
        error: null,
        data: null,
      };
    case ActionType.SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case ActionType.FAILED:
      return { ...state, loading: false, error: action.payload, data: null };
    default:
      return initialState;
  }
};
const useMovie = (id: string) => {
  const [{ data, loading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const fetchMovie = async () => {
    dispatch({ type: ActionType.LOADING });
    try {
      const response = await axios.get(`http://localhost:8080/movies/${id}`);
      dispatch({ type: ActionType.SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: ActionType.FAILED, payload: "Something went wrong" });
    }
  };

  useEffect(() => {
    fetchMovie();
  }, []);
  return { data, loading, error };
};
export default useMovie;
