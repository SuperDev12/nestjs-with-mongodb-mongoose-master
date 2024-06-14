import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { CreateUserDto } from './dto/CreateUser.dto';

describe('UsersService', () => {
  let service: UsersService;
  let userModel: typeof User;

  const mockUserModel = {
    findAll: jest.fn().mockResolvedValue([{ id: '1', name: 'Test User' }]),
    create: jest.fn().mockResolvedValue({ id: '1', name: 'New User' }),
    findOne: jest.fn().mockResolvedValue({ id: '1', name: 'Test User' }),
    update: jest.fn().mockResolvedValue([1, [{ id: '1', name: 'Updated User' }]]),
    destroy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userModel = module.get<typeof User>(getModelToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of users', async () => {
    const result = await service.findAll();
    expect(result).toEqual([{ id: '1', name: 'Test User' }]);
  });

  it('should create a new user', async () => {
    const createUserDto: CreateUserDto = {
        displayName: 'New User',
        username: ''
    };
    const result = await service.createUser(createUserDto);
    expect(result).toEqual({ id: '1', name: 'New User' });
  });

  it('should return a single user by id', async () => {
    const result = await service.findOne('1');
    expect(result).toEqual({ id: '1', name: 'Test User' });
  });

  it('should update a user', async () => {
    const user: User = { id: '1', name: 'Updated User' } as unknown as User;
    const result = await service.update('1', user);
    expect(result).toEqual([1, [{ id: '1', name: 'Updated User' }]]);
  });

  it('should delete a user', async () => {
    const spy = jest.spyOn(service, 'findOne').mockResolvedValueOnce({ id: '1', destroy: jest.fn() } as any);
    await service.delete('1');
    expect(spy).toHaveBeenCalledWith('1');
  });
});
