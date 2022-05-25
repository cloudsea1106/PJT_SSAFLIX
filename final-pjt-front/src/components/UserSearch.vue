<template>
  <div>
    <form @submit.prevent="onSearch">
      <input class="border-black" v-model="keyword" value="영화 제목을 입력하세요.">
    </form>
  </div>
</template>

<script>

export default {
    data(){
        return {
            keyword:"",
            movieList:""
        }
    },
methods:{
    async onSearch(){
        console.log(this.keyword);
        if(!this.keyword){
            alert("영화 제목을 입력하세요!");
            this.keyword = ""
            return;
        }
        this.keyword = ""
    }    
}

}
</script>

<style>
.search-input{
    color:black;
}
</style>