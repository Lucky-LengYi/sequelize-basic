var Sequelize = require('sequelize');

var sequelize = new Sequelize('TWDemo', 'root', 'vermouth');

var Student = sequelize.define('Student', {
    name: Sequelize.STRING,
    sex: {
        type: Sequelize.ENUM('male', 'female')
    }
});

var Class = sequelize.define('Class', {
    className: Sequelize.STRING
});

var Course = sequelize.define('Course', {
    CourseName: Sequelize.STRING
});

var record = sequelize.define('record', {
    recordId: Sequelize.INTEGER
});


Class.hasMany(Student, {
    foreignkey: 'student_pk'
});

record.hasOne(Student, {
    foreignKey: 'student_record'
});

Student.belongsToMany(Course, {
    through: 'student_has_course',
    foreignkey: 'student_course_id'
});

Course.belongsToMany(Student, {
    through: 'student_has_course',
    foreignkey: 'course_student_id'
});

sequelize.sync().then(function() {
    return Student.create({
        name: 'John',
        sex: 'male'
    }).then(function(student) {
        console.log(student.get('name'));
        console.log(student.get('sex'));
        return student;
    }).then(function(student) {
        Student.update({
            sex: 'female'
        }, {
            where: {
                id: 3
            }
        })
    }).then(function() {
        Student.destroy({
            where: {
                id: 5
            }
        })
    })
});
