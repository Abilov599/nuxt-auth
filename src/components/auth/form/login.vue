<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";

interface ILoginForm {
  username: string;
  password: string;
}

const authStore = useAuthStore();
const userStore = useUserStore();
const toast = useToast();

const isSubmitting = ref(false);
const isPasswordHidden = ref(true);

const form = reactive<ILoginForm>({
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

  isSubmitting.value = true;

  const { status, error } = await authStore.login({ username, password });

  if (status === "error" && error) {
    isSubmitting.value = false;
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

  isSubmitting.value = false;
}
</script>

<template>
  <UForm
    :validate="validateLogin"
    :state="form"
    class="space-y-4"
    @submit="onLogin"
  >
    <UFormGroup label="Username" name="username">
      <UInput v-model="form.username" :disabled="isSubmitting" />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <div class="relative">
        <UInput
          v-model="form.password"
          :type="isPasswordHidden ? 'password' : 'text'"
          :disabled="isSubmitting"
        />
        <UButton
          variant="soft"
          color="white"
          :padded="false"
          @click="isPasswordHidden = !isPasswordHidden"
          class="absolute bottom-[6px] right-[7px]"
          :icon="
            isPasswordHidden
              ? 'heroicons:eye-slash-16-solid'
              : 'heroicons:eye-16-solid'
          "
        />
      </div>
    </UFormGroup>

    <UButton type="submit" block :loading="isSubmitting"> Login </UButton>
  </UForm>
</template>
