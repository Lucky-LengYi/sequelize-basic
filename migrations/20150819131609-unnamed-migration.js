'use strict';

module.exports = {
    up: function(migration, DataTypes) {
        migration.createTable(
            'nameOfTheNewTable', {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                attr1: DataTypes.STRING,
                attr2: DataTypes.INTEGER,
                attr3: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false,
                    allowNull: false
                }
            }, {
                engine: 'MYISAM',
                charset: 'latin1'
            }
        );
    },

    down: function(migration, DataTypes) {
        migration.dropTable('demo')
    }
};
