import { useForm, type SubmitHandler } from "react-hook-form";
import Card from "../components/Card";
import { Container } from "../components/Container";
import Button from "../components/Button";
import Menu from "../components/Menu";
import FileInput from "../components/FileInput";
import { ProfilePictureRepository } from "../repositories/ProfilePictureRepository";
import { useFirebaseUser } from "../hooks/useFirebaseUser";
import { updateProfile } from "firebase/auth";
type Inputs = {
  image: FileList | null;
};
export const SettingsPage = () => {
  const { user } = useFirebaseUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    const file = data.image?.[0];
    new ProfilePictureRepository()
      .setProfilePicture(user!.uid, file!)
      .then((result) => {
        console.log("Profile picture uploaded successfully:", result);
        updateProfile(user!, { photoURL: result.downloadUrl });
      })
      .catch((error) => {
        console.error("Error uploading profile picture:", error);
      });
  };
  return (
    <>
      <Menu />
      <Container>
        <Card className="my-3" title="Settings">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FileInput
              label="Select Profile Picture"
              type="file"
              aria-invalid={errors.image ? "true" : "false"}
              error={errors.image && "This field is required"}
              {...register("image", { required: true })}
            />
            <Button variant="primary" type="submit">
              Upload Profile Picture
            </Button>
          </form>
        </Card>
      </Container>
    </>
  );
};
