'use client'

import Image from "next/image";
import {useInView} from "react-intersection-observer";
import React, {useEffect, useState} from "react";
import {fetchAnime} from "@/app/server/action";
import AnimeCard from "@/components/AnimeCard";

export type AnimeCard = React.JSX.Element

let page = 2
function LoadMore() {
  const {ref, inView} = useInView();
  const [data, setData] = useState<AnimeCard[]>([]);

  useEffect(() => {
      if(inView){
          fetchAnime(page).then((res) => {
              setData([...data, ...res])
              page++
          })
      }
  }, [inView, data]);

  return (
      <>
          <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
              {...data}
          </section>
          <section className="flex justify-center items-center w-full">
              <div ref={ref}>
                  <Image
                      src="./spinner.svg"
                      alt="spinner"
                      width={56}
                      height={56}
                      className="object-contain"
                  />
              </div>
          </section>
      </>
  );
}

export default LoadMore;
