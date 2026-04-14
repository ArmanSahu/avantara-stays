import { Image } from "../Layout/Image";
import { Layout } from "../Layout/Layout";
import { Text } from "../Layout/Text";
import HomeImg from "../../assets/home.png"




export const Footer = () => {
  return (
    <div className="border-t mt-10 bg-white ">
      <Layout className="flex flex-col md:flex-row gap-10 md:gap-20 py-10 md:justify-center">

        {/* Brand */}
        <div className="max-w-sm">
          <div className="flex gap-2 items-center">
            <Text className="font-serif md:text-2xl text-xl font-semibold text-Green-600">
              Avantara Stays
            </Text>
            <Image src={HomeImg} className="h-5 w-5" />
          </div>

          <Text className="text-sm text-gray-600 mt-2 leading-relaxed">
            Escape to nature with Avantara Stays. Handpicked retreats nestled in serene wilderness offering tranquility and adventure.
          </Text>
        </div>

        {/* Locations */}
        <div className="flex flex-col gap-2">
          <Text className="font-semibold">Locations</Text>
          <Text>Koraput</Text>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2">
          <Text className="font-semibold">Helpful Links</Text>
          <Text>About Us</Text>
          <Text>FAQ</Text>
          <Text>Contact Us</Text>
        </div>

      </Layout>
    </div>
  );
};