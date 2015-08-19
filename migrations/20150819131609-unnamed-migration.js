'use strict';

module.exports = {
    up: function(migration, DataTypes) {
        migration.createTable(
            'record', {
                record_id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true
                },
                student_id: {
                    type: DataTypes.INTEGER,
                    references: { model: "student", key: "student_id" }
                },
                record_name: DataTypes.STRING
            });
        migration.createTable(
            'student', {
                student_id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true
                },
                name: DataTypes.STRING
            });
        migration.createTable(
            'course', {
                course_id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true
                },
                course_name: DataTypes.STRING
            });
        migration.createTable(
            'schedule', {
                student_id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    references: { model: "student", key: "student_id" }
                },
                course_id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    references: { model: "course", key: "course_id" }
                }
            });
    },

    down: function(migration, DataTypes) {
        migration.dropTable('schedule');
        migration.dropTable('student');
        migration.dropTable('course');
        migration.dropTable('record');
    }
};
