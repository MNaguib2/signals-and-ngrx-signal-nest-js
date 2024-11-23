import { Schema } from 'mongoose';

export const IncrementCounter = (
  schema: Schema,
  options: { field: string; counterName: string },
) => {
  const { field, counterName } = options;

  schema.pre('save', async function (next) {
    if (this.isNew && !this[field]) {
      try {
        const CounterModel = this.db.model('Counter');
        const counter = await CounterModel.findOneAndUpdate(
          { name: counterName },
          { $inc: { seq: 1 } },
          { new: true, upsert: true },
        );
        this[field] = counter.seq;
        next();
      } catch (error) {
        next(error);
      }
    } else {
      next();
    }
  });
};
