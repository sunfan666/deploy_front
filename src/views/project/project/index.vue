<template>
  <div class="project">
    <!--表格-->
    <project-list :value="projects"></project-list>
  </div>
</template>

<script>
import { getProjectList } from '@/api/project/project'
import { getInfo } from '@/api/login'
import ProjectList from './table'

export default {
  name: 'project',
  components: {
    ProjectList
  },

  data() {
    return {
      projects: []
    }
  },

  created() {
    this.fetchData()
  },

  methods: {
    // getUserInfo() {
    //   getInfo().then(response => {
    //   })
    // },
    async fetchData() {
      var res = await getInfo()
      var username = res.username
      const data = { 'username': username }
      getProjectList(data).then(
        res => {
          this.projects = res
          console.log(this.projects)
        })
    }
  }
}

</script>

<style lang='scss' scoped>
.project {
  padding: 10px;
}
pre {
  font-weight: bold;
  color: white;
  font-size: 16px;
  background-color: black;
}
</style>

