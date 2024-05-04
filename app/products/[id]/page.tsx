import { notFound } from "next/navigation";

import Image from "next/image";
import { db } from "@/app/_lib/prisma";

import { ArrowDownIcon } from "lucide-react";
import { formatCurrency } from "@/app/_helpers/price";
import ProductImage from "./_components/product-image";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <div>
      <ProductImage product={product} />

      <div className="p-5">
        <div className="flex items-center gap-[0.375rem]">
          <div className="relative h-6 w-6">
            <Image
              src={product.restaurant.imageUrl}
              alt={product.restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <span className=".text-xs text-muted-foreground">
            {product.restaurant.name}
          </span>
        </div>

        <h1 className="mb-2 mt-1 text-xl font-semibold">{product.name}</h1>

        <div className="flex justify-between">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold">
              {formatCurrency(Number(product.price))}
            </h2>
            {product.discountPorcentage > 0 && (
              <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full text-white">
                <ArrowDownIcon size={12} />
                <span>{product.discountPorcentage}%</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
