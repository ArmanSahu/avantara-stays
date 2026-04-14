import { Layout } from "../../components/Layout/Layout"
import { Service } from "./Service"
import Secure from "../../assets/secure.png"
import Price from "../../assets/Price.png"
import TwentyFour from "../../assets/24-7.png"
import { Text } from "../../components/Layout/Text"
import { Image } from "../../components/Layout/Image"


export const Services = () => {

  const imageClass = "md:w-7 md:h-7 w-5 h-5"

  return <div className="py-4">
    <Layout className={"flex justify-center"}>
      <div className="flex overflow-x-auto gap-4 bg-Green-400 px-4 py-4 md:px-20 rounded-2xl no-scrollbar">
        <Service textOne={"Reviews"} textTwo={"Across India"}>
          <Text className={"md:text-2xl text-xl font-bold"}>100+</Text>
        </Service>
         <Service textOne={"24/7 Support"} textTwo={"We are here"}>
          <Image src={TwentyFour} className={imageClass}/>
        </Service>
         <Service textOne={"Best Price"} textTwo={"Guaranteed"}>
          <Image src={Price} className={imageClass}/>
        </Service>
         <Service textOne={"Secure Booking"} textTwo={"Hasle Free"}>
          <Image src={Secure} className={imageClass}/>
        </Service>
      </div>
    </Layout>
  </div> 
    
}