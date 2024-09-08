<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";

interface IRegisterForm {
  name?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
}

const registerForm = reactive<IRegisterForm>({
  username: undefined,
  name: undefined,
  password: undefined,
  confirmPassword: undefined,
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

  registerForm.name = "";
  registerForm.username = "";
  registerForm.password = "";
  registerForm.confirmPassword = "";

  await navigateTo("/auth?tab=login");
}
</script>

<template>
  <UForm
    :validate="validateRegister"
    :state="registerForm"
    class="space-y-4"
    @submit="onRegister"
  >
    <UFormGroup label="Name" name="name">
      <UInput v-model="registerForm.name" />
    </UFormGroup>

    <UFormGroup label="Username" name="username">
      <UInput v-model="registerForm.username" />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput v-model="registerForm.password" type="password" />
    </UFormGroup>
    <UFormGroup label="Confirm password" name="confirmPassword">
      <UInput v-model="registerForm.confirmPassword" type="password" />
    </UFormGroup>

    <UButton type="submit" class="flex w-full justify-center"
      >Register
    </UButton>
  </UForm>
</template>
