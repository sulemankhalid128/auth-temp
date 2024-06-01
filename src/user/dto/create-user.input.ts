import { InputType, Field } from '@nestjs/graphql';
import { Role, UserRole } from '../entities/role.entity';

@InputType()
export class CreateUserInput {

  @Field({ nullable: false })
  fullName: string;

  @Field({nullable:false})
  email: string;

  @Field({nullable:false})
  password: string;


  @Field({ nullable: true })
  phoneNumber: string;

  @Field(() => UserRole, { nullable: true })
  role: UserRole;

}
