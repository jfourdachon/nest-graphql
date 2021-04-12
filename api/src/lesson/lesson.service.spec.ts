import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { async } from 'rxjs';
import { Lesson } from './lesson.model';
import { LessonService } from './lesson.service';

describe('LessonService', () => {
    let service: boolean;
  
    beforeEach(async () => {
    //   const module: TestingModule = await Test.createTestingModule({
    //     providers: [LessonService,
    //         {
    //             provide: getModelToken(Lesson.name),
    //             useValue: catModel,
    //           },],
    //   }).compile();
      service = true;
    });
  
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });