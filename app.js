var Sequelize = require('sequelize');
var sequelize = new Sequelize('TWDemo', 'root', 'root');

var Student = sequelize.define('student', {
    student_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: Sequelize.STRING
}, {
    freezeTableName: true,
    timestamps: false
});

var Record = sequelize.define('record', {
    record_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    record_name: Sequelize.STRING
}, {
    freezeTableName: true,
    timestamps: false
});

var Course = sequelize.define('course', {
    course_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    course_name: Sequelize.STRING
}, {
    freezeTableName: true,
    timestamps: false
});

// var Schedule = sequelize.define('schedule', {
//     student_id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true
//     },
//     course_id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true
//     },
// }, {
//     freezeTableName: true,
//     timestamps: false
// });

Record.hasOne(Student, {
    foreignKey: 'record_id'
});

Student.belongsToMany(Course, {
    through: 'Schedule',
    foreignkey: 'student_id'
});

Course.belongsToMany(Student, {
    through: 'Schedule',
    foreignkey: 'course_id'
});

sequelize.sync({
    force: true
}).then(function() {
    return Record.create({
        record_id: 1,
        name: 'sam'
    });
}).then(function () {
    return Course.create({
        course_id:1,
        course_name: '音乐'
    });
}).then(function() {
    return Course.update({
        course_name: '美术'
    }, {
        where: {
            course_id:1
        }
    });
}).then(function() {
    return Course.findAll({
        where: {
            course_id: 1
        }
    }).then(function(item) {
        console.log(item[0].dataValues);
    });
});
