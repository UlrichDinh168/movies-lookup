import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux';

import Slideshow from '../slideShow/SlideShow';
import Paginate from '../paginate/Paginate';
import Grid from '../grid/Grid';
import { IMAGE_URL } from '../../../services/movies.service';
import {
  getMovies,
  setResponsePageNumber
} from '../../../redux/movie';

export type ImageObjType = {
  id: number;
  url: string;
};

const MainContent = () => {
  const { page, totalPages, list, movieType } = useSelector(
    (state: RootState) => state.movie
  );

  const [currentPage, setCurrentPage] = useState(page);
  const [images, setImages] = useState<ImageObjType[]>([]);
  // The slice() method with no arguments creates a shallow copy of the array, which you can then sort and slice without modifying the original array.
  // Else sort() method is returning a read-only array that cannot be modified by the slice() method.
  const randomMovies = list
    ?.slice()
    .sort(() => Math.random() - Math.random())
    .slice(0, 4);

  const HEADER_TYPE: { [key: string]: string } = {
    now_playing: 'Now Playing',
    popular: 'Popular',
    top_rated: 'Top Rated',
    upcoming: 'Upcoming'
  };

  useEffect(() => {
    if (randomMovies?.length) {
      const IMAGES: ImageObjType[] = [
        {
          id: 1,
          url: `${IMAGE_URL}${randomMovies[0].backdrop_path}`
        },
        {
          id: 2,
          url: `${IMAGE_URL}${randomMovies[1].backdrop_path}`
        },
        {
          id: 3,
          url: `${IMAGE_URL}${randomMovies[2].backdrop_path}`
        },
        {
          id: 4,
          url: `${IMAGE_URL}${randomMovies[3].backdrop_path}`
        }
      ];
      setImages(IMAGES);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setCurrentPage(page);
    // eslint-disable-next-line
  }, [page, totalPages]);

  const paginate = (type: string) => {
    let pageNumber = currentPage;
    if (type === 'prev' && currentPage >= 1) {
      pageNumber -= 1;
    } else {
      pageNumber += 1;
    }
    setCurrentPage(pageNumber);
    setResponsePageNumber(pageNumber, totalPages);
    getMovies(movieType, pageNumber);
  };

  return (
    <div className="main-content">
      <Slideshow images={images} auto={true} showArrows={true} />
      <div className="grid-movie-title">
        <div className="movieType">{HEADER_TYPE[movieType]}</div>
        <div className="paginate">
          <Paginate
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
          />
        </div>
      </div>
      <Grid />
    </div>
  );
};

export default MainContent;
