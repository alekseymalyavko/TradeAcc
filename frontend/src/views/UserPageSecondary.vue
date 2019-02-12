<template>
  <div>
    Инфо
    <UserSecInfo/>
    
    Объявления 
    <UserSecAds/>

    Отзывы
    <UserSecRec/>

    Добавить отзыв
    <UserSecAddComment :username="username"/>

  </div>
</template>

<script>
import UserSecInfo from "@/components/UserPageSecondary/UserSecInfo.vue";
import UserSecAds from "@/components/UserPageSecondary/UserSecAds.vue";
import UserSecAddComment from "@/components/UserPageSecondary/UserSecAddComment.vue";
import UserSecRec from "@/components/UserPageSecondary/UserSecRec.vue";


export default {
  name: "UserPageSecondary",
  components: {
    UserSecInfo,
    UserSecAds,
    UserSecAddComment,
    UserSecRec,

  },
  data() {
    return {
      username: this.$route.params.username
    }
  },
  created() {
    this.$store.dispatch("getSecondaryUser", this.username);
    this.$store.dispatch("getSecondaryUserAdsData", this.username);
    this.$store.dispatch("getSecondaryUserCommentsData", this.username);
  },
};
</script>

<style scoped lang="less">
  .user_page {
    padding: 20px;
    text-align: left;

    &_personal {
      text-align: left;
      padding: 20px;
    }

    &_ads {
      // padding: 20px;

      &_item {
        padding: 5px 0;
        text-align: left;
      }
    }

    &_recall {
      // padding: 20px;

      &_item {
        // padding: 5px 0;
      }
    }
  }
</style>