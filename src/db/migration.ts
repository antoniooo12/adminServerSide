import fs from 'fs';
import path from 'path';
import sequelize, {DataTypes} from 'sequelize';
import Migration from './model/_Migration';
import {db} from './dbSequelize';
import {readDir} from "../services/hellpers";

const logger = console;
const migrationsPath = path.join(__dirname, 'migrations');

export async function runMigrations() {
  const queryInterface = db.getQueryInterface();

  await queryInterface.createTable('_migrations', {
    filename: DataTypes.STRING,
    appliedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('NOW'),
      allowNull: false
    }
  });

  logger.debug(`Scan folder "${migrationsPath}" for migrations`, {scope: 'migrations'});
  const [list, migrations] = await Promise.all([
    readDir(migrationsPath),
    Migration.findAll()
  ]);
  console.log(list)
  console.log(migrations)
  // @ts-ignore
  for (const file of list) {
    if (!(file.match(/\.js$/) || file.match(/\.ts$/))) {
      continue;
    }
    const appliedMigration = migrations.find((migration) => migration.filename === file);
    if (appliedMigration) {
      logger.debug(`Migration "${file}" was applied at ${appliedMigration.appliedAt}`, {scope: 'migrations'});
      continue;
    }
    logger.debug(`Migration "${file}" applying...`, {scope: 'migrations'});
    const {up, down} = require(path.join(migrationsPath, file));

    if (!up || !down) {
      throw new Error(`Invalid migration functions in file ${file}`);
    }
    await up(queryInterface, DataTypes);
    await Migration.create({filename: file, appliedAt: Date.now()})

  }

}

// @ts-ignore
export async function revertMigration(name) {
  const migrationFile = path.join(migrationsPath, name);
  logger.debug(`Reverting "${migrationFile}"...`, {scope: 'migrations'});

  const migration = await Migration.findOne({
    where: {filename: name}
  });
  if (!migration) {
    throw new Error(`Migration "${name}" not applied`);
  }

  const {up, down} = require(migrationFile);

  if (!up || !down) {
    throw new Error(`Invalid migration functions in file ${migrationFile}`);
  }
  await down(db.getQueryInterface(), DataTypes);
  await migration.destroy();
}
