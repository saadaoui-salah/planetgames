"use client";
import { useEffect, useState } from "react";
import { useGET } from "./utils";

interface Order {
  id: number,
  description: string,
  media: string,
  is_video: boolean,
  created_at: string
}

interface OrderResponse {
  count:number,
  next: string | null,
  previous: string | null,
  results: Order[],
}

export const useGetOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    useGET('order/list/', {}).then((res: OrderResponse) => {
      if (res.results) {
        setOrders(res.results);
        console.log(res)
      }
      setLoading(false);
    });
  }, []);
  return { orders, loading };
};
