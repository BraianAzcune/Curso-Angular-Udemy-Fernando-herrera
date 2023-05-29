import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  // mongo crea el _id
  _id: string;

  @Prop({ default: false })
  isActive: boolean;
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true, minlength: 6 })
  password?: string;
  @Prop({ required: true })
  name: string;
  // redundancia, pero bueno...
  @Prop({ type: [String], default: ['user'] })
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
