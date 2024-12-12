"use client";
import { ProductDetailsCard } from "@/components/ProductDetailsCard";
import { useGetPDP } from "@/roupi/product";
import Image from "next/image";
import { Chat } from "@/app/page";
import { useStateContext } from "@/context/contextProvider";

export default function ProductDetails({ params }) {
  const {profile} = useStateContext()
  const { productID } = params;
  if (!productID) return <p>Loading</p>;
  const { products: product } = useGetPDP(productID);
  return (
        <>
    <section className="px-6 md:px-20 lg:px-34">
      <div className="px-6 py-24 flex flex-wrap py-8 mb-4  w-full justify-center">
        <Image src={product.image} alt='pdp' className="[width:min(80%,400px)] mb-12 min-[1120px]:sticky top-5 h-[400px] rounded-md" width={10000} height={100000}/>
        <ProductDetailsCard
          id={product?.id}
          price={product?.price}
          description={product?.description}
          title={product?.name}
        />
      </div>
    </section>
      {profile.id && <Chat/>}
</>
  );
}
