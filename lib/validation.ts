import * as z from "zod";

export const AdminValidation = z
  .object({
    name: z.string().min(2).max(20),
    password: z.string().min(2).max(15),
    confirm: z.string().min(2),
    role: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"], // path of error
  });
export const LogInValidation = z.object({
  name: z.string().min(2).max(20),
  password: z.string().min(2).max(15),
});
const validateEmail = (value: any) => {
  // If the value is empty, it's considered valid
  if (value === "") return true;
  // Otherwise, check if it's a valid email
  return z.string().email().safeParse(value).success;
};
export const ClientValidation = z.object({
  firstName: z
    .string()
    .min(2, { message: "Το επίθετο πρέπει να είναι τουλάχιστον 2 χαρακτήρες" })
    .max(20),
  lastName: z
    .string()
    .min(2, { message: "Το επίθετο πρέπει να είναι τουλάχιστον 2 χαρακτήρες" })
    .max(20),
  email: z.string().refine(validateEmail).optional(),
  profession: z.string().optional(),
  birthdate: z
    .date({
      required_error: "Διάλεξε ημερομηνία",
      invalid_type_error: "That's not a date!",
    })
    .optional(),
  residence: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  telephone: z.string().optional(),
  mobile: z.string().min(6, {
    message: "Το τηλέφωνο πρέπει να είναι τουλάχιστον 6 χαρακτήρες",
  }),
  emergencyContact: z.string().optional(),
  emergencyMobile: z.string().optional(),
});

export const DogValidation = z.object({
  dogs: z.array(
    z.object({
      name: z.string().min(2).max(20),
      gender: z.string(),
      birthdate: z
        .date({
          required_error: "Διάλεξε ημερομηνία",
          invalid_type_error: "That's not a date!",
        })
        .optional(),
      food: z.string().optional(),
      breed: z.string().optional(),
      behavior: z.string().optional(),
    })
  ),
});

export const BookingValidation1 = z.object({
  rangeDate: z.object({
    from: z.date({
      required_error: "Διάλεξε ημερομηνία",
      invalid_type_error: "That's not a date!",
    }),
    to: z.date({
      required_error: "Διάλεξε ημερομηνία",
      invalid_type_error: "That's not a date!",
    }),
  }),
  client: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    id: z.string(),
  }),
});
export const BookingValidation2 = z.object({
  time_arrival: z.custom((value) => value instanceof Date) as z.ZodType<Date>,
  time_departure: z.custom((value) => value instanceof Date) as z.ZodType<Date>,
});
export const searchRoomValidation = z.object({
  rangeDate: z.object({
    from: z.date({
      required_error: "Διάλεξε ημερομηνία",
      invalid_type_error: "That's not a date!",
    }),
    to: z.date({
      required_error: "Διάλεξε ημερομηνία",
      invalid_type_error: "That's not a date!",
    }),
  }),
  client: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    id: z.string(),
  }),
});

export const TrainingValidation1 = z.object({
  name: z.string().min(1).max(20),
  client: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    id: z.string(),
  }),
  date: z.date(),
});
export const TrainingValidation2 = z.object({
  time_arrival: z.custom((value) => value instanceof Date) as z.ZodType<Date>,
  time_departure: z.custom((value) => value instanceof Date) as z.ZodType<Date>,
  totalprice: z.string(),
  notes: z.string().min(1).max(80).optional(),
});
export const TaskValidation = z.object({
  title: z.string().min(1).max(20),
  description: z.string().min(8).max(40),
  priority: z.string(),
});
export const TransportationValidation = z.object({
  delivery_time: z.custom((value) => value instanceof Date) as z.ZodType<Date>,
  pickup_time: z.custom((value) => value instanceof Date) as z.ZodType<Date>,
  notes: z.string().optional(),
});
