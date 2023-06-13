import { useSelector } from "react-redux";
import BookingModal from "../BookingModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";

const Booking = ({ spot }) => {
  const user = useSelector((state) => state.session.user);

  const style = () => {
    if (user && user.id !== spot.ownerId) return null;
    else
      return {
        backgroundColor: "#ababab",
      };
  };

  return (
    <div className="booking">
      <p>
        <span>${Number(spot.price).toFixed(0)} </span> night
      </p>

      <p>
        <i className="fa-solid fa-star" style={{ color: "#808080" }} />
        {spot.avgStarRating
          ? `${Number(spot.avgStarRating).toFixed(1)} • ${
              spot.numReviews
            } review${Number(spot.numReviews) !== 1 ? "s" : ""}`
          : "New"}
      </p>

      <button style={{ ...style() }}>
        {user && user.id !== spot.ownerId ? (
          <OpenModalMenuItem
            itemText="Reserve"
            modalComponent={<BookingModal spot={spot} />}
          />
        ) : user && user.id === spot.ownerId ? (
          <p>Cannot Reserve Own Spot</p>
        ) : (
          <p>Must be Logged In to Reserve</p>
        )}
      </button>
    </div>
  );
};

export default Booking;
