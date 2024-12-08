"use client";

import { useEffect, useState } from "react";
import { useGET } from "./utils";

export const useGetProducts = (filter: object) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    useGET('product/',filter).then((res) => {
      if (res?.results) {
        setProducts(res?.results);
      }
      setLoading(false);
    });
  }, [filter.params]);
  return { products, loading };
};


export const useGetTopProducts = (filter: object) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    useGET('product/',{}).then((res) => {
      if (res?.results) {
        setProducts(res?.results);
      }
      setLoading(false);
    });
  }, []);
  return { products, loading };
};