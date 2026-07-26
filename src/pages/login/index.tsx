import SignInSection from "./sections/signInSection";
import WelcomeBackSection from "./sections/welcomeBackSection";

const LoginPage = () => {
  return (
    <>
      <div className="min-h-screen flex bg-surface-50">
        <WelcomeBackSection />
        <SignInSection />
      </div>
    </>
  );
};

export default LoginPage;
