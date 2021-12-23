import mongoose, { ConnectOptions } from "mongoose";
import config from "./default";
import logger from "./logger";

const { MONGO_URI, MONGO_USER } = config.MONGO;

const MONGOOSE_OPTIONS: ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};
const NAMESPACE = "MONGODB_CONFIG";

const connect = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, MONGOOSE_OPTIONS);
    logger.info(
      NAMESPACE,
      `MONGO DB DATABASE [${conn.connection.name}] connected in HOST [${conn.connection.host}] PORT [${conn.connection.port}] by USER [${MONGO_USER}]`
    );
  } catch (error: any) {
    logger.error(NAMESPACE, error.message, error);
    process.exit(1);
  }
};

export default { connect };
