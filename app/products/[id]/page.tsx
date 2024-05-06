import { notFound } from "next/navigation";

import Image from "next/image";
import { db } from "@/app/_lib/prisma";

import { ArrowDownIcon } from "lucide-react";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_helpers/price";
import ProductImage from "./_components/product-image";
import DiscountBadge from "@/app/_components/discount-badge";
import ProductDetails from "./_components/product-details";

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

  const juices = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
      restaurant: {
        id: product?.restaurant.id,
      },
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

      <ProductDetails product={product} complementaryProducts={juices} />
    </div>
  );
};

export default ProductPage;