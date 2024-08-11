"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";

import { UserFormValidation } from "@/lib/validation";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { createUser } from "@/lib/actions/patient.actions";

import { FormFieldTypes } from "./PatientForm";

import { Doctors, GenderOptions } from "@/constants";
import { SelectItem } from "../ui/select";

import Image from "next/image";

const RegisterForm = ({ user }: { user: User }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);

    try {
      const user = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };

      const newUser = await createUser(user);

      if (newUser) {
        router.push(`/patients/${newUser.$id}/register`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="space-y-2">
          <h1 className="header">Olá 👋</h1>
          <p className="text-dark-700">Queremos saber mais sobre você</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Informações pessoais</h2>
          </div>

          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.INPUT}
            name="name"
            label="Nome completo"
            placeholder="Gustavo Gomes"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.INPUT}
              name="email"
              label="E-mail"
              placeholder="GustavoGomes@mail.com"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />

            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.PHONE_INPUT}
              name="phone"
              label="Phone number"
              placeholder="(51) 9 9988-7766"
              iconSrc="/assets/icons/phone.svg"
              iconAlt="phone"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <p className="p-0">Data de nascimento - Genero</p>
            <CustomFormField
              fieldType={FormFieldTypes.DATE_PICKER}
              control={form.control}
              name="birthDate"
              label="Date of birth"
            />

            <CustomFormField
              fieldType={FormFieldTypes.SKELETON}
              control={form.control}
              name="gender"
              label="Gender"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {GenderOptions.map((option, i) => (
                      <div key={option + i} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <p className="p-0">Endereço - Ocupação</p>
            <CustomFormField
              fieldType={FormFieldTypes.INPUT}
              control={form.control}
              name="address"
              label="Endereço"
              placeholder="Av. X, 123"
            />

            <CustomFormField
              fieldType={FormFieldTypes.INPUT}
              control={form.control}
              name="occupation"
              label="Ocupação"
              placeholder=" Engenheiro de software"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <p className="p-0">
              Nome do contato auxíliar - Contato de emergência
            </p>
            <CustomFormField
              fieldType={FormFieldTypes.INPUT}
              control={form.control}
              name="emergencyContactName"
              label="Nome do contato de emergência"
              placeholder="Alice"
            />

            <CustomFormField
              fieldType={FormFieldTypes.PHONE_INPUT}
              control={form.control}
              name="emergencyContactNumber"
              label="Número do contato de emergência"
              placeholder="(51) 980121221"
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Informações complementares</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldTypes.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Médico responsável"
            placeholder="Selecione um médico"
          >
            {Doctors.map((doctor, i) => (
              <SelectItem key={doctor.name + i} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt="doctor"
                    className="rounded-full border border-dark-500"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>

          <div className="flex flex-col gap-6 xl:flex-row">
            <p className="p-0">Plano - Número da carteirinha</p>
            <CustomFormField
              fieldType={FormFieldTypes.INPUT}
              control={form.control}
              name="insuranceProvider"
              label="Seguradora"
              placeholder="Unimed"
            />
            <CustomFormField
              fieldType={FormFieldTypes.INPUT}
              control={form.control}
              name="insurancePolicyNumber"
              label="Número da carteirinha"
              placeholder="123456789"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <p className="p-0">Alergia - Medicamento</p>
            <CustomFormField
              fieldType={FormFieldTypes.TEXTAREA}
              control={form.control}
              name="allergies"
              label="Alergia (se possuir)"
              placeholder="Pólen, Penicilina"
            />

            <CustomFormField
              fieldType={FormFieldTypes.TEXTAREA}
              control={form.control}
              name="currentMedication"
              label="Medicação atual (se possuir)"
              placeholder="Dipirona, Paracetamol"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <p className="p-0">Histórico médico - Familiar</p>
            <CustomFormField
              fieldType={FormFieldTypes.TEXTAREA}
              control={form.control}
              name="familyMedicalHistory"
              label=" Histórico médico familiar (se for relevante)"
              placeholder="Diabetes, Hipertensão"
            />

            <CustomFormField
              fieldType={FormFieldTypes.TEXTAREA}
              control={form.control}
              name="pastMedicalHistory"
              label="Histórico médico"
              placeholder="Cirurgia de apendicite em 2009"
            />
          </div>
        </section>

        <SubmitButton isLoading={isLoading}>Cadastrar</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
