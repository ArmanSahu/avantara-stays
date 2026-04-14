import { Hero } from "./Hero"
import { PropertyList } from "./PropertyList"
import { SectionHeader } from "./SectionHeader"
import { Services } from "./Services"



export const Home = () => {
  return <div className="flex flex-col h-full md:gap-10 gap-7 ">
    <Hero />
    <SectionHeader />
    <PropertyList />
    <Services />
  </div>
}
