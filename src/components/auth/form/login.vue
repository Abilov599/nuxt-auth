<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";

interface ILoginForm {
  username: string;
  password: string;
}

const authStore = useAuthStore();
const userStore = useUserStore();
const toast = useToast();

const isLoading = ref(false);

const loginForm = reactive<ILoginForm>({
  username: "",
  password: "",
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

  isLoading.value = true;

  const { status, error } = await authStore.login({ username, password });

  if (status === "error" && error) {
    isLoading.value = false;
    return toast.add({
      title:
        error.data?.message || (error.cause as { message?: string })?.message,
      color: "red",
    });
  }

  if (status === "success") {
    await userStore.getUser();
    navigateTo("/");
  }

  isLoading.value = false;
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
      <UInput v-model="loginForm.username" :disabled="isLoading" />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput
        v-model="loginForm.password"
        type="password"
        :disabled="isLoading"
      />
    </UFormGroup>

    <UButton
      type="submit"
      class="flex w-full justify-center"
      :loading="isLoading"
    >
      Login
    </UButton>
  </UForm>
</template>
