import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Email is required'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email format is not correct'
    },
    maxLength: {
      value: 160,
      message: 'Length is 5 - 160 characters'
    },
    minLength: {
      value: 5,
      message: 'Length is 5 - 160 characters'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password is required'
    },
    maxLength: {
      value: 160,
      message: 'Length is 6 - 160 characters'
    },
    minLength: {
      value: 6,
      message: 'Length is 6 - 160 characters'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Confirm password is required'
    },
    maxLength: {
      value: 160,
      message: 'Length is 6 - 160 characters'
    },
    minLength: {
      value: 6,
      message: 'Length is 6 - 160 characters'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Confirm password is not match'
        : undefined
  }
})

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_max, price_min } = this.parent as { price_min: string; price_max: string }
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}

const handleConfirmPasswordYup = (refString: string) => {
  return yup
    .string()
    .required('Confirm password is required')
    .min(6, 'Length is 6 - 160 characters')
    .max(160, 'Length is 6 - 160 characters')
    .oneOf([yup.ref(refString)], 'Confirm password is not match')
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Email format is not correct')
    .min(5, 'Length is 5 - 160 characters')
    .max(160, 'Length is 5 - 160 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Length is 6 - 160 characters')
    .max(160, 'Length is 6 - 160 characters'),
  confirm_password: handleConfirmPasswordYup('password'),
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Price is not allowed',
    test: testPriceMinMax
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Price is not allowed',
    test: testPriceMinMax
  }),
  name: yup.string().trim().required('Product name is required')
})

export const userSchema = yup.object({
  name: yup.string().max(160, 'Max length is 160 characters'),
  phone: yup.string().max(20, 'Max length is 20 characters'),
  address: yup.string().max(160, 'Max length is 160 characters'),
  avatar: yup.string().max(1000, 'Max length is 1000 characters'),
  date_of_birth: yup.date().max(new Date(), 'Select a day is the past'),
  password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  new_password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  confirm_password: handleConfirmPasswordYup('new_password') as yup.StringSchema<
    string | undefined,
    yup.AnyObject,
    undefined,
    ''
  >
})

export type UserSchema = yup.InferType<typeof userSchema>

export type Schema = yup.InferType<typeof schema>
