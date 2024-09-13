import * as React from "react";
import {Dispatch, ReactNode, SetStateAction} from "react";

// Define the types for the state
interface QueryState {
  [url: string]: {
    data: any;
    isLoading: boolean;
    error: string | null;
  };
}

const defaultState: QueryState = {};

// Define the type for the context value
type QueryContextType = [
  QueryState,
  Dispatch<SetStateAction<QueryState>>
];

// Create the context with the correct types
export const QueryContext = React.createContext<QueryContextType>([
  defaultState,
  () => {
  },
]);

export function QueryProvider({children}: { children: ReactNode }) {
  const tuple = React.useState<QueryState>(defaultState);

  return (
    <QueryContext.Provider value={tuple}>{children}</QueryContext.Provider>
  );
}

// Define the custom hook to use the query
export default function useQuery(url: string) {
  // Use the context with the correct types
  const [state, setState] = React.useContext(QueryContext);

  React.useEffect(() => {
    const update = (newState: Partial<QueryState[typeof url]>) =>
      setState((prevState) => ({
        ...prevState,
        [url]: {...prevState[url], ...newState},
      }));

    let ignore = false;

    const handleFetch = async () => {
      update({data: null, isLoading: true, error: null});

      try {
        const res = await fetch(url);

        if (ignore) {
          return;
        }

        if (!res.ok) {
          throw new Error(`A network error occurred.`);
        }

        const data = await res.json();

        update({data, isLoading: false, error: null});
      } catch (e: any) {
        update({error: e.message, isLoading: false, data: null});
      }
    };

    handleFetch();

    // Clean up function to set ignore flag on unmount
    return () => {
      ignore = true;
    };
  }, [url]);

  // Return the state for the specific URL
  return state[url] || {data: null, isLoading: true, error: null};
}
