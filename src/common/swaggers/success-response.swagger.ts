import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiResponse,
  ApiResponseOptions,
  getSchemaPath,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

/**
 * 
 * @param model 
 * @returns 
 * {
  "result": true,
  "message": "Successfully",
  "data": {}
}
 */
export const ApiSuccessResponse = <TModel extends Type<any>>(
  model?: TModel,
) => {
  return applyDecorators(
    ApiExtraModels(model),
    ApiOkResponse({
      schema: {
        properties: {
          result: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Successfully' },
          data: { $ref: getSchemaPath(model) },
        },
      },
    }),
  );
};

/**
 * 
 * @param model 
 * @returns 
 * {
  "result": true,
  "message": "Successfully",
  "data": [
    {}, 
    {}
  ]
}
 */
export const ApiSuccessResponseWithArray = <TModel extends Type<any>>(
  model?: TModel,
) => {
  return applyDecorators(
    ApiExtraModels(model),
    ApiOkResponse({
      schema: {
        properties: {
          result: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Successfully' },
          data: {
            items: { $ref: getSchemaPath(model) },
          },
        },
      },
    }),
  );
};

/**
 * 
 * @param model 
 * @returns 
 * {
  "result": true,
  "message": "Successfully",
  "data": null
}
*/
export const ApiSuccessResponseWithDataIsNull = (
  options?: ApiResponseOptions,
) => {
  return applyDecorators(
    ApiResponse({
      ...options,
      schema: {
        properties: {
          result: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Successfully' },
          data: { type: 'null', example: null },
        },
      },
    }),
  );
};

class DefaultUseCheckExistAdditionalModel {}
export const ApiSuccessPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
  additionalInfoModel: Type<any> = DefaultUseCheckExistAdditionalModel,
  options?: ApiResponseOptions,
) => {
  return applyDecorators(
    ApiExtraModels(
      model,
      additionalInfoModel.name !== DefaultUseCheckExistAdditionalModel.name &&
        additionalInfoModel,
    ),
    ApiOkResponse({
      ...options,
      schema: {
        properties: {
          result: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Successfully' },
          data: {
            properties: {
              items: {
                items: { $ref: getSchemaPath(model) },
              },
              pageSize: {
                type: 'number',
                example: 20,
              },
              pageIndex: {
                type: 'number',
                example: 1,
              },
              totalItems: {
                type: 'number',
                example: 50,
              },
              totalPages: {
                type: 'number',
                example: 3,
              },
              hasPrevPage: {
                type: 'boolean',
                example: false,
              },
              hasNextPage: {
                type: 'boolean',
                example: true,
              },
              additionalInfo:
                additionalInfoModel.name !==
                DefaultUseCheckExistAdditionalModel.name
                  ? {
                      $ref: getSchemaPath(additionalInfoModel as Type<any>),
                    }
                  : {
                      example: null,
                      nullable: true,
                    },
            },
          },
        },
      },
    }),
  );
};

/**
 * 
 * @param model 
 * @returns 
 * {
  "result": true,
  "message": "Successfully",
  "data": true
}
*/
export const ApiSuccessResponseWithDataIsTrue = (
  options?: ApiResponseOptions,
) => {
  return applyDecorators(
    ApiResponse({
      ...options,
      schema: {
        properties: {
          result: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Successfully' },
          data: { type: 'boolean', example: true },
        },
      },
    }),
  );
};

/**
 * 
 * @param model 
 * @returns 
 * {
  "result": false,
  "message": "Record not found",
  "data": null,
  "errorCode": "RECORD_NOT_FOUND",
}
*/
export const ApiDataNotFoundResponse = (options?: ApiResponseOptions) => {
  return applyDecorators(
    ApiNotFoundResponse({
      ...options,
      schema: {
        properties: {
          result: { type: 'boolean', example: false },
          message: { type: 'string', example: 'Record not found' },
          data: { type: 'boolean', example: null },
          errorCode: { type: 'string', example: 'RECORD_NOT_FOUND' },
        },
      },
    }),
  );
};
