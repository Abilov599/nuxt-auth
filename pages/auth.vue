<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";

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

definePageMeta({
  layout: false,
});

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

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
    if (index === -1) return 0;

    return index;
  },
  set(value) {
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

  await authStore.login({ username, password });

  loginForm.username = "";
  loginForm.password = "";

  navigateTo("/");
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
  <Head><Title>Auth</Title></Head>
  <NuxtLayout name="auth">
    <div class="flex h-screen w-full items-center justify-center">
      <UTabs v-model="selectedTab" :items="items" class="w-96">
        <!--suppress VueUnrecognizedSlot -->
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
</template>
