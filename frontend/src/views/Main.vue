<template>
  <div>
    Main
    <div class="main_page_ads">
      Ads
      <div class="main_page_ads_block">
        <div class="main_page_ads_item" v-for="item in adsData" :key="item.id">
          <div class="main_page_ads_item_link">
            {{item.link}}
          </div>
          <div class="main_page_ads_item_description">
            {{item.description}}
          </div>
          <div class="main_page_ads_item_price">
            {{item.price}}
          </div>
          <div class="main_page_ads_item_price">
            {{item.amountOfSubscribers}}
          </div>
        </div>
      </div>
      Pagination      
      <div class="main_page_ads_nav">
        <div class="main_page_ads_nav_item">
          <div>{{pages}}</div>
          <div>{{steps}}</div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: "Main",
  components: {

  },
  data() {
    return {
      steps: [],
    }
  },
  computed:{
    adsData: function() {
      return this.$store.getters.getAds.ads
    },
    pages: function() {
      return this.$store.getters.getAds.pages
    }
  },
  created() {
    const props = { page: 1, perPage: 10};
    this.$store.dispatch("getAdsData", props);
  },
  mounted() {
    this.steps = 12
  },
  methods: {

  }
};
</script>

<style scoped lang="less">
  .main_page_ads {
    padding: 20px;
    text-align: left;

    &_block {
      max-height: 300px;
      width: 45%;
      overflow: auto;
      padding: 5px 0; 
    }

    &_item {
      padding: 15px 0;
    }
  }
</style>