"use client";

import { useEffect, useState } from "react";
import { useGET } from "./utils";

interface Category {
  id: number;
  name: string;
}

export const useGetCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    useGET('product/categories', {}).then((res) => {
      if (res) {
        setCategories(res);
      }
      setLoading(false);
    });
  }, []);
  return { categories, loading };
};
