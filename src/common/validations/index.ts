import { ValidationChain, param, body } from 'express-validator';

export const validationRules = (route: string): ValidationChain[] => {
  let output: ValidationChain[];
  
  switch (route) {
    case 'one': 
      output = [param('mobile', 'Invalid mobile number').isString().isLength({ min: 10, max: 15 })];
      break;

    case 'save': 
      output = [
        body('username', 'Username is required').isString().notEmpty(),
        body('mobile_number', 'Invalid mobile number').isString().isLength({ min: 10, max: 15 })
      ];
      break;

    default:
      output = [];
  }
  
  return output;
};