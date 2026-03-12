import { useEffect, useState } from "react";
import { dictionary } from "../mockData/dictionary";
import type { DictionaryItemProps } from "../types";

const useDictionary = () => {
  const [data, setData] = useState<DictionaryItemProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDictionary = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setData(dictionary);
      } catch (err: unknown) {
        console.log(err);
        setError("Failed to fetch dictionary");
      } finally {
        setLoading(false);
      }
    };

    fetchDictionary();
  }, []);

  const getWord = (searchTerm: string) => {
    if (!searchTerm) return data;

    return data.filter((item) =>
      item.word.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  };

  return { data, loading, error, getWord };
};

export default useDictionary;
