import { LottieHandler } from "./lottieHandler/LottieHandler";
import CartSkeleton from "./scelatons/CartSkeleton";
import ProductSkeleton from "./scelatons/ProductSkeleton";
import CategoreyScelaton from "./scelatons/CategoreyScelaton";
import { TLoading } from "src/types/shared";

const skelatonsTypes = {
  cart: CartSkeleton,
  category: CategoreyScelaton,
  product: ProductSkeleton,
};

type LoadingProps = {
  loading: TLoading;
  error: null | string;
  children: React.ReactNode;
  type: "cart" | "category" | "product";
};

const Loading = ({ loading, error, children, type }: LoadingProps) => {
  const Component = skelatonsTypes[type];

  if (loading === "pending") {
    return <Component />;
  }
  if (loading === "failed") {
    return <LottieHandler type="error" message={error as string} />;
  }
  return <>{children}</>;
};

export default Loading;
