import { Link } from "react-router-dom";
import { Button } from "../../components/Layout/Button";
import { PageWrapper } from "../../components/Layout/PageWrapper";
import { Text } from "../../components/Layout/Text";
import { AuthLayout } from "../../components/Auth/auth";
import { Field } from "../../components/Auth/field";


export const Signup = () => {
  return (
    <PageWrapper>
      <AuthLayout
        title="Create Account"
        subtitle="Join Avantara Stays to discover handpicked nature retreats, book seamlessly, and manage your stays with ease."
      >
        {/* Form Fields */}
        <div className="flex flex-col gap-4">
          <Field label="Email" placeholder="Enter your email" />
          <Field label="Username" placeholder="Enter your username" />
          <Field label="Password" placeholder="Enter your password" />
        </div>

        {/* Actions */}
        <div className="flex flex-col items-center gap-4">
          <Button className="w-full bg-Green-500 py-1 lg:py-1.5 rounded-lg text-White-100 font-medium text-lg cursor-pointer">
            Sign Up
          </Button>

          <div className="flex gap-1.5">
            <Text className="text-Green-700/90">
              Already have an account?
            </Text>
            <Link to="/login" className="font-semibold">
              Login
            </Link>
          </div>
        </div>
      </AuthLayout>
    </PageWrapper>
  );
};