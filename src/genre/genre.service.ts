import { Injectable } from '@nestjs/common';
import CreateGenreDto from './dto/create-genre.dto';
import GenreEntity from '../db/entity/genre.entity';

@Injectable()
export default class GenreServices {
  async insert(genreDetails: CreateGenreDto): Promise<GenreEntity> {

    const genreEntity: GenreEntity = GenreEntity.create();
    const {type} = genreDetails;

    genreEntity.type = type;
    await GenreEntity.save(genreEntity);
    return genreEntity;
  }
  async getAllGenre(): Promise<GenreEntity[]> {
    return await GenreEntity.find();
  }

  async delete(genreID : number): Promise<GenreEntity> {
    const genre : GenreEntity = await GenreEntity.findOne({where : {id: genreID}});
    await GenreEntity.delete(genreID);
    return genre;
  }

  async modify(genreID: number, genreDetails: CreateGenreDto) : Promise<GenreEntity> {
    const existingGenre : GenreEntity = await GenreEntity.findOne({id: genreID});
    if (genreDetails.type)
      existingGenre.type = genreDetails.type;
    await existingGenre.save();
    return existingGenre;
  }
}