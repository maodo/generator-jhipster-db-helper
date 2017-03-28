// utility functions for generator-jhipster-db-helper


/**
 * TODOS :
 * - write proper JsDoc
 * - create an ensemble unit test
 * - replace 'console.log' with 'this.log'
 * Don't forget to run eslint !
 */


const chalk = require('chalk');
const replace = require('replace');
const fs = require('fs');
const generator = require('yeoman-generator');


// This module replaces Spring naming strategies with other strategies (to prevent renaming entities)
// The following assumes that the pertinent configuration files are there and with these current naming strategy.
// this is true with jhipster v4.1.1
const filesWithNamingStrategyPaths = [
    './pom.xml',
    './src/main/resources/config/application.yml',
    './src/test/resources/config/application.yml',
    './node_modules/generator-jhipster/generators/server/templates/gradle/_liquibase.gradle',
    './node_modules/generator-jhipster/generators/server/templates/src/main/resources/config/_application.yml',
    './node_modules/generator-jhipster/generators/server/templates/src/test/resources/config/_application.yml'
];

// physical naming strategies
const physicalNamingStrategyOld = 'org.springframework.boot.orm.jpa.hibernate.SpringPhysicalNamingStrategy';
const physicalNamingStrategyNew = 'org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl';

// implicit naming strategies
const implicitNamingStrategyOld = 'org.springframework.boot.orm.jpa.hibernate.SpringImplicitNamingStrategy';
const implicitNamingStrategyNew = 'org.hibernate.boot.model.naming.ImplicitNamingStrategyJpaCompliantImpl';

// return true for a non-empty string
const isTrueString = x => (typeof x === 'string' && x !== '');

module.exports = {

    // use this function as a DEBUG logger
    debugLog(pString) {
        if (isTrueString(pString)) {
            console.log(chalk.bold.green(`DBH-DEBUG: ${pString}`));
        } else {
            // log obvious, shameful mistake
            console.log(chalk.bold.red('debugLog : bad parameter !'));
            console.log(chalk.red(`pString : type = ${typeof pString}, value = ${pString}`));
        }
    },

    // use this function to WARN the user
    warnLog(pString) {
        if (isTrueString) {
            console.log(chalk.bold.red(`DBH-WARN: ${pString}`));
        } else {
            // log obvious, shameful mistake
            console.log(chalk.bold.red('warnLog : bad parameter !'));
            console.log(chalk.red(`pString : type = ${typeof pString}, value = ${pString}`));
        }
    },

    // test if Spring naming strategies are replaced by our naming strategies
    // return a boolean
    // TODO : write unit test
    namingStrategiesReplaced() {
        console.log(chalk.bold.red('getEntityNameVariations NOT IMPLEMENTED YET !'));
        return false;
    },

    // return an object with the entity name and all variants :
    //   name, tableName, entityTableName, etc
    // TODO : write unit test
    getEntityNameVariations(pEntityName) {
        console.log(chalk.bold.red('getEntityNameVariations NOT IMPLEMENTED YET !'));
        return false;
    },

    // replace Spring naming strategies with more neutral ones
    // return true if all occurrences are replaced
    //
    // note : after running this function, reference to the ancient naming strategies will still be found in :
    // ./node_modules/generator-jhipster/generators/server/templates/_pom.xml:
    // however this doesn't concern us
    //
    // TODO : write local test for the return value
    // TODO : write unit test
    replaceNamingStrategies() {
        // grab our files from the global space
        const files = filesWithNamingStrategyPaths;

        const physicalOld = physicalNamingStrategyOld;
        const physicalNew = physicalNamingStrategyNew;

        const implicitOld = implicitNamingStrategyOld;
        const implicitNew = implicitNamingStrategyNew;

        // check that each file exists
        files.forEach((path) => {
            if (fs.existsSync(path)) {
                console.log(`File ${chalk.cyan(path)} exists`);
            } else {
                // note : 'throw' ends the function here
                throw new Error(`${path} doesn't exist!`);
            }
        });

        // replace the files :

        // 1) replace Spring physical naming strategy
        replace({
            regex: physicalOld,
            replacement: physicalNew,
            paths: files,
            recursive: false,
            silent: true,
        });

        // 2) replace Spring implicit naming strategy
        replace({
            regex: implicitOld,
            replacement: implicitNew,
            paths: files,
            recursive: false,
            silent: true,
        });

        return false;
    }
};