'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

export default function PreviewImage(props: ImageProps) {
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <div className="relative w-[500px] h-[300px]">
      {/* 로딩중일 때 보여줄 프리뷰 */}
      {isLoading && !isError && (
        <Image
          src={
            'https://m.switchs.co.kr/web/product/big/202303/a429abd3b01ea983738ab857c58bea83.png'
          }
          alt="프리뷰"
          fill={props.fill}
          width={props.width}
          height={props.height}
        />
      )}

      {/* 실제 이미지 */}
      <Image
        {...props}
        onError={(e) => setIsError(true)}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </div>
  );
}
