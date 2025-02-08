import { useState } from "react";
import { toast } from "sonner";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  fn: (...args: any[]) => Promise<void>;
}

function useFetch<T>(cb: (...args: any[]) => Promise<T>): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fn = async (...args: any[]) => {
    setLoading(true);
    setError(null);

    try {
      const response = await cb(...args);
      setData(response);
      setError(null);
    } catch (error: any) {
      setError(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn };
}

export default useFetch;
