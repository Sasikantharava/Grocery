import mongoose from 'mongoose';

const walletTransactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['credit', 'debit'],
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  balance: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  reference: {
    type: String,
    required: true
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },
  metadata: mongoose.Schema.Types.Mixed
}, {
  timestamps: true
});

const walletSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  balance: {
    type: Number,
    default: 0,
    min: 0
  },
  transactions: [walletTransactionSchema],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Add transaction method
walletSchema.methods.addTransaction = function(transactionData) {
  const { type, amount, description, reference, order, metadata } = transactionData;
  
  // Calculate new balance
  let newBalance = this.balance;
  if (type === 'credit') {
    newBalance += amount;
  } else if (type === 'debit') {
    if (amount > this.balance) {
      throw new Error('Insufficient wallet balance');
    }
    newBalance -= amount;
  }

  // Create transaction
  const transaction = {
    type,
    amount,
    balance: newBalance,
    description,
    reference,
    order,
    metadata
  };

  this.transactions.push(transaction);
  this.balance = newBalance;

  return this.save();
};

// Get transaction history with pagination
walletSchema.methods.getTransactionHistory = function(page = 1, limit = 10) {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const transactions = this.transactions
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(startIndex, endIndex);

  const total = this.transactions.length;
  const totalPages = Math.ceil(total / limit);

  return {
    transactions,
    currentPage: page,
    totalPages,
    totalTransactions: total,
    hasNext: page < totalPages,
    hasPrev: page > 1
  };
};

// Check if sufficient balance exists
walletSchema.methods.hasSufficientBalance = function(amount) {
  return this.balance >= amount;
};

// Get current balance
walletSchema.methods.getBalance = function() {
  return this.balance;
};

// Static method to get wallet by user ID
walletSchema.statics.findByUserId = function(userId) {
  return this.findOne({ user: userId });
};

// Index for efficient queries
walletSchema.index({ user: 1 });
walletSchema.index({ 'transactions.createdAt': -1 });

export default mongoose.model('Wallet', walletSchema);