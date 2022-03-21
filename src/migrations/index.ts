import databaseMigration from "./database-initialization.migration";

export default async () => {
  await databaseMigration();
};
