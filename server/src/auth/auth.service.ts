import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password, roles } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      roles,
    });

    const token = this.jwtService.sign({ id: user._id });
    console.log('inside auth.server for signup');
    return { token };
  }

  async forgetPassword(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password, roles } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      roles,
    });

    const token = this.jwtService.sign({ id: user._id });
    console.log('inside auth.server for signup');
    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string; user: any }> {
    // async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    console.log('inside auth.server for login-1');
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }
    console.log('inside auth.server for login-2');
    const token = this.jwtService.sign({ id: user._id });
    console.log('user kaka');
    console.log(user);
    return { token, user };
    // return { token };
  }

  async findById(id: string): Promise<User> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    const book = await this.userModel.findById(id);

    if (!book) {
      throw new NotFoundException('Book not found.');
    }

    return book;
  }
}
