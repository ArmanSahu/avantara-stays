import { Button } from "../../components/Layout/Button"
import { Layout } from "../../components/Layout/Layout"
import { Text } from "../../components/Layout/Text"



export const SectionHeader = () => {
  return <div className="py-4">
      <Layout>
        <div className="flex justify-between items-center gap-3">
          <div className="flex flex-col items-start justify-center md:gap-1 gap-0.5">
            <Text className={"md:text-4xl text-2xl text-Green-700 font-semibold tracking-tight"}>Featured Stays</Text> 
            <Text className={"md:text-base text-base text-Green-700 font-medium tracking-tight"}>Discover your next stay in nature</Text>
          </div>
          <div>
            <Button size={"md"}>View Details</Button>
          </div>
        </div>
      </Layout>
    </div>
}