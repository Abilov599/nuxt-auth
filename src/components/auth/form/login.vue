<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";

const authStore = useAuthStore();
const userStore = useUserStore();

interface ILoginForm {
  username?: string;
  password?: string;
}

const loginForm = reactive<ILoginForm>({
  username: undefined,
  password: undefined,
});

const validateLogin = (state: ILoginForm): FormError[] => {
  const errors = [];
  if (!state.username) errors.push({ path: "username", message: "Required" });
  if (!state.password) errors.push({ path: "password", message: "Required" });
  return errors;
};

async function onLogin(event: FormSubmitEvent<ILoginForm>) {
  const { username, password } = event.data;
  if (!username || !password) return;

  await authStore.login({ username, password });
  await userStore.getUser();
  navigateTo("/");
}
</script>

<template>
  <UForm
    :validate="validateLogin"
    :state="loginForm"
    class="space-y-4"
    @submit="onLogin"
  >
    <UFormGroup label="Username" name="username">
      <UInput v-model="loginForm.username" />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput v-model="loginForm.password" type="password" />
    </UFormGroup>

    <UButton type="submit" class="flex w-full justify-center">Login </UButton>
  </UForm>
</template>

<style scoped></style>
