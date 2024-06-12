import { ConflictException, HttpException, HttpStatus, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role, UserRole } from './entities/role.entity';
import { LoginInput, UserLoginDTO } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo:Repository<User>,
    @InjectRepository(Role) private readonly roleRepo:Repository<Role>,
    private readonly jwtService: JwtService,

  ){

  }
 async create(createUserInput: CreateUserInput) :Promise<UserLoginDTO> {
  try {
    const {email, role,...result} = createUserInput;
    const emailExist = await this.userRepo.findOneBy({email})
    if(emailExist){
      throw new ConflictException('Email Already Exist!')
    }
    const currentRole = role ? await this.findRole(role): await this.findRole(UserRole.OPERATOR)
    const user = await this.userRepo.save({
      ...result,
      roles:[currentRole],
      email
    })
    const token = this.jwtService.sign({userId:user.id, email:user.email});
    return {userId:user?.id, token, email:user?.email, roles:user?.roles?.map(item => item?.role)}
  } catch (error) {
    throw new InternalServerErrorException(error);
  }
   
  }

  async verifyJwt(token: string): Promise<UserLoginDTO> {
    try {
      const secret: UserLoginDTO = await this.jwtService.verify(token);
      const user = await this.userRepo.findOne({where:{id:secret?.userId}});
      return {
        ...secret,
        roles: user.roles.map(role => role.role),
      };
    } catch (exception) {
      throw new InternalServerErrorException(exception);
    }
  }

  async findRole (role:string){
    return await this.roleRepo.findOneBy({role:UserRole[role.toUpperCase()]})
  }

  async login (loginInput:LoginInput):Promise<UserLoginDTO>{
    const {email, password} = loginInput
    const userExist = await this.userRepo.findOneBy({email})
    if(!userExist || !bcrypt.compareSync(password, userExist.password)){
      throw new UnauthorizedException("User name or password don't match")
    }
    const {id, email:userEmail, fullName, roles} = userExist
    const token = this.generateToken({id:userExist?.id,email:userEmail, fullName })
    return {token, email, roles: roles.map(role =>role?.role), userId:id }
  }

  generateToken({id, email, fullName}){
    try {
      return this.jwtService.sign({userId:id, email, fullName});
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string):Promise<User> {
   const user = await this.userRepo.findOne({where:{id}})
   if(!user) throw new HttpException('User not Found!', HttpStatus.NOT_FOUND)
   return user
  }

 

 
}
