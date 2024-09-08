<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";

interface IRegisterForm {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const form = reactive<IRegisterForm>({
  username: "",
  name: "",
  password: "",
  confirmPassword: "",
});

const validateRegister = (state: IRegisterForm): FormError[] => {
  const errors = [];
  if (!state.name) errors.push({ path: "name", message: "Required" });
  if (!state.username) errors.push({ path: "username", message: "Required" });
  if (!state.password) errors.push({ path: "password", message: "Required" });
  if (!state.confirmPassword)
    errors.push({ path: "confirmPassword", message: "Required" });
  if (state.password !== state.confirmPassword)
    errors.push({ path: "confirmPassword", message: "Passwords do not match" });
  return errors;
};

async function onRegister(event: FormSubmitEvent<IRegisterForm>) {
  const { name, username, password, confirmPassword } = event.data;
  if (!name || !username || !password || !confirmPassword) return;

  // add request

  form.name = "";
  form.username = "";
  form.password = "";
  form.confirmPassword = "";

  await navigateTo("/auth?tab=login");
}
</script>

<template>
  <UForm
    :validate="validateRegister"
    :state="form"
    class="space-y-4"
    @submit="onRegister"
  >
    <UFormGroup label="Name" name="name">
      <UInput v-model="form.name" />
    </UFormGroup>

    <UFormGroup label="Username" name="username">
      <UInput v-model="form.username" />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput v-model="form.password" type="password" />
    </UFormGroup>
    <UFormGroup label="Confirm password" name="confirmPassword">
      <UInput v-model="form.confirmPassword" type="password" />
    </UFormGroup>

    <UButton type="submit" block>Register </UButton>
  </UForm>
</template>
