import Menu from "../../../components/Menu";
import { Container } from "../../../components/Container";
import { ProductListCatalog } from "./ProductListCatalog";

export const ProductCatalogPage = () => {
  return (
    <>
      <Menu />
      <Container>
        <ProductListCatalog />
      </Container>
    </>
  );
};
