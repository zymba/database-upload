import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const repository = await transactionsRepository.findOne(id);

    if (!repository) {
      throw new AppError('Transação não encontrada');
    }

    await transactionsRepository.remove(repository);
  }
}

export default DeleteTransactionService;
