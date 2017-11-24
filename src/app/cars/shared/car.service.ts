import { Injectable } from '@angular/core';
import { Car } from '../car';
import { Pagination } from '../../core/pagination';

@Injectable()
export class CarService {

  constructor() { }

  index(params?: any): Promise<{data: Car[], meta: {pagination: Pagination}}> {
    if (localStorage.getItem('cars') === null) {
      localStorage.setItem('cars', JSON.stringify([
        {
          id: this.uuid(),
          fuel: 'Flex',
          image: null,
          brand: 'Volkswagem',
          model: 'Gol',
          board: 'FFF-5498',
          value: '20000',
        },
        {
          id: this.uuid(),
          fuel: 'Gasolina',
          image: null,
          brand: 'Volkswagem',
          model: 'Fox',
          board: 'FOX-4125',
          value: '20000',
        },
        {
          id: this.uuid(),
          fuel: 'Alcool',
          image: 'http://carros.ig.com.br/fotos/2010/290_193/Fusca2_290_193.jpg',
          brand: 'Volkswagem',
          model: 'Fusca',
          board: 'PAI-4121',
          value: '20000',
        }
      ]));
    }

    return new Promise((resolve, reject) => {
      let cars = JSON.parse(localStorage.getItem('cars'));

      if (params.search) {
        cars = cars.filter(value =>
          value.model.toLowerCase().startsWith(params.search.toLowerCase()) ||
          value.model.toLowerCase().endsWith(params.search.toLowerCase()) ||
          value.brand.toLowerCase().startsWith(params.search.toLowerCase()) ||
          value.brand.toLowerCase().endsWith(params.search.toLowerCase()) ||
          value.board.toLowerCase().startsWith(params.search.toLowerCase()) ||
          value.board.toLowerCase().endsWith(params.search.toLowerCase()) ||
          value.fuel && value.fuel.toLowerCase().startsWith(params.search.toLowerCase()) ||
          value.fuel && value.fuel.toLowerCase().endsWith(params.search.toLowerCase()) ||
          value.value && value.value.toLowerCase().startsWith(params.search.toLowerCase()) ||
          value.value && value.value.toLowerCase().endsWith(params.search.toLowerCase())
        );
      }

      const pagination = {
        total: cars.length,
        per_page: 5,
        current_page: params.page || 1,
        total_pages: Math.ceil(cars.length / 5),
      };
      const current_page = pagination.current_page - 1;

      resolve({
        data: cars.slice(current_page * pagination.per_page, (current_page + 1) * pagination.per_page),
        meta: {pagination: pagination}
      });
    });
  }

  store(data: any): Promise<Car> {
    return new Promise((resolve, reject) => {
      data.board = data.board.toUpperCase();
      const cars = JSON.parse(localStorage.getItem('cars'));
      const index = cars.findIndex(value => value.board === data.board);
      if (index === -1) {
        data.id = this.uuid();
        cars.unshift(data);
        localStorage.setItem('cars', JSON.stringify(cars));
        resolve(data);
      } else {
        reject({
          title: 'Carro já cadastrado!',
          message: 'Esta placa já está em uso, digite outra por favor!'
        });
      }
    });
  }

  update(data: any, id: string): Promise<Car> {
    return new Promise((resolve, reject) => {
      data.board = data.board.toUpperCase();
      data.id = id;
      const cars = JSON.parse(localStorage.getItem('cars'));
      const hasBoard = cars.findIndex(value => value.id !== id && value.board === data.board);

      if (hasBoard === -1) {
        const index = cars.findIndex(value => value.id === id);
        cars[index] = data;
        localStorage.setItem('cars', JSON.stringify(cars));
        resolve(data);
      } else {
        reject({
          title: 'Carro já cadastrado!',
          message: 'Esta placa já está em uso, digite outra por favor!'
        });
      }
    });
  }

  destroy(data: Car[]) {
    return new Promise((resolve, reject) => {
      const cars = JSON.parse(localStorage.getItem('cars'));
      data.forEach(function (car) {
        const index = cars.findIndex(value => value.id === car.id);
        cars.splice(index, 1);
      });
      localStorage.setItem('cars', JSON.stringify(cars));
      resolve(JSON.parse(localStorage.getItem('cars')));
    });
  }

  private uuid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
}
