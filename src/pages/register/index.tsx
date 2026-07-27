import SEO from "@/components/SEO";
import CreateAccountSection from "./sections/createAccountSection";
import StartBookSection from "./sections/startBookSection";

const RegisterPage = () => {
  return (
    <>
      <SEO title="Register" description="BookEase - Register" />
      <div className="min-h-screen flex bg-surface-50">
        <StartBookSection />
        <CreateAccountSection />
      </div>
    </>
  );
};

export default RegisterPage;
