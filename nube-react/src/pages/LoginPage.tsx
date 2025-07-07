import { useForm, type SubmitHandler } from "react-hook-form";
import { Input } from "../components/Input";
import Card from "../components/Card";
import { Container } from "../components/Container";
import Button from "../components/Button";
import { useFirebaseUser } from "../hooks/useFirebaseUser";
import Menu from "../components/Menu";
type Inputs = {
  email: string;
  password: string;
};
export const LoginPage = () => {
  const { loginWithFirebase, loginWithGoogle } = useFirebaseUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    loginWithFirebase(data.email, data.password);
  };
  const onGoogleSignInClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    loginWithGoogle();
  };
  return (
    <>
      <Menu />
      <Container>
        <Card className="my-3" title="Login">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Email"
              type="email"
              aria-invalid={errors.email ? "true" : "false"}
              error={
                errors.email?.type === "value"
                  ? "It should be a valid email"
                  : errors.email && "This field is required"
              }
              {...register("email", { required: true })}
            />
            <Input
              label="Password"
              type="password"
              {...register("password", { required: true })}
              error={errors.password && "This field is required"}
            />

            <Button variant="primary" type="submit">
              Login
            </Button>
            <Button
              variant="primary"
              type="button"
              className="ml-2"
              onClick={onGoogleSignInClick}
            >
              Login wigh Gmail
            </Button>
          </form>
        </Card>
      </Container>
    </>
  );
};
