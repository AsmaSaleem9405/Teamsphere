import { useState } from "react";
import { supabase } from "@/app/lib/supabase/client";

export const useSearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = async (query) => {
    if (!query) {
      setResults([]);
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("items")
      .select("*")
      .ilike("name", `%${query}%`)
      .limit(5);

    if (!error) setResults(data || []);
    setLoading(false);
  };

  return { results, search, loading };
};