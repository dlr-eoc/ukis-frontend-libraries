import { StatusInfo, DataOutputType, Result } from './wps_2.0';


export const isStatusInfo = (obj: object): obj is StatusInfo => {
  return obj.hasOwnProperty('jobID')
    && obj.hasOwnProperty('status');
};

export const isDataOutputType = (obj: object): obj is DataOutputType => {
  return obj.hasOwnProperty('id') &&
    (obj.hasOwnProperty('data') || obj.hasOwnProperty('reference') || obj.hasOwnProperty('output'));
};

export const isResult = (obj: object): obj is Result => {
  return (obj.hasOwnProperty('output') && typeof obj['output'] === 'object');
};
