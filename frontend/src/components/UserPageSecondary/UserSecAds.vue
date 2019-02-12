<template>
    <div class="user_page_ads">
      <div class="user_page_ads_item" v-for="item in secondaryUserDataAds" :key="item.id">
        <div class="user_page_ads_item_link">
          {{item.link}}
        </div>
        <div class="user_page_ads_item_full">
          <a :href="`/ads/${item.adID}`">Посмотреть</a>
        </div>
        <div class="user_page_ads_item_description">
          Описание: {{item.description}}
        </div>
        <div class="user_page_ads_item_price">
          Цена: {{item.price}}
        </div>
        <div class="user_page_ads_item_price">
          Количество подписчиков: {{item.amountOfSubscribers}}
        </div>
        <div class="user_page_ads_item_price">
          Продана: {{ !item.isOpened ? 'Да' : 'Нет' }}
        </div>

      </div>
    </div>
</template>

<script>

export default {
  name: "UserSecAds",
  computed: {
    secondaryUserDataAds: function() {
      return this.$store.getters.getSecondaryUserAds
    },
  },
};
</script>
<style scoped lang="less">
  .user_page_ads {
    text-align: left;

    &_item {
      padding: 20px;
    }
  }
</style>