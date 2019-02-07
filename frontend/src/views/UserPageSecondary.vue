<template>
  <div>
    {{username}}
    <div>
      {{secondaryUserData}}
    </div>
    <div>
      {{secondaryUserDataAds}}
    </div>
  </div>
</template>

<script>


export default {
  name: "UserPageSecondary",
  components: {

  },
  data() {
    return {
      username: this.$route.params.username
    }
  },
  computed:{
    secondaryUserData() {
      return this.$store.getters.getSecondaryUser
    },
    secondaryUserDataAds() {
      return this.$store.getters.getSecondaryUserAds
    }
  },
  mounted() {
  },
  created() {
    this.$store.dispatch("getSecondaryUser", this.username);
    this.$store.dispatch("getSecondaryUserAdsData", this.username);
  },
  methods: {

  }
};
</script>

<style scoped lang="less">
  .user_page {
    padding: 20px;
    text-align: left;

    &_personal {
      padding: 20px;
    }

    &_ads {
      padding: 20px;

      &_item {
        padding: 5px 0;
      }
    }

    &_recall {
      padding: 20px;

      &_item {
        padding: 5px 0;
      }
    }
  }
</style>