<template>
<div class="group">
    <acarousel height="500px" indicator-position="outside">
      <acarousel-item v-for="carousel in skuImageList" :key="carousel.id">
        <img :src="carousel.imgUrl" height="500px" width="500px"/>
      </acarousel-item>
    </acarousel>
</div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["skuImageList"],
  computed: {
    imgObj() {
      return this.skuImageList[0] || {};
    },
  },
};
</script>

<style lang="less">
.img{
  width: 100%;
  height: 100%;
}
.group{
  width:450px
}
</style>