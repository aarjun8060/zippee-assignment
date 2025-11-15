import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "../components/ui/field";
import { Input } from "../components/ui/input";
import {
  setUser,
  setIsAuthenticated,
  setIsLoading,
} from "../redux/slices/auth";

// Dummy credentials
const DUMMY_EMAIL = "user@example.com";
const DUMMY_PASSWORD = "password123";

// Zod schema for form validation
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

/**
 * @returns LoginForm component
 * This component is used to display the login form using zod and react-hook-form
 */
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    email: DUMMY_EMAIL,
    password: DUMMY_PASSWORD,
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: initialValues,
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      dispatch(setIsLoading(true));

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Validate against dummy credentials
      if (data.email && data.password) {
        // Set user data
        dispatch(
          setUser({
            email: data.email,
            name: "John Doe",
            id: "1",
          })
        );
        dispatch(setIsAuthenticated(true));
        dispatch(setIsLoading(false));

        // Navigate to home page
        navigate("/");
      } else {
        dispatch(setIsLoading(false));
        alert("Invalid email or password. Use: user@example.com / password123");
      }
    } catch (error) {
      dispatch(setIsLoading(false));
      console.error("Login error:", error);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register("email")}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && (
            <FieldDescription className="text-destructive text-xs">
              {errors.email.message}
            </FieldDescription>
          )}
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            {...register("password")}
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password && (
            <FieldDescription className="text-destructive text-xs">
              {errors.password.message}
            </FieldDescription>
          )}
        </Field>
        <Field>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </Field>

        <Field></Field>
      </FieldGroup>
    </form>
  );
}
