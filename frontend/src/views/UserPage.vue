<template>
  <div>
    UserPage
    <div class="user_page">
      Профиль
      <UserInfo/>

      Объявления
      <UserAds/>

      Отзывы
      <UserRec/>

      Изменить пароль
      <ChangePass/>

      <Balanceup/>
      
    </div>
  </div>
</template>

<script>
import ChangePass from "@/components/UserPage/ChangePass.vue";
import UserInfo from "@/components/UserPage/UserInfo.vue";
import UserAds from "@/components/UserPage/UserAds.vue";
import UserRec from "@/components/UserPage/UserRec.vue";
import Balanceup from "@/components/Popup/Balanceup.vue";


export default {
  name: "UserPage",
  components: {
    ChangePass,
    UserInfo,
    UserAds,
    UserRec,
    Balanceup,
  },
  computed:{

  },
  mounted() {

  },
  created() {
    this.$store.dispatch("getUserAdsData");
    this.$store.dispatch("getUserCommentsData");
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