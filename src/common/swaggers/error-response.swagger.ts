import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiResponseOptions } from '@nestjs/swagger';

export type IParameterApiErrorResponse = {
  errorCode: string;
  message: string;
  options?: ApiResponseOptions;
};

type apiResponseArrayType = [status: number, payload: Record<string, any>];

export const ApiErrorResponse = (param: IParameterApiErrorResponse[]) => {
  const uniqueHttpStatus = handleUniqueHttpStatus(param);

  const apiResponseArray: apiResponseArrayType[] = [];
  for (const status in uniqueHttpStatus) {
    apiResponseArray.push([Number(status), uniqueHttpStatus[status]]);
  }

  const result = apiResponseArray.map((item) => {
    const status = item[0];
    const examples = item[1];

    return ApiResponse({
      status,
      content: {
        'application/json': {
          examples,
        },
      },
    });
  });

  return applyDecorators(...result);
};

// Get the unique status httpCode and save the payload in same status httpCode
function handleUniqueHttpStatus(param: IParameterApiErrorResponse[]) {
  const uniqueHttpStatus: { key: string; value: object } | object = {};

  param.forEach((item) => {
    const status = Number(item.errorCode.split('|')[1]);
    const errorCode = item.errorCode.split('|')[0];

    const payload = {
      [errorCode]: {
        value: {
          result: false,
          message: item.message,
          errorCode,
          data: null,
        },
      },
    };

    if (!uniqueHttpStatus[status]) uniqueHttpStatus[status] = payload;
    else uniqueHttpStatus[status] = { ...uniqueHttpStatus[status], ...payload };
  });

  return uniqueHttpStatus;
}
