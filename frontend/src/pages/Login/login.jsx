import { Link } from "react-router-dom"
import { Button } from "../../components/Layout/Button"
import { PageWrapper } from "../../components/Layout/PageWrapper"
import { Text } from "../../components/Layout/Text"
import { Field } from "../../components/Auth/field"
import { AuthLayout } from "../../components/Auth/auth"



export const Login = () => {
  return (
    <PageWrapper>
        <AuthLayout
        title="Welcome Back"
        subtitle="Welcome back! Sign in to continue exploring and booking your perfect stay."
        >
        <div className="flex flex-col gap-4">
            <Field label="Email" placeholder="Enter your email" />
            <Field label="Password" placeholder="Enter your password" />
        </div>

        <div className="flex flex-col items-center gap-4">
            <Button className="w-full bg-Green-500 py-1 lg:py-1.5 rounded-lg text-White-100 font-medium text-lg cursor-pointer">
            Login
            </Button>

            <div className="flex gap-1.5">
            <Text className="text-Green-700/90">
                Don't have an account?
            </Text>
            <Link to="/signup" className="font-semibold">
                Sign Up
            </Link>
            </div>
        </div>
        </AuthLayout>
    </PageWrapper>
  );
};




