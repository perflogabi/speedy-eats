import { Prisma } from "@prisma/client";
import ProductItem from "./product-item";

interface ProducListProps {
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>[];
}

const ProductList = ({ products }: ProducListProps) => {
  return (
    <div className="everflow-x-scroll flex gap-4 px-5 [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
