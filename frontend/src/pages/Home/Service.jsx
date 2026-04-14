import { Text } from "../../components/Layout/Text"

export const Service = ({children,textOne,textTwo}) => {
  return <div className="flex flex-col items-center justify-center shrink-0 px-3 md:border-r">
    {children}
    <Text className={"md:text-sm text-xs font-semibold"}>{textOne}</Text>
    <Text className={"md:text-xs text-xs"}>{textTwo}</Text>
  </div>
}