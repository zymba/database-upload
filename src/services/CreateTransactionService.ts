import { getRepository, getCustomRepository } from 'typeorm';
// import AppError from '../errors/AppError';

import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import Category from '../models/Category';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const categoriesRepository = getRepository(Category);

    let categoryExists = await categoriesRepository.findOne({
      where: { title: category },
    });

    if (!categoryExists) {
      const newCategory = categoriesRepository.create({
        title: category,
      });
      await categoriesRepository.save(newCategory);
      categoryExists = newCategory;
    }

    const transaction = transactionsRepository.create({
      title,
      value,
      type,
      category_id: categoryExists.id,
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
