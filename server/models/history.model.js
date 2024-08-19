const mongoose = require("mongoose");

const historySchema = mongoose.Schema(
    {
        from: {
            type: String,
        },
        to: {
            type: String,
        },
        amount: {
            type: Number,
        },
        outgoing_user: mongoose.Schema.Types.Mixed,
        incoming_user: mongoose.Schema.Types.Mixed,
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model("History", historySchema);
