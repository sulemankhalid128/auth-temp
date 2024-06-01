import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../user/entities/user.entity';
import { Role, UserRole } from '../../user/entities/role.entity';

export default class UsersSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(User);
    const roleRepository = dataSource.getRepository(Role);
    const superAdminRole = await roleRepository.findOneBy({ role: UserRole.SUPER_ADMIN });
    const operatorRole = await roleRepository.findOneBy({ role: UserRole.OPERATOR });
    const password = await bcrypt.hash('Super123!', await bcrypt.genSalt());
    const users = [
      {
        fullName: 'Ahmad Jon',
        email: 'ahmad@gmail.com',
        password: password,
        phoneNumber:'434524345',
        roles:[operatorRole]
      },
      {
        fullName: 'Waseem Meth',
        email: 'waseemmeth@gmail.com',
        password: password,
        phoneNumber:'434524345',
        roles:[operatorRole]
      },
      {
        fullName: 'Suleman khalid',
        email: 'suleman@gmail.com',
        password: password,
        phoneNumber:'434524345',
        roles:[superAdminRole]
      },
    ];
    for (const user of users) {
      const userEntry = await repository.findOneBy({ fullName: user.fullName });
      if (!userEntry) {
        await repository.save(user);
      }
    }

    console.log('>>>>>>>>>>>>>>>>>>>>>>>>> UPDATED USERS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  }
}
