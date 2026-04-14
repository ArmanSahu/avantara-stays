import { Layout } from "../Layout/Layout";
import { Text } from "../Layout/Text";

export const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <Layout className="flex flex-col lg:flex-row items-center md:justify-center py-20 lg:gap-20 gap-10">

      <div className="max-w-2xs lg:max-w-xs px-6 md:px-4 text-start">
        <Text className="text-3xl lg:text-4xl font-semibold">
          {title}
        </Text>
        <Text className="lg:mt-2 mt-1 text-base lg:text-lg font-medium text-gray-600">
          {subtitle}
        </Text>
      </div>

      <div className="min-w-xs lg:min-w-md flex flex-col px-10 py-10 lg:py-15 bg-Green-400 gap-8 rounded-2xl border">
        {children}
      </div>

    </Layout>
  );
};