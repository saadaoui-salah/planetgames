"use client";

import { useEffect, useState } from "react";
import { useGET } from "./utils";

export const useGetReviews = ( filter: object) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    let slug = filter?.productID ? `product/${filter.productID}/reviews/` : `product/reviews/` 
    delete filter?.productID
    useGET(slug, filter).then((res) => {
      if (res?.results) {
        setReviews(res?.results);
      }
      setLoading(false);
    });
  }, []);
  return { reviews, loading };
};
