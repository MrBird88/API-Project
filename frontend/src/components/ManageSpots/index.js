import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import "./ManageSpots.scss";
import { getUserSpots } from "../../store/spot";
import SpotCard from "../SpotCard";

const ManageSpots = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getUserSpots(user)).then(() => setIsLoaded(true));
  }, [dispatch, user]);

  const spots = useSelector((state) => state.spots.userSpots);

  return (
    <div className="manage-spots">
      {isLoaded &&
        Object.values(spots).map((spot) => (
          <div key={spot.id}>
            <NavLink className={"spot-card-link"} to={`/spots/${spot.id}`}>
              <SpotCard spot={spot} />
            </NavLink>

            <div className="manage-buttons">
              <button>Update</button>

              <button>Delete</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ManageSpots;
