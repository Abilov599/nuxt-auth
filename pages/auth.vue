<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";
import { useAuthState } from "~/stores/auth";

interface ILoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
  refreshToken: string;
}

interface ILoginForm {
  username?: string;
  password?: string;
}

interface IRegisterForm {
  name?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
}

useHead({
  title: "Auth",
});

definePageMeta({
  layout: false,
});

const route = useRoute();
const router = useRouter();

const authState = useAuthState();

const items = [
  {
    key: "login",
    label: "Login",
    description: "Enter your credentials to access your account.",
  },
  {
    key: "register",
    label: "Register",
    description: "Enter your credentials to create your account",
  },
];

const selectedTab = computed({
  get() {
    const index = items.findIndex((item) => item.key === route.query.tab);
    if (index === -1) {
      return 0;
    }

    return index;
  },
  set(value) {
    // Hash is specified here to prevent the page from scrolling to the top
    router.replace({
      query: { tab: items[value].key },
    });
  },
});

const loginForm = reactive<ILoginForm>({
  username: undefined,
  password: undefined,
});

const registerForm = reactive<IRegisterForm>({
  username: undefined,
  name: undefined,
  password: undefined,
  confirmPassword: undefined,
});

const validateLogin = (state: ILoginForm): FormError[] => {
  const errors = [];
  if (!state.username) errors.push({ path: "username", message: "Required" });
  if (!state.password) errors.push({ path: "password", message: "Required" });
  return errors;
};

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

async function onLogin(event: FormSubmitEvent<ILoginForm>) {
  const { username, password } = event.data;
  if (!username || !password) return;

  try {
    const { data, status, error } = await useFetch<ILoginResponse>(
      "https://dummyjson.com/auth/login",
      {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        } as ILoginForm),
      },
    );

    if (data?.value) {
      authState.set(data.value);
      useCookie("token", {
        maxAge: 60 * 24 * 28,
        sameSite: true,
        secure: true,
      }).value = data.value.token;
    }

    loginForm.username = "";
    loginForm.password = "";

    navigateTo("/");
  } catch (error: any) {
    console.log(error);
  }
}

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
  <div>
    <NuxtLayout name="auth">
      <div class="flex h-screen w-full items-center justify-center">
        <UTabs v-model="selectedTab" :items="items" class="w-96">
          <template #item="{ item }">
            <UCard>
              <template #header>
                <p
                  class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
                >
                  {{ item.label }}
                </p>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {{ item.description }}
                </p>
              </template>

              <div v-if="item.key === 'login'" class="space-y-3">
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

                  <UButton type="submit" class="flex w-full justify-center"
                    >Login</UButton
                  >
                </UForm>
              </div>
              <div v-else-if="item.key === 'register'" class="space-y-3">
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
                    <UInput
                      v-model="registerForm.confirmPassword"
                      type="password"
                    />
                  </UFormGroup>

                  <UButton type="submit" class="flex w-full justify-center"
                    >Register
                  </UButton>
                </UForm>
              </div>
            </UCard>
          </template>
        </UTabs>
      </div>
    </NuxtLayout>
  </div>
</template>
