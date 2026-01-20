import { Injectable, Query } from '@nestjs/common';
import { WordQuery } from '@en/common/word';
import { ResponseService } from '@lib/shared/response/response.service';
import { PrismaService } from '@lib/shared/prisma/prisma.service';
@Injectable()
export class WordBookService {
  constructor(private readonly response: ResponseService, private readonly prisma: PrismaService) {}
  create(body: { word: string }) {
    return 'This action adds a new wordBook';
  }

  findAll(query: WordQuery) {
    return this.response.success(this.prisma.wordBook.findMany({
      // where: {
      //   word: {
      //     contains: query.word,
      //   },
      // },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
      orderBy: {
        createdAt: 'desc',
      },
    }));
  }

  findOne(id: number) {
    return `This action returns a #${id} wordBook`;
  }

  update(id: number, body: { word: string }) {
    return `This action updates a #${id} wordBook`;
  }

  remove(id: number) {
    return `This action removes a #${id} wordBook`;
  }
}
