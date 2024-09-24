<script setup lang="ts">
import { useForm } from "vee-validate";
import validationSchema from "~/schemas/login";
import nuxtUiConfig from "~/utils/nuxt-ui-error-config";

interface ILoginForm {
  username: string;
  password: string;
}

const loginForm = reactive<ILoginForm>({
  username: "",
  password: "",
});

const isPasswordHidden = ref(true);

const authStore = useAuthStore();
const userStore = useUserStore();
const toast = useToast();

const { defineField, handleSubmit, isSubmitting, resetForm } =
  useForm<ILoginForm>({
    validationSchema,
    initialValues: loginForm,
  });

const [username, usernameProps] = defineField("username", nuxtUiConfig);
const [password, passwordProps] = defineField("password", nuxtUiConfig);

const onSubmit = handleSubmit(async (formData) => {
  const { status, error } = await authStore.login(formData);

  if (status === "error" && error) {
    return toast.add({
      title:
        error.data?.message || (error.cause as { message?: string })?.message,
      color: "red",
    });
  }

  if (status === "success") {
    await userStore.getUser();
    resetForm();
    navigateTo("/");
  }
});
</script>

<template>
  <UForm class="space-y-4" :state="loginForm" @submit="onSubmit">
    <UFormGroup label="Username" name="username" v-bind="usernameProps">
      <UInput v-model="username" :disabled="isSubmitting" />
    </UFormGroup>

    <UFormGroup label="Password" name="password" v-bind="passwordProps">
      <div class="relative">
        <UInput
          v-model="password"
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

    <UButton type="submit" block :loading="isSubmitting">Login</UButton>
  </UForm>
</template>
