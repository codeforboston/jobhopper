export default class DataHelper {
  /**
   * Take an input number and ensure that all percentages are similarly formatted. All input numbers must be < 100, that is, already in percentage form.
   * @param input number
   * @param precision_digits number of digits to right of decimal place, between 0-20
   */
  static transformNumber(input: number, precision_digits: number) {
    // protect from numbers too long
    // protect from inputs that are invalid
    if (
      input > 100 ||
      input < 0 ||
      input == null ||
      precision_digits < 0 ||
      precision_digits > 20 ||
      precision_digits == null
    ) {
      return NaN;
    }
    return Number.parseFloat(input.toFixed(precision_digits));
  }
}
