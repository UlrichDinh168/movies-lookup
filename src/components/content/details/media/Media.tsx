import React from 'react';

import { IMAGE_URL } from '../../../../services/movies.service';
import {
  PosterItemType,
  VideoItemType,
  VideoType,
  MediaType
} from '../../../../redux/types';

const Media = ({
  media,
  videos
}: {
  media: MediaType;
  videos: VideoType;
}) => {
  return (
    <>
      <div className="media">
        <div>
          <div className="media-title">Watch Trailer</div>
          <div className="media-videos">
            {videos?.results.map((data: VideoItemType) => (
              <div className="video" key={data.key}>
                <iframe
                  title="Avengers"
                  style={{
                    width: '100%',
                    height: '100%'
                  }}
                  src={`https://www.youtube.com/embed/${data.key}`}
                  allowFullScreen
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="media-title">
            Photos ({media.posters.length})
          </div>
          <div className="media-images">
            {media.posters.map((data: PosterItemType, i: number) => (
              <div
                key={i}
                className="image-cell"
                style={{
                  backgroundImage: `url(${IMAGE_URL}${data.file_path})`
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Media;
