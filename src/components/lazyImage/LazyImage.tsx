import React, { useState, useEffect, ReactNode } from 'react';

import placeHolder from '/assets/lazy_loader.gif';

type LazyImageType = {
  src: string;
  children: ReactNode;
  className: string;
};
const LazyImage = (props: LazyImageType) => {
  const { src, children, className } = props;
  const [imageSrc, setImageSrc] = useState(placeHolder);
  const [imageRef, setImageRef] = useState<HTMLDivElement | null>(
    null
  );

  useEffect(() => {
    let observer: IntersectionObserver;
    let didCancel = false;

    if (imageRef && imageSrc !== src) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (
                !didCancel &&
                (entry.intersectionRatio > 0 || entry.isIntersecting)
              ) {
                setImageSrc(src);
                observer.unobserve(imageRef);
              }
            });
          },
          {
            threshold: 0.01,
            rootMargin: '75%'
          }
        );
        observer.observe(imageRef);
      } else {
        setImageSrc(src);
      }
    }

    return () => {
      didCancel = true;
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef as Element);
      }
    };
  }, [src, imageSrc, imageRef]);

  return (
    <>
      <div
        className={className}
        ref={setImageRef}
        style={{
          backgroundImage: `url(${imageSrc})`
        }}
      >
        {children}
      </div>
    </>
  );
};

export default LazyImage;
