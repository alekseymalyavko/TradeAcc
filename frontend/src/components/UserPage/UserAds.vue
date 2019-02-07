<template>
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
</template>

<script>
import { HTTP } from '@/requests/requests.js'

export default {
  name: "UserAds",
  computed: {
    userAdsData: function() {
      return this.$store.getters.getUserAds
    },
  },
  methods: {
    
  }
  
};
</script>
<style scoped lang="less">
  
</style>