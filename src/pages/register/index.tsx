import CreateAccountSection from "./sections/createAccountSection";
import StartBookSection from "./sections/startBookSection";

const RegisterPage = () => {
  return (
    <>
      <div className="min-h-screen flex bg-surface-50">
        <StartBookSection />
        <CreateAccountSection />
      </div>
    </>
  );
};

export default RegisterPage;
