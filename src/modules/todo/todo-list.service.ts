import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoRepository } from 'src/commons/repositories/todo/todo.repositories';

export interface IReqQueryTodo {
  sort_key: string;
  sort_value: string;
  page: number;
  limit: number;
  id: string;
  name: string;
  is_done: boolean;
  begin_created_at: string;
  end_created_at: string;
}

@Injectable()
export class TodosListService {
  constructor(
    @InjectRepository(TodoRepository)
    private readonly todoRepository: TodoRepository,
  ) {}

  async list(reqQuery: IReqQueryTodo) {
    const sort_key = reqQuery.sort_key || 'id';
    const sort_value = reqQuery.sort_value || 'asc';
    const page = reqQuery.page ? Number(reqQuery.page) : 1;
    const limit = reqQuery.limit ? Number(reqQuery.limit) : 10;

    const repository = this.todoRepository
      .createQueryBuilder('p')
      .select(['p.id', 'p.name', 'p.description', 'p.is_done', 'p.created_at']);

    if (reqQuery.id) {
      repository.andWhere('p.id = :id', {
        id: reqQuery.id,
      });
    }

    if (reqQuery.name) {
      repository.andWhere('p.name = :name', {
        name: reqQuery.name,
      });
    }

    if (reqQuery.is_done) {
      repository.andWhere('p.is_done = :is_done', {
        is_done: reqQuery.is_done,
      });
    }

    if (reqQuery.begin_created_at && reqQuery.end_created_at) {
      repository.andWhere(
        'p.created_at::date >= :begin and p.created_at::date <= :end',
        {
          begin: reqQuery.begin_created_at,
          end: reqQuery.end_created_at,
        },
      );
    }

    let total = 0;
    repository.orderBy(
      `p.${sort_key}`,
      (sort_value as string).toUpperCase() as any,
    );
    repository.skip((page - 1) * limit);
    repository.take(limit);

    total = await Object.assign(repository).getCount();

    let data = null;
    try {
      data = await repository.getMany();
    } catch (e) {
      console.log(e);
      throw new HttpException(
        { message: 'Terjadi kesalahan' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      page: page,
      limit: limit,
      pages: Math.ceil(total / limit),
      total,
      data: data,
    };
  }
}
