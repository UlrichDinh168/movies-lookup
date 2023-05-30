import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { IMAGE_URL } from '../../../../services/movies.service';
import {
  CrewItemType,
  secondaryDetailsType
} from '../../../../redux/types';

const Crew = ({ name, crew }: { name: string, crew: secondaryDetailsType }) => {
  return (
    <>
      <div className="cast">
        <div className="div-title">Crew</div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th className="head">Department</th>
              <th className="head">Job</th>
            </tr>
          </thead>
          {crew.crew.map((data: CrewItemType) => (
            <tbody key={uuidv4()}>
              <tr>
                <td>
                  <img
                    src={
                      data.profile_path
                        ? `${IMAGE_URL}${data.profile_path}`
                        : 'http://placehold.it/54x81'
                    }
                    alt=""
                  />
                </td>
                <td>{data.name}</td>
                <td>{data.department}</td>
                <td>{data.job}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
};

export default Crew;
