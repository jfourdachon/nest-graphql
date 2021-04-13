import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';

import { closeInMongodConnection, rootMongooseTestModule } from '../test-utils/MongooseTestModule';
import { Lesson, LessonSchema } from './lesson.model';
import { LessonService } from './lesson.service';

describe('SquidService', () => {
  let service: LessonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: Lesson.name, schema: LessonSchema }]),
      ],
      providers: [LessonService],
    }).compile();

    service = module.get<LessonService>(LessonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /**
    Write meaningful test
  **/

  afterAll(async () => {
    await closeInMongodConnection();
  });
});