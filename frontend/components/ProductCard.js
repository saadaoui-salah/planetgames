"use client";
import Image from "next/image";
import { Stars } from "./Stars";
import Link from "next/link";

export const ProductCard = ({
  id,
  title,
  rating,
  price,
  image,
}) => {
  return (
    <Link href={`/products/${id}`}>
      <div className="w-52 border border-gray-200 rounded relative overflow-hidden hover:shadow-sm">
        <div className="overflow-hidden">
          <Image
            width={600}
            height={600}
            src={image}
            className="w-[13rem] h-[13rem] object-cover transition-transform duration-300 transform hover:scale-125"
            alt="Product Image"
          />
        </div>
        <div className="px-4 py-2">
          <h2 className="font-bold text-lg text-gray-900">{title}</h2>
          <div className="flex justify-between items-center font-bold text-sm text-gray-400">
            <p>{rating > 0 ? <Stars num={rating} /> : "Not rated yet"}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-ccenter py-1">
              <div className="flex text-lg font-bold text-gray-900">
                {price}<div className="text-sm font-bold text-gray-900">DA</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
