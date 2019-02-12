<template>
  <div>
    AdPage
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

    Купить сообщество
    <div>
      <form name="buy_acc" @submit="buyAcc">
        <input type="number" placeholder="" name="acc" v-model="adID" hidden>
        <input type="submit" value="Купить">
      </form>
    </div>
  </div>
</template>

<script>
import { HTTP } from '@/requests/requests'

export default {
  name: "AdPage",
  components: {

  },
  data() {
    return {
      adID: this.$route.params.adID
    }
  },
  computed:{
    currentAdData() {
      return this.$store.getters.getCurrentAd
    }
  },
  mounted() {
  },
  created() {
    this.$store.dispatch("getCurrentAdData", this.adID);
  },
  methods: {
    buyAcc: function(e) {
      e.preventDefault();

      HTTP.post(`/ads/${this.adID}/buy`)
      .then(res => {
        if(res.status === 200) {
          console.log("Куплено")
        }
      })
      .catch(e => {
        this.isError = true;
      })
    }
  }
};
</script>

<style scoped lang="less">
  .ad_page_ads_item {
    padding: 20px;
    text-align: left;
  }
</style>