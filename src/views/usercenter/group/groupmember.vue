<template>
  <div class="group-member">
  <el-table
    :data="value"
    border
    stripe
    style="width: 100%">
    
    <el-table-column
      label="用户名"
      prop="username"
      align="center">
    </el-table-column>

    <el-table-column
      label="姓名"
      prop="name"
      align="center">
    </el-table-column>

    <el-table-column
      label="手机号"
      prop="phone"
      align="center">
    </el-table-column>


    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>

  </el-table>
  </div>
</template>

<script>
export default {
  name: 'group-member',
  props: ['value'],
  methods: {
    /* 删除 */
    handleDelete(member) {
      const uid = member.id
      const name = member.name
      this.$confirm(`此操作将删除: ${name}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('deletemember',uid)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang='scss'>
.group-member {}
</style>

