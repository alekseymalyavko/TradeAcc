<template>
  <div class="ad_page_ads_item">
    <div class="ad_page_ads_item_creator">
      <a :href="`/user/${currentAdData.creator}`">{{currentAdData.creator}}</a>
    </div>
    <div class="ad_page_ads_item_link">
      Ссылка: {{currentAdData.link}}
    </div>
    <div class="ad_page_ads_item_description">
      Описание: {{currentAdData.description}}
    </div>
    <div class="ad_page_ads_item_price">
      Цена: {{currentAdData.price}}
    </div>
    <div class="ad_page_ads_item_price">
      Количество подписчиков: {{currentAdData.amountOfSubscribers}}
    </div>
  </div>
</template>

<script>
import { HTTP } from '@/requests/requests.js'

export default {
  name: "AdData",
  computed: {
    currentAdData() {
      return this.$store.getters.getCurrentAd
    },
  },
  methods: {
    
  }
  
};
</script>
<style scoped lang="less">
  
</style>