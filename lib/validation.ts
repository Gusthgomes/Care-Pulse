import { z } from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(50, "Nome deve ter no máximo 50 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z
    .string()
    .refine(
      (phone) => /^\+\d{10,15}$/.test(phone),
      "Número de telefone inválido"
    ),
});

export const PatientFormValidation = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(50, "Nome deve ter no máximo 50 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z
    .string()
    .refine(
      (phone) => /^\+\d{10,15}$/.test(phone),
      "Número de telefone inválido"
    ),
  birthDate: z.coerce.date(),
  gender: z.enum(["Masculino", "Feminino", "Outro"]),
  address: z
    .string()
    .min(5, "Endereço deve ter pelo menos 5 caracteres")
    .max(500, "Endereço deve ter no máximo 500 caracteres"),
  occupation: z
    .string()
    .min(2, "Ocupação deve ter pelo menos 2 caracteres")
    .max(500, "Ocupação deve ter no máximo 500 caracteres"),
  emergencyContactName: z
    .string()
    .min(2, "Nome do contato de emergência deve ter pelo menos 2 caracteres")
    .max(50, "Nome do contato de emergência deve ter no máximo 50 caracteres"),
  emergencyContactNumber: z
    .string()
    .refine(
      (emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
      "Número de telefone inválido"
    ),
  primaryPhysician: z.string().min(2, "Selecione pelo menos um médico"),
  insuranceProvider: z
    .string()
    .min(2, "Nome do plano deve ter pelo menos 2 caracteres")
    .max(50, "Nome do plano deve ter no máximo 50 caracteres"),
  insurancePolicyNumber: z
    .string()
    .min(2, "Número da carteirinha deve ter pelo menos 2 caracteres")
    .max(50, "Número da carteirinha deve ter no máximo 50 caracteres"),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z.custom<File[]>().optional(),
  treatmentConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "Você deve consentir com o tratamento para prosseguir",
    }),
  disclosureConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "Você deve consentir com a divulgação para prosseguir",
    }),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "Você deve consentir com a privacidade para prosseguir",
    }),
});

export const CreateAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, ""),
  schedule: z.coerce.date(),
  reason: z
    .string()
    .min(2, "Motivo deve ter pelo menos 2 caracteres")
    .max(500, "Motivo deve ter no máximo 500 caracteres"),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Selecione pelo menos um médico"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Selecione pelo menos um médico"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z
    .string()
    .min(2, "Motivo deve ter pelo menos 2 caracteres")
    .max(500, "Motivo deve ter no máximo 500 caracteres"),
});

export function getAppointmentSchema(type: string) {
  switch (type) {
    case "create":
      return CreateAppointmentSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}
