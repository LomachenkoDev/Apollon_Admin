import { Schema, models, model } from "mongoose";

export interface IBooking {
  roomId: Schema.Types.ObjectId;
  clientId: Schema.Types.ObjectId;
  fromDate: Date;
  toDate: Date;
  totalDays: number;
  totalAmount: number;
}
const BookingSchema = new Schema<IBooking>(
  {
    roomId: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    clientId: { type: Schema.Types.ObjectId, ref: "Client", required: true },
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
    totalDays: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

const Booking = models.Booking || model<IBooking>("Booking", BookingSchema);

export default Booking;
