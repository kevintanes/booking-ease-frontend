import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useAuth } from "@/context/authContext";
import { type LoginFormValues, loginSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const SignInSection = () => {
  const [showPass, setShowPass] = useState(false);

  const { login } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex-1 p-6 sm:p-12 flex flex-col justify-center items-center">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <Link to="/" className="flex gap-2 items-center lg:hidden mb-8">
            <div className="w-8 h-8 rounded-lg bg-linear-to-r from-brand-500 to-brand-700 flex justify-center items-center">
              <CalendarDays className="text-white" size={15} />
            </div>
            <span className="font-bold text-surface-900">
              Book<span className="text-brand-600 ">Ease</span>
            </span>
          </Link>
          <h2 className="text-2xl font-bold text-surface-900 mb-1">
            Sign in to your account
          </h2>
          <p className="text-surface-800 text-sm">
            Don't have an account?{" "}
            <Button
              className="px-0"
              variant="link"
              nativeButton={false}
              render={<Link to={"/register"} />}
            >
              Create one free
            </Button>
          </p>
        </div>

        <Button
          variant="outline"
          className="w-full border-surface-200 text-surface-800 gap-3 py-3 px-4 hover:bg-surface-50 rounded-lg mb-6"
          size="xl"
        >
          <svg className="size-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </Button>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-surface-200" />
          <span className="text-xs text-surface-400 font-medium">OR</span>
          <div className="flex-1 h-px bg-surface-200" />
        </div>

        {/* disini form register */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className="gap-4">
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="email"
                    className="text-sm font-medium text-surface-800"
                  >
                    Email address
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      <Mail className="text-surface-400 size-4" />
                    </InputGroupAddon>
                    <InputGroupInput
                      {...field}
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      aria-invalid={fieldState.invalid}
                    />
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="password"
                    className="text-sm font-medium text-surface-800"
                  >
                    Password
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      <Lock className="text-surface-400 size-4" />
                    </InputGroupAddon>
                    <InputGroupInput
                      {...field}
                      id="password"
                      type={showPass ? "text" : "password"}
                      placeholder="******"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton
                        size="sm"
                        className="text-surface-400 hover:text-surface-800"
                        onClick={() => setShowPass((prev) => !prev)}
                      >
                        {showPass ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <Button
            type="submit"
            size="xl"
            className="w-full mt-4 font-semibold text-base"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default SignInSection;
