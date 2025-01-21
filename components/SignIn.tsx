import { signIn } from "@/auth";
import { Button } from "./ui/button";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <Button type="submit" variant={"link"}>
        Signin
      </Button>
    </form>
  );
}
