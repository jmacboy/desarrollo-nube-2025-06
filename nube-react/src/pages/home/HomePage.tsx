import { Container } from "../../components/Container";
import { useFirebaseUser } from "../../hooks/useFirebaseUser";
import { LoggedInUser } from "./LoggedInUser";
import { GuestUser } from "./GuestUser";
import Menu from "../../components/Menu";

const HomePage = () => {
  const { user } = useFirebaseUser();
  return (
    <>
      <Menu />
      <Container>{user ? <LoggedInUser /> : <GuestUser />}</Container>
    </>
  );
};

export default HomePage;
