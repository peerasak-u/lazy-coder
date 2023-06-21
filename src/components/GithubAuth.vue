<template>
  <div>
    <button
      @click="authenticateWithGithub"
      class="bg-blue-800 hover:bg-blue-900 text-white py-1 px-4 rounded"
    >
      Authenticate with GitHub
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    authenticateWithGithub() {
      const clientId = "91f1efd8f051f618c014";
      const redirectUri = encodeURIComponent("https://lazy.peerasak.com");
      const scope = "gist";
      const state = Math.random().toString(36).substring(7);

      localStorage.setItem("github_auth_state", state);

      const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;

      window.location.href = authUrl;
    },
  },
};
</script>
