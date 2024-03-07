import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AddressLink from "./AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return " ";
  }

  return (
    <div className="my-8">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
      <div className="flex justify-between bg-gray-200 p-6 my-6 rounded-2xl items-center">
        <div>
        <h2 className="text-xl">Your Booking Information:</h2>
        <BookingDates booking={booking} />
        </div>
        <div className="bg-primary rounded-2xl text-white p-6 text-center">
            <div>Total Price: </div>
            <div className="text-3xl">${booking.price}</div>
            
        </div>
      </div>

      <PlaceGallery place={booking.place} />
    </div>
  );
}
