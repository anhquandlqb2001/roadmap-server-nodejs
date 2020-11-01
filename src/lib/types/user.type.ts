type FormErrorField = {
  name: string;
  errors: string;
};

export type FormErrorResponse = {
  errors: FormErrorField[];
};

export type ProviderType = 'local' | 'facebook'