import { useParams } from "react-router";
import Menu from "../../../components/Menu";
import { Container } from "../../../components/Container";
import { ProductDetailContent } from "./ProductDetailContent";
import { useEffect } from "react";
import { logEvent } from "firebase/analytics";
import { firebaseAnalytics } from "../../../firebase/FirebaseConfig";
import { useFirebaseUser } from "../../../hooks/useFirebaseUser";

export const ProductDetailPage = () => {
  const { productSlug } = useParams<{ productSlug: string }>();
  const { user } = useFirebaseUser();
  useEffect(() => {
    if (!productSlug || !user) {
      return;
    }
    logEvent(firebaseAnalytics, "view_product_detail", {
      product_slug: productSlug,
      userId: user.uid,
    });
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      logEvent(firebaseAnalytics, "exit_product_detail", {
        productSlug: productSlug,
      });
      return true;
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, [productSlug, user]);
  return (
    <>
      <Menu />
      <Container>
        <ProductDetailContent productSlug={productSlug} />
      </Container>
    </>
  );
};
