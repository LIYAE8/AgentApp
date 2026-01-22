import { Injectable, Query } from '@nestjs/common';
import { WordQuery } from '@en/common/word';
import { ResponseService } from '@lib/shared/response/response.service';
import { PrismaService } from '@lib/shared/prisma/prisma.service';
import { Prisma } from '@lib/shared/generated/prisma/client';

@Injectable()
export class WordBookService {
  constructor(private readonly response: ResponseService, private readonly prisma: PrismaService) { }

  private toBoolean(value: string | boolean): boolean | undefined {
    return value === 'true' ? true : undefined;
  }

  create(body: { word: string }) {
    return 'This action adds a new wordBook';
  }

  async findAll(query: WordQuery) {
    const { pageSize, page, word, ...rest } = query;
  
    // 整理标签参数（gk/zk/...），把 'true'/'false' 转成 boolean
    const tags = Object.fromEntries(
      Object.entries(rest).map(([key, value]) => [key, this.toBoolean(value as any)])
    );
  
    const where: Prisma.WordBookWhereInput = {
      // 关键词搜索：同时支持英文单词 和 中文释义
      ...(word
        ? {
            OR: [
              {
                word: {
                  contains: word,
                  mode: 'insensitive', // 英文不区分大小写
                },
              },
              {
                translation: {
                  contains: word, // 中文包含匹配
                },
              },
            ],
          }
        : {}),
      ...tags,
    };
  
    const [total, list] = await Promise.all([
      this.prisma.wordBook.count({ where }),
      this.prisma.wordBook.findMany({
        where,
        skip: (Number(page) - 1) * Number(pageSize),
        take: Number(pageSize),
        orderBy: {
          frq: 'desc',
        },
      }),
    ]);
  
    return this.response.success({ total, list });
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
