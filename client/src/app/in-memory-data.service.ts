import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Member } from './member';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const members = [
      { id: 1, name: 'Dr Nice',status:1 },
      { id: 2, name: 'Narco',status:0 },
      { id: 3, name: 'Bombasto',status:0 },
      { id: 4, name: 'Celeritas',status:0 },
      { id: 5, name: 'Magneta',status:0 },
      { id: 6, name: 'RubberMan',status:0 },
      { id: 7, name: 'Dynama',status:0 },
      { id: 8, name: 'Dr IQ',status:0 },
      { id: 9, name: 'Magma',status:0 },
      { id: 10, name: 'Tornado',status:0 }
    ];
    return {members};
  }


  genId(members: Member[]): number {
    return members.length > 0 ? Math.max(...members.map(hero => hero.id)) + 1 : 11;
  }
}