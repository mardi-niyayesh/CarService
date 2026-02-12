import CarParts from "./CarParts";
import WhyAutoRent from "./WhyAutoRent";
import Slider from "./Slider";
import ReserveAutorent from "./ReserveAutorent";
import FeacherBoxcommentUser from "../comment/FeacherBoxcommentUser";
import ComponentQuestion from "./ComponentQuestion/ComponentQuestion";

const MainSite = () => {
  return (
    <>
      <CarParts />
      <WhyAutoRent />
      <Slider />
      <ReserveAutorent />
      <ComponentQuestion />
      <FeacherBoxcommentUser />
    </>
  );
};

export default MainSite;
