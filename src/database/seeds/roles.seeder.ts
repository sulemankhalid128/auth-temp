

import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { Role, UserRole } from "../../user/entities/role.entity";


 const roles = [
    {
      role: UserRole.ADMIN,
    },
    {
      role: UserRole.OPERATOR,
    },
    {
      role: UserRole.SUPER_ADMIN,
    },
  ];

  export default class RolesSeeder implements Seeder {
    public async run(dataSource: DataSource): Promise<void> {
      const repository = dataSource.getRepository(Role);

      for(const role of roles){
        const currentRole = await repository.findOneBy({role:role.role})
        if(!currentRole){
          const roleCreated =  await repository.save(role)
          console.log(roleCreated)
        }
      }
    }}