import { Button } from "../../components/Layout/Button";
import { Image } from "../../components/Layout/Image"
import { Ratings } from "../../components/Layout/Ratings";
import { Text } from "../../components/Layout/Text";
import TreeHouse from "../../assets/TreeHouse.jpeg";
import Rupee from "../../assets/rupee.png"


export const PropertyCard = () => {
  return <div className="rounded-xl overflow-hidden shadow-gray-600 shadow-md md:w-96 w-80 ">
    <div className="aspect-[5/3]">
      <Image src={TreeHouse} className={"w-full h-full object-cover"}/>
    </div>
    <div className="px-5 bg-Green-400 py-4 flex flex-col gap-0.5">
      <Text className={"font-bold -tracking-tight text-lg"}>The Forest Edge</Text>
      <Text className={"font-medium text-base"}>Deomali,Koraput</Text>
      <Ratings/>
    </div>
    <div className="py-3 px-3 md:py-5 md:px-5 flex justify-between items-center ">
      <div className="flex items-center">
        <Image src={Rupee} className={"w-5 h-5 md:h-8 md:w-8"}/>
        <Text className={" text-base  md:text-2xl font-bold"}>6500/night</Text>
      </div>
      <Button size={"sm"}>View Details</Button>
    </div>
  </div>
}