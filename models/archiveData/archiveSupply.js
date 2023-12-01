import { Schema, model, models } from "mongoose";

const archiveSupplySchema = new Schema({
    supplyId: {
        type: Schema.Types.ObjectId,
      },
      supplyName: {
        type: String,
      },
      availableStock: {
        type: Number,
      },
      productPrice: {
        type: Number,
      },
      deletedAt: {
        type: Date,
      },
})

const archiveSupply = models.archiveSupply || model("archiveSupply", archiveSupplySchema);

export default archiveSupply;