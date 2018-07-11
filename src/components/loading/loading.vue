<template>
    <div class='ui-loading'>
        <div>
            <div class="rotate"></div>
            <div class="text" v-if='text'>{{loadingText}}</div>
        </div>
    </div>
</template>


<script>
export default {
  name: "vLoading",
  props: {
    text: String
  },
  computed: {
    loadingText() {
      return this.text;
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
$height:1.5rem;
.ui-loading {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  & > div {
    display: flex;
    padding: 0.6rem;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 0.6rem;
    color: white;
  }
  .rotate {
    height: $height;
    width: $height;
    border-radius: 100%;
    border: 0.15rem solid #fff;
    border-bottom-color: transparent;
    vertical-align: middle;
    -webkit-animation: rotate 0.75s linear infinite;
    animation: rotate 0.75s linear infinite;
  }
  .text {
    font-size: 1rem;
    line-height: $height;
    padding: 0rem 0.5rem;
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>