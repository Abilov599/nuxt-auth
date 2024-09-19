import type { PublicPathState } from "vee-validate";

function nuxtUiConfig (state: PublicPathState<string>) {
  return {
    props: {
      error: state.errors[0],
    },
  };
}

export default nuxtUiConfig;