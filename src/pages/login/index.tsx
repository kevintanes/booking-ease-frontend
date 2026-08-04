import SEO from "@/components/SEO";
import SignInSection from "./sections/signInSection";
import WelcomeBackSection from "./sections/welcomeBackSection";

const LoginPage = () => {
  return (
    <>
      <SEO title="SignIn" description="BookEase - Login" />
      <div className="min-h-screen flex bg-surface-50">
        <WelcomeBackSection />
        <SignInSection />
      </div>
    </>
  );
};

export default LoginPage;
