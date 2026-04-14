import { Text } from "../Layout/Text"

export const Field = ({label,placeholder}) => {
  return <div className="flex flex-col gap-2">
    <Text className={"text-Green-700 font-semibold lg:text-base"}>{label}</Text>
    <input placeholder={placeholder}  className="border-none bg-White-100 px-3 md:py-2 py-1 outline-none placeholder:text-sm rounded-lg placeholder:text-Green-700/40"></input>
  </div>
}
