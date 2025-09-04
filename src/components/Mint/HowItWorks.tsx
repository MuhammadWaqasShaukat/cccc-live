import { A11y, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const HowItWorks = () => {
  return (
    <>
      <div className="flex flex-col items-center ">
        <div className=" font-black absolute top-[70px]  font-patrick-hand-sc text-3xl">
          <span>How It Works</span>
        </div>

        <Swiper
          className=" md:hidden flex h-full custom-pagintaion"
          modules={[Pagination, A11y]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
        >
          <SwiperSlide className="h-dvh w-dvw flex flex-col justify-center items-center pt-4">
            <div className=" bg-tutorial-label-step-1 aspect-square h-20 w-20 bg-no-repeat bg-contain z-10"></div>
            <div className="bg-tutorial-step-1 bg-contain bg-no-repeat aspect-[240/314] w-[80%] -mt-8 "></div>
          </SwiperSlide>
          <SwiperSlide className="h-dvh w-dvw flex flex-col justify-center items-center pt-4">
            <div className=" bg-tutorial-label-step-2 aspect-square h-20 w-20 bg-no-repeat bg-contain z-10"></div>
            <div className="bg-tutorial-step-2 bg-contain bg-no-repeat aspect-[240/314] w-[80%] -mt-8 "></div>
          </SwiperSlide>
          <SwiperSlide className="h-dvh w-dvw flex flex-col justify-center items-center pt-4">
            <div className=" bg-tutorial-label-step-3 aspect-square h-20 w-20 bg-no-repeat bg-contain z-10"></div>
            <div className="bg-tutorial-step-3 bg-contain bg-no-repeat aspect-[240/314] w-[80%] -mt-8 "></div>
          </SwiperSlide>
          <SwiperSlide className="h-dvh w-dvw flex flex-col justify-center items-center pt-4">
            <div className=" bg-tutorial-label-step-4 aspect-square h-20 w-18 bg-no-repeat bg-contain z-10"></div>
            <div className="bg-tutorial-step-4 bg-contain bg-no-repeat aspect-[240/363] w-[70%] -mt-8 "></div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="relative md:block hidden">
        <div className="bg-tutorial-step-1 -rotate-6 bg-contain bg-no-repeat xl:w-[30%]  md:w-[28%] absolute -left-[10%] aspect-[240/314] max-w-60">
          <div className=" relative h-full w-full">
            <div className=" bg-tutorial-label-step-1 aspect-square w-[35%] max-h-24 max-w-24 bg-no-repeat bg-contain absolute -left-[10%] -top-[10%] rotate-12"></div>
          </div>
        </div>
        <div className="bg-tutorial-step-2 rotate-6 bg-contain bg-no-repeat xl:w-[30%]  md:w-[28%] absolute left-[18%] top-[120px] aspect-[240/314] max-w-60">
          <div className=" relative h-full w-full">
            <div className=" bg-tutorial-label-step-2 aspect-square w-[35%] max-h-24 max-w-24 bg-no-repeat bg-contain absolute -left-[10%] -top-[10%] -rotate-6"></div>
          </div>
        </div>
        <div className="bg-tutorial-step-3 bg-contain -rotate-6 bg-no-repeat xl:w-[30%]  md:w-[28%] absolute left-[40%]  top-[20px] aspect-[240/314] max-w-60">
          <div className=" relative h-full w-full">
            <div className=" bg-tutorial-label-step-3 aspect-square w-[35%] max-h-24 max-w-24 bg-no-repeat bg-contain absolute -left-[10%] -top-[10%] -rotate-6"></div>
          </div>
        </div>
        <div className="bg-tutorial-step-4 bg-contain rotate-12 bg-no-repeat xl:w-[30%] md:w-[28%] absolute left-[69%] top-[80px] aspect-[238/363] max-w-60 ">
          <div className=" relative h-full w-full">
            <div className=" bg-tutorial-label-step-4 aspect-square w-[35%] max-h-24 max-w-24 bg-no-repeat bg-contain absolute -left-[5%] -top-[14%] rotate-12"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
