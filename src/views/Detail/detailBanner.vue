<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
  props: ['perview', 'myclass'],
  mounted () {
    new Swiper('.' + this.myclass, {
      slidesPerView: this.perview,
      spaceBetween: this.myclass === 'photoswiper' ? 60 : 0,
      freeMode: true
    })
  }
}
</script>
<style lang="scss" scoped>
</style>
