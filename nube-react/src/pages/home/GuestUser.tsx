import { useNavigate } from "react-router";
import Button from "../../components/Button";

export const GuestUser = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>Please sign in to continue</h1>
      <Button
        variant="primary"
        className="mt-3"
        onClick={() => {
          navigate("/login");
        }}
      >
        Login
      </Button>
    </>
  );
};
