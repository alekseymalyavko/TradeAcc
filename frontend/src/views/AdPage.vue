<template>
  <div>
    <AdData/>

    Купить сообщество
    <AdBuy :adID="adID"/>

    Комментарии
    <AdComments/>

    Оставить комментарий
    <AdAddComment :adID="adID"/>

  </div>
</template>

<script>
import { HTTP } from '@/requests/requests'

import AdData from "@/components/AdPage/AdData.vue";
import AdComments from "@/components/AdPage/AdComments.vue";
import AdBuy from "@/components/AdPage/AdBuy.vue";
import AdAddComment from "@/components/AdPage/AdAddComment.vue";


export default {
  name: "AdPage",
  components: {
    AdData,
    AdComments,
    AdBuy,
    AdAddComment,

  },
  data() {
    return {
      adID: this.$route.params.adID,
    }
  },
  created() {
    this.$store.dispatch("getCurrentAdData", this.adID);
    this.$store.dispatch("getCurrentAdCommentsData", this.adID);
  },
};
</script>

<style scoped lang="less">
  .ad_page_ads_item {
    padding: 20px;
    text-align: left;
  }
</style>