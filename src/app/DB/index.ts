import config from "../config";
import { USER_ROLE } from "../modules/user/user.constant";
import { UserModel } from "../modules/user/user.model";

const superAdmin = {
    id: 'SA01',
    email: 'sakhawat.showrav@gmail.com',
    password: config.super_admin_password,
    needsPasswordChange: false,
    role: USER_ROLE.superAdmin,
    status: 'in-progress',
    isDeleted: false,
};

const seedSuperAdmin = async () => {
    //create super admin
    const isSuperAdminExist = UserModel.findOne({role : USER_ROLE.superAdmin});
    if(!isSuperAdminExist){
        await UserModel.create(superAdmin)
    };
};

export default seedSuperAdmin;