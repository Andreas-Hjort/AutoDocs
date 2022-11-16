<template>
  <header :class="{'scrolled-nav': scrollPosition}">
    <nav>
      <div class="branding">
        <img src="@/assets/logo.png" alt="">

      </div>
      <ul class="navigation">
      <li><router-link class="link" :to="{name: 'Home'}"></router-link></li>
      <li><router-link class="link" :to="{name: 'Ordre'}">Ordre</router-link></li>
      <li><router-link class="link" :to="{name: 'Stamdata'}">Stamdata</router-link></li>
      <li><router-link class="link" :to="{name: 'Tilbud'}">Tilbud</router-link></li>
      </ul>
    </nav>

</header>
</template>

<script>
export default {
  name: "navigation", 
  data(){
    return{
      scrollPosition: null,
      windowWidth: null,
    };
  },
};
</script>

<style lang="scss" scoped>

header{
  background-color: rgba($color: #000000, $alpha: 1.0);
  z-index: 99;
  width: 100%;
  position: fixed;
  transition: 0.5s ease all;
  color: #fff;
}

nav{
  display: flex;
  flex-direction: row;
  padding: 12px 0;
  transition: 0.5s ease all ;
  width: 90%;
  margin: 0 auto;
  @media(min-width: 1140px){
    max-width: 1140px;
  }

  ul,
  .link{
    font-weight: 500;
    color: #fff;
    list-style: none;
    text-decoration: none;
  }

  li{
    text-transform: uppercase;
    padding: 16px;
    margin-left: 16px;
  }

  .link{
    font-size: 14px;
    transition: 0.5s ease all;
    padding-bottom: 4px;
    border-bottom: 1px solid transparent;

    &:hover{
      color: aqua;
      border-color: aqua;
    }
  }

  .branding{
    display: flex;
    align-items: center;

    img {
      width: 50px;
      transition: 0.5s ease all;
    }
  }
}
</style>