import location from "../../assets/location.png";
import iconLocation from "../../assets/locationnn.png";

const ContactPage = () => {
  return (
    <>
      <div className="bg-[url('../../assets/page.png')] bg-cover bg-center bg-no-repeat w-full min-h-[250px] md:min-h-[400px] lg:min-h-[550px] xl:h-[683px] relative"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
        <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12 py-8 md:py-12 lg:py-16">
          <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6 md:space-y-8">
            <div className="text-[#494949] text-xl md:text-2xl lg:text-3xl font-bold relative pb-3 inline-block">
              ارتباط با دفتر مرکزی اتورنت
              <span className="absolute bottom-0 right-0 w-1/2 h-1 bg-[#494949] rounded"></span>
            </div>

            <div className="flex items-start gap-3">
              <img
                src={iconLocation}
                alt="iconLocation"
                className="w-5 h-5 md:w-6 md:h-6 mt-1 flex-shrink-0"
              />
              <div className="flex flex-wrap items-start gap-1">
                <span className="text-[#494949] font-medium whitespace-nowrap">
                  آدرس:
                </span>
                <span className="text-[#9A9A9A] text-sm md:text-base">
                  تهران، میدان آزادی، خیابان آزادی، خیابان شادمان، پلاک 23
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <img
                src={iconLocation}
                alt="iconLocation"
                className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0"
              />
              <div className="flex flex-wrap items-center gap-1">
                <span className="text-[#494949] font-medium whitespace-nowrap">
                  شماره تماس:
                </span>
                <span className="text-[#9A9A9A] text-sm md:text-base" dir="ltr">
                  02166552589
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <img
                src={iconLocation}
                alt="iconLocation"
                className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0"
              />
              <div className="flex flex-wrap items-center gap-1">
                <span className="text-[#494949] font-medium whitespace-nowrap">
                  ایمیل:
                </span>
                <span className="text-[#9A9A9A] text-sm md:text-base">
                  info@AutoRent.com
                </span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-2/5 flex items-stretch">
            <img
              src={location}
              alt="location map"
              className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
