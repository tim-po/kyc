export type Country = {
    code: string,
    name: string
}

export type UserData = {
  wallet: FieldStatus,
  additionalStreet: FieldStatus
  bDate: FieldStatus
  city: FieldStatus
  country: FieldStatus
  firstName: FieldStatus
  isSubmitted: boolean
  isVerified: boolean
  lastName: FieldStatus
  mainStreet:FieldStatus
  middleName: FieldStatus
  nationality: FieldStatus
  region: FieldStatus
  street: FieldStatus
  zip: FieldStatus
}

export type FieldStatus = {
  value: string,
  blocked: boolean
  valid: boolean
}