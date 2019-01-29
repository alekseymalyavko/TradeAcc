<template>
  <div>
    <Header/>

    <Popup v-if="isOpen"/>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Popup from "@/components/Popup.vue";

export default {
  name: "Main",
  components: {
    Header,
    Popup
  },
  computed:{
    isOpen() {
      return this.$store.getters.getPopup.isOpen
    },
  },
  methods: {

  }
};
</script>

<style scoped lang="less">
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 25px;
    height: 65px;
    background: grey;

    &_logo {
      width: 40px;
      height: 40px;
    }

    &_functional {
      display: flex;

      &_add {
        cursor: pointer;
      }

      & > div {
        margin: 0 5px;

        & span {
          cursor: pointer;
        }
      }
    }
  }
</style>