import { Layout } from "../../components/Layout/Layout"
import { PropertyCard } from "./PropertyCard"

export const PropertyList = () => {
  return <div>
    <Layout className={"flex flex-col lg:flex-row md:justify-between justify-center items-center md:gap-9 gap-5 "}>
     <PropertyCard />
     <PropertyCard />
     <PropertyCard />
    </Layout>
  </div>
}