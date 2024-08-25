import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { ValidationError, validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ErrorException } from 'src/config/exception';
type Payload = Array<{
  name: string;
  constraints: Object | null;
  children: Payload | null;
}>;

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      let payload: Payload = [];

      errors.forEach((error) => {
        if (error.children?.length) {
          payload.push({
            name: error.property,
            children: this.validateChildren(error.children),
            constraints: null,
          });
        }

        if (error.constraints) {
          payload.push({
            name: error.property,
            children: null,
            constraints: error.constraints,
          });
        }
      });
      throw new ErrorException(
        'VALIDATION_ERROR',
        'Validation error.',
        payload,
      );
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
  // handle validate nested object, if error has children
  private validateChildren(errors: ValidationError[]) {
    let payload: Payload = [];
    errors.forEach((error) => {
      if (error.children?.length) {
        payload.push(...this.validateChildren(error.children));
      }

      if (error.constraints) {
        payload.push({
          name: error.property,
          constraints: error.constraints,
          children: null,
        });
      }
    });
    return payload;
  }
}
