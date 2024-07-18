import { Injectable } from '@nestjs/common';
import { ConcertRepository } from '../interfaces/concert.repository.interface';
import {
  ConcertModel,
  ConcertOptionsModel,
  ConcertOptionsRoomModel,
} from '../models/concert.model';
import { ConcertOptionsRepository } from '../interfaces/concertOptions.repository.interface';
import { ConcertOptionsRoomRepository } from '../interfaces/concertOptionsRoom.repository.interface';

@Injectable()
export class ConcertService {
  constructor(
    private readonly concertRepository: ConcertRepository,
    private readonly concertOptionsRepository: ConcertOptionsRepository,
    private readonly concertOptionsRoomRepository: ConcertOptionsRoomRepository,
  ) {}

  async getAvailableDates(): Promise<string[]> {
    return await this.concertRepository.findAllDates();
  }

  async getAvailableSeats(date: string): Promise<string[]> {
    return await this.concertRepository.findSeatsByDate(date);
  }

  async updateSeats(date: string, seats: string[]): Promise<ConcertModel> {
    return await this.concertRepository.updateSeats(date, seats);
  }
}
