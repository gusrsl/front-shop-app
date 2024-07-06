export interface PaymentIntent {
  // Define properties of a single Payment Intent here
  created: number;
  amount: number;
}

export interface Charge {
  // Define properties of a single Charge here
  created: number;
  amount: number;
}

export interface ServiceResponse<T> {
  data: T[];
}
