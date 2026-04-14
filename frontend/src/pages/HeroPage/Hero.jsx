import { Button } from "../../components/Layout/Button"
import { Image } from "../../components/Layout/Image"
import { Text } from "../../components/Layout/Text"
import Final from "../../assets/FinalMain.png"





export const Hero = () => {
  return <div className="md:h-[80vh] h-[50vh] relative ">
    <Image src={Final} className={" h-full w-full object-cover  "}/>
    <div className="absolute inset-0 flex flex-col bg-black/30 justify-center items-center px-4 gap-2 ">
      
        <Text className={"md:text-5xl text-3xl text-White-100 font-semibold tracking-tight "}>
          Find Your Joy in Nature
        </Text>
      
        <Text className={"md:text-2xl text-sm text-White-100 font-light tracking-tight"}>
          Discover handpicked stays in the heart of wilderness
        </Text>
      <div className="md:py-4 py-1">
        <Button size={"lg"}>Explore Stays</Button>
      </div>
    </div>
  </div>
}