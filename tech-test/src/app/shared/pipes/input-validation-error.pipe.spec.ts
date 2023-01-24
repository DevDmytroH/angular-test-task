import { InputValidationErrorPipe } from './input-validation-error.pipe';

describe('InputValidationErrorPipe', () => {
  it('create an instance', () => {
    const pipe = new InputValidationErrorPipe();
    expect(pipe).toBeTruthy();
  });
});
