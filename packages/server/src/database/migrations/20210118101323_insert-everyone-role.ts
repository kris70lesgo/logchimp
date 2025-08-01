import { v4 as uuidv4 } from "uuid";

// utils
import logger from "../../utils/logger";

exports.up = (knex) => {
  return knex
    .insert([
      {
        id: uuidv4(),
        name: "@everyone",
        description: "All users",
      },
    ])
    .into("roles")
    .then(() => {
      logger.info({
        code: "DATABASE_SEEDS",
        message: "Insert data: '@everyone' role",
      });
    })
    .catch((err) => {
      logger.error({
        code: "DATABASE_SEEDS",
        message: err.message,
      });
    });
};

exports.down = async (knex) => {
  try {
    await knex("roles").delete().where({
      name: "@everyone",
    });

    logger.info({
      message: "Drop data: '@everyone' role",
    });
  } catch (err) {
    logger.error({
      code: "DATABASE_SEEDS",
      message: err.message,
    });
  }
};
