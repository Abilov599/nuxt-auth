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

const isPasswordHidden = ref(true);
const isConfirmPasswordHidden = ref(true);
const isSubmitting = ref(false);

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

  isSubmitting.value = true;

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
      <div class="relative">
        <UInput
          v-model="form.password"
          :type="isPasswordHidden ? 'password' : 'text'"
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
    <UFormGroup label="Confirm password" name="confirmPassword">
      <div class="relative">
        <UInput
          v-model="form.confirmPassword"
          :type="isConfirmPasswordHidden ? 'password' : 'text'"
        />
        <UButton
          variant="soft"
          color="white"
          :padded="false"
          @click="isConfirmPasswordHidden = !isConfirmPasswordHidden"
          class="absolute bottom-[6px] right-[7px]"
          :icon="
            isConfirmPasswordHidden
              ? 'heroicons:eye-slash-16-solid'
              : 'heroicons:eye-16-solid'
          "
        />
      </div>
    </UFormGroup>

    <UButton type="submit" block>Register </UButton>
  </UForm>
</template>
