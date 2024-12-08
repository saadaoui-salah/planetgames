"use client";
import { Title } from "@/components/shared/Title";
import { Table } from "@/components/Table";
import useWithAuth from "@/app/_authRouter";
import { useGetOrders } from "@/roupi/order";

function Orders() {
  const { orders } = useGetOrders();
  return (
    <section className="flex pt-16 min-h-[70vh]  w-full flex-col text-gray-900 items-center justify-center">
      <Title text="Orders Managment" />
      <div className="p-16 min-h-[60vh] flex flex-wrap gap-16 items-center justify-center">
        <Table data={orders} />
      </div>
    </section>
  );
}

export default useWithAuth(Orders);
