'use client';

import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import { useRef } from 'react';

interface SomeProps {
  sliderRef: React.RefObject<SwiperRef | null>;
}

const StepButtonContainer = ({ sliderRef }: SomeProps) => {
  const prevClickHandler = () => {
    sliderRef!.current!.swiper.slidePrev();
  };

  const nextClickHandler = () => {
    sliderRef!.current!.swiper.slideNext();
  };

  return (
    <div>
      <button onClick={prevClickHandler}>{'<-'}</button>
      <button onClick={nextClickHandler}>{'->'}</button>
    </div>
  );
};

const SwiperDemo = () => {
  const sliderRef = useRef<SwiperRef>(null);
  const sliderRef2 = useRef<SwiperRef>(null);

  //   paging
  const paginationRef = useRef(null);
  const pagination = {
    clickable: true,
    renderBullet: (index: number, className: string) => {
      return `<span class="cursor-pointer ${className}">${index + 1}</span>`;
    },
  };

  return (
    <section>
      <h1>Swiper</h1>
      <div>
        <Swiper
          ref={sliderRef}
          //   spaceBetween={50}
          modules={[Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          slidesPerView={1}
          loop={true}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
        </Swiper>
        <StepButtonContainer sliderRef={sliderRef} />
      </div>

      <article>
        <Swiper direction={'vertical'} className="max-h-[200px]">
          <SwiperSlide className="max-h-[200px]">Slide 1</SwiperSlide>
          <SwiperSlide className="max-h-[200px]">Slide 2</SwiperSlide>
          <SwiperSlide className="max-h-[200px]">Slide 3</SwiperSlide>
          <SwiperSlide className="max-h-[200px]">Slide 4</SwiperSlide>
        </Swiper>
        <StepButtonContainer sliderRef={sliderRef} />
      </article>

      <article>
        <div>
          <Swiper
            ref={sliderRef2}
            pagination={pagination}
            modules={[Pagination]}
            className="mySwiper"
            onBeforeInit={(swiper) => {
              // 여기서 ref를 swiper pagination에 연결
              setTimeout(() => {
                if (
                  swiper?.params?.pagination &&
                  typeof swiper.params.pagination !== 'boolean'
                ) {
                  swiper.params.pagination.el = paginationRef.current;
                }
              }, 0);
            }}
          >
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide>
          </Swiper>
        </div>
        <div className="swiper-custom-pagination" ref={paginationRef}></div>
      </article>
    </section>
  );
};

export default SwiperDemo;
