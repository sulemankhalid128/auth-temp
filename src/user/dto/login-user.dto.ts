import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Role } from "../entities/role.entity";


@ObjectType()
export class UserLoginDTO{

    @Field({nullable:false})
    userId:string

    @Field({nullable:false})
    token:string

    @Field({nullable:false})
    email:string

    @Field(()=> [String],{nullable:false})
    roles:string[]

}


@InputType()
export class LoginInput{
    @Field({nullable:false})
    email:string 

    @Field({nullable:false})
    password:string 
}