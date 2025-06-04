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
  const onGoogleSignInClick = (e) => {
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
              {...register("email", { required: true })}
            />
            {errors.email && <span>This field is required</span>}
            {errors.email?.type === "value" && (
              <p role="alert">It should be a valid email</p>
            )}
            <Input
              label="Password"
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && <span>This field is required</span>}

            <Button variant="primary" type="submit">
              Login
            </Button>
            <Button
              variant="primary"
              type="button"
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
