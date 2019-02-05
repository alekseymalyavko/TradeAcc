<template>
  <div>
    UserPage
    <div class="user_page">
      Профиль
      <div class="user_page_personal">
        <div class="personal_name">Профиль: {{userData.username}}</div>
        <div class="personal_email">Почта: {{userData.email}}</div>
        <div class="personal_balance">Баланс: {{userData.balance}}</div>
        <div class="personal_phone">Телефон: </div>
        <div class="personal_social">Ссылки социальные сети: </div>
      </div>

      Объявления
      <div class="user_page_ads">
        <div class="user_page_ads_item" v-for="item in userAdsData" :key="item.id">
          <div class="user_page_ads_item_link">
            {{item.link}}
          </div>
          <div class="user_page_ads_item_description">
            {{item.description}}
          </div>
          <div class="user_page_ads_item_price">
            {{item.price}}
          </div>
          <div class="user_page_ads_item_price">
            {{item.amountOfSubscribers}}
          </div>

        </div>
      </div>

      Отзывы
      <div class="user_page_recall">
        <div class="user_page_recall_item">
          Супер продавец, на 40гр 
        </div>
        <div class="user_page_recall_item">
          Лучший хоть и гей 
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>


export default {
  name: "UserPage",
  components: {

  },
  computed:{
    userData: function() {
      return this.$store.getters.getUser
    },
    userAdsData: function() {
      return this.$store.getters.getUserAds
    }
  },
  mounted() {

  },
  created() {
    this.$store.dispatch("getUserAdsData");
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