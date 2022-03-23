import {Deserializable} from './deserialize';
import {Crop, ICrop} from './crop';
import {Coordinates} from './coordinates';
import {LCFirst} from '../helpers/string-utils';
import {ConvertDateFormat} from '../helpers/moment';

export type allowedKeys =
  'description'
  | 'crop'
  | 'thumbnail'
  | 'orientation'
  | 'name'
  | 'focalLengthIn35mmFilm'
  | 'fNumber'
  | 'categories'
  | 'focalLength'
  | 'digitized'
  | 'location'
  | 'place_id'
  | 'make'
  | 'model'
  | 'private'
  | 'tag'
  | 'coordinates'
  | 'iso'
  | 'lensSpecification'
  | 'lensModel';

export interface IExIf {
  description?: string;
  crop?: ICrop;
  categories?: string[];
  orientation?: number;
  focalLengthIn35mmFilm?: number;
  fNumber?: number;
  focalLength?: number;
  digitized?: string;
  make?: string;
  model?: string;
  thumbnail?: string;
  location?: string[];
  place_id?: number;
  width?: number;
  height?: number;
  iso?: number[];
  private?: boolean;
  tag?: string[];
  price?: number;
  coordinates?: Coordinates;
  lensSpecification?: string[];
  lensModel?: string[];
}

export class ExIf implements IExIf, Deserializable {
  description?: string;
  crop?: ICrop;
  categories?: string[];
  orientation?: number;
  focalLengthIn35mmFilm?: number;
  fNumber?: number;
  focalLength?: number;
  digitized?: string;
  make?: string;
  model?: string;
  thumbnail?: string;
  location?: string[];
  place_id?: number;
  width?: number;
  height?: number;
  iso?: number[];
  private?: boolean;
  tag?: string[];
  price?: number;
  coordinates?: Coordinates;
  lensSpecification?: string[];
  lensModel?: string[];

  deserialize(input: any) {
    if (input) {
      for (const key in input) {
        if (input.hasOwnProperty(key)) {
          this.setProperty(LCFirst(key), input[key]);
        }
      }
      if (input.GPSLatitude && input.GPSLongitude) {
        this.setProperty('coordinates', new Coordinates().deserialize({
          type: 'Point',
          coordinates: [
            input.GPSLongitude,
            input.GPSLatitude
          ]
        }));
      }
      if (input.coordinates) {
        this.setProperty('coordinates', new Coordinates().deserialize(input.coordinates));
      }
      if (input.DateTimeDigitized) {
        this.setProperty('digitized', ConvertDateFormat(input.DateTimeDigitized));
      }
      if (input.crop) {
        this.setProperty('crop', new Crop().deserialize(input.crop));
      }
      if (input.lensSpecification) {
        if (!Array.isArray(input.lensSpecification)) {
          input.lensSpecification = [input.lensSpecification];
        }
        this.setProperty('lensSpecification', input.lensSpecification);
      }
      if (input.lensModel) {
        if (!Array.isArray(input.lensModel)) {
          input.lensModel = [input.lensModel];
        }
        this.setProperty('lensModel', input.lensModel);
      }
      if (input.iso) {
        if (!Array.isArray(input.iso)) {
          input.iso = [input.iso];
        }
        this.setProperty('iso', input.iso);
      }
    }
    return this;
  }

  setProperty(key: allowedKeys, value: any, toString = false) {

    const allowedKeys$: allowedKeys[] = [
      'description',
      'categories',
      'crop',
      'name',
      'thumbnail',
      'orientation',
      'focalLengthIn35mmFilm',
      'fNumber',
      'focalLength',
      'digitized',
      'location',
      'place_id',
      'make',
      'model',
      'private',
      'tag',
      'iso',
      'coordinates',
      'lensSpecification',
      'lensModel'
    ];

    if (allowedKeys$.includes(key)) {
      // @ts-ignore
      this[key] = (toString && value) ? value.toString() : value;
    }
  }
}
