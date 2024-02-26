import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
  },
  ticketId: {
    type: String,
    required: true,
  },
  transaction_data: {
    type: Object,
    required: true,
  },
},
{
  timestamps: true,
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
},
);

const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;
