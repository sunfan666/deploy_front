<template>
  <div class="user-list">
  <el-table
    :data="value"
    border
    stripe
    style="width: 100%">

    <el-table-column
      label="ID"
      prop="id">
    </el-table-column>

    <el-table-column
      label="用户名"
      prop="username">
    </el-table-column>

    <el-table-column
      label="姓名"
      prop="name">
    </el-table-column>

    <el-table-column
      label="手机号"
      prop= "phone">
    </el-table-column>

    <el-table-column
      label="角色"
      prop="role"
      type="scope">
      <template slot-scope="scope">
      <div v-for="(item) in scope.row.role">
        <span style="float: left">{{item.name}}, </span>
      </div>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row)">更新</el-button>

        <el-button
          size="mini"
          type="primary"
          @click="handleRole(scope.row)">角色</el-button>

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
  name: 'user-list',
  props: ['value'],
  methods: {
    /* 点击编辑按钮，将子组件的事件传递给父组件 */
    handleEdit(value) {
      this.$emit('edit', value)
    },

    /* 点击角色按钮，将子组件的事件传递给父组件 */
    handleRole(value) {
      this.$emit('role', value)
    },

    /* 删除 */
    handleDelete(user) {
      const id = user.id
      const name = user.name
      this.$confirm(`此操作将删除: ${name}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('delete', id)
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
.user-list {}
</style>

