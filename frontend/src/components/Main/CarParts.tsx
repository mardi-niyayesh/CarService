//img
import BMW from "../../../assets/BMW.png"
import Honda from "../../../assets/Honda.png"
import Hyundai from "../../../assets/Hyundai.png"
import KIA1 from "../../../assets/KIA (1).png"
import KIA2 from "../../../assets/KIA (2).png"
import KIA from "../../../assets/KIA.png"
import Marcedes from "../../../assets/Marcedes.png"
import Nissan from "../../../assets/Nissan.png"
import Toyota from "../../../assets/Toyota.png"
import lexus from "../../../assets/lexus-logo.png"
const CarParts = () => {
  return (
    <div>
      <div className="flex items-center justify-between mt-8">
        <img src={BMW} alt="BMW" />
        <img src={Honda} alt="Honda" />
        <img src={Hyundai} alt="Hyundai" />
        <img src={KIA1} alt="KIA1" />
        <img src={KIA2} alt="KIA2" />
        <img src={KIA} alt="KIA" />
        <img src={Marcedes} alt="Marcedes" />
        <img src={Nissan} alt="Nissan" />
        <img src={Toyota} alt="Toyota" />
        <img src={lexus} alt="lexus" />
      </div>
    </div>
  );
};

export default CarParts;
