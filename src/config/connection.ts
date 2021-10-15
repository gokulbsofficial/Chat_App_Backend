import mongoose, { ConnectOptions } from "mongoose";
import config from "./default";
import logger from "./logger";

const { MONGOOSE_URL, MONGOOSE_USER } = config.MONGOOSE;

const MONGOOSE_OPTIONS: ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};
const NAMESPACE = "MONGOOSE";

const connect = async () => {
  try {
    const conn = await mongoose.connect(MONGOOSE_URL, MONGOOSE_OPTIONS);
    logger.info(
      NAMESPACE,
      `MONGOOSE DATABASE:[${conn.connection.name}] connected in HOST:[${conn.connection.host}]-PORT:[${conn.connection.port}] by USER:[${MONGOOSE_USER}]`
    );
  } catch (error: any) {
    logger.error(NAMESPACE, error.message, error);
    process.exit(1);
  }
};

export default { connect };
