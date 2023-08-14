import SignupForm from "../features/authentication/SignupForm";
// ui
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function NewUsers() {
  return (
    <>
      <Heading as="h1">Create a new user</Heading>

      <Row>
        <SignupForm />
      </Row>
    </>
  );
}

export default NewUsers;
