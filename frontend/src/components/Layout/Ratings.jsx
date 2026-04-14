import { Image } from "./Image";
import { Text } from "./Text";
import YellowStar from "../../assets/YellowStar.png"


export const Ratings = () => {
  const stars = Array(5).fill(0);
  const basicClass = "w-4 h-4"
  return <div className="flex gap-2 items-center ">
    <Text className={"font-bold"}>4.8</Text>
    <div className="flex gap-0.5 items-center">
      {stars.map((_,i) => (
        <Image key={i} src={YellowStar} className={basicClass} />
      ))}
    </div>
    <Text className={"font-light text-xs"}>20(reviews)</Text>
  </div>
}

