module.exports = class UserDto {
    userId;
    name;
    profile;
    constructor(user) {
        this.userId = user.dataValues.id;
        this.name = user.dataValues.name;
        this.profile = user.dataValues.profilePhoto;
    }
};
