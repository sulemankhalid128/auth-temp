import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { CurrentUser, LoginInput, UserLoginDTO } from './dto/login-user.dto';
import { Public } from './auth/public.decorator';
import { AuthUser } from './decorators/graphql-user.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Mutation(() => UserLoginDTO)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput):Promise<UserLoginDTO> {
    return await this.userService.create(createUserInput);
  }

  @Public()
  @Mutation(() => UserLoginDTO)
  async login(@Args('login') loginInput:LoginInput) {
    return await this.userService.login(loginInput);
  }

  @Query(() => User, { name: 'findUser' })
  async findOneUser(@Args('id', { type: () => String }) id: string) {
    return await this.userService.findOne(id);
  }

/**
 * 
 * @param user 
 * @returns User detail
 */
  @Query(() => User, { name: 'me' })
  async me(@AuthUser() user:CurrentUser) {
    return await this.userService.findOne(user.userId);
  }

//   @Mutation(() => User)
//  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
//     return await this.userService.upsdate(updateUserInput.id, updateUserInput);
//   }

//   @Mutation(() => User)
//   async removeUser(@Args('id', { type: () => String }) id: string) {
//     return await this.userService.remove(id);
//   }
}
