import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

export enum UserRole {
    SUPER_ADMIN = 'super-admin',
    ADMIN = 'admin',
    OPERATOR = 'operator',
  }
  registerEnumType(UserRole, {
    name: 'userRoles',
    description: 'The user role assigned',
  });

@Entity('roles')
@ObjectType()
export class Role {
    @PrimaryGeneratedColumn('uuid')
    @Field()
    id: string;
  
    @Column({
      type: 'enum',
      enum: UserRole,
      default: UserRole.ADMIN,
    })
    @Field(() => UserRole)
    role: UserRole;

    @CreateDateColumn({ type: 'timestamptz' })
    @Field()
    createdAt: string;
  
    @UpdateDateColumn({ type: 'timestamptz' })
    @Field()
    updatedAt: string;  

    @ManyToMany(() => User, (user)=> user.roles)
    users:User[]
}