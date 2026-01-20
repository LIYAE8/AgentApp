import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { WordBookService } from './word-book.service';
import type { WordQuery } from '@en/common/word';
@Controller('word-book')
export class WordBookController {
  constructor(private readonly wordBookService: WordBookService) { }

  // @Post()
  // create(@Body() body: { word: string }) {
  //   return this.wordBookService.create({word: body.word});
  // }

  @Get()
  async findAll(@Query() query: WordQuery) {
    this.wordBookService.findAll(query)
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.wordBookService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() body: { word: string }) {
  //   return this.wordBookService.update(+id, {word: body.word});
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.wordBookService.remove(+id);
  // }
}
