<template>
  <div class="group-list">
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
      label="组名"
      prop="name"
      align="center">
    </el-table-column>

    <el-table-column
      label="成员管理"
      prop="number"
      align="center">
      <template slot-scope="scope">
	  <el-button
            @click="handleGroupMember(scope.row)"
	    type="text"
            size="small">
	    {{'成员列表（' + scope.row.number+ '）人'}}
	  </el-button>
      </template>
    </el-table-column>

    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row)">编辑</el-button>

        <el-button
          size="mini"
          type="primary"
          @click="handlePower(scope.row)">权限</el-button>

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
  name: 'group-list',
  props: ['value'],
  methods: {
    /* 点击编辑按钮，将子组件的事件传递给父组件 */
    handleEdit(value) {
      this.$emit('edit', value)
    },

    handlePower(value) {
      this.$emit('power', value)
    },

    handleGroupMember(value) {
      this.$emit('groupmember', value)
    },

    /* 删除 */
    handleDelete(group) {
      const id = group.id
      const name = group.name
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
.group-list {}
</style>

