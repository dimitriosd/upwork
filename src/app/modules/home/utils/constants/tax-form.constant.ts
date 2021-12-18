export const taxFormConstant: any = {
  userNameMessages: {
    requiredMsg: 'Username is required',
    minlengthMsg: 'Minimum 3 characters required'
  },
  countryMessages: {
    invalidCountry: 'Country does not exist'
  },
  countriesConfig: {
    'United States': {
      taxIdMask: '0000-SSS-0000099',
      regexp: '^\\d{4}[a-zA-Z]{3}(\\d{5}|\\d{7})$',
      message: 'For USA it must be [4 digits]-[3 letters]-[5 or 7 digits]',
      placeholder: 'e.g 1234-AAA-12345'
    },
    'Canada': {
      taxIdMask: 'AAAAAAAAAA-SS',
      regexp: '^(\\d|[a|b|d|A|B|D]){10}([a-zA-Z]{2})$',
      message: 'For Canada it must be [10 symbols digits or letters A,B or D]-[2 letters]',
      placeholder: 'e.g 1234-AAA-12345'
    },
    default: {
      taxIdMask: '0000000000',
      regexp: '^\\d{10}$',
      message: 'Tax id must be [10 symbols digits]',
      placeholder: 'e.g 1111111111'
    }
  }
}
