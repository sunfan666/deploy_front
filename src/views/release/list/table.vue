<template>
  <div class="deploy-list">
  <el-table
    :data="value"
    border
    stripe
    style="width: 100%">

    <el-table-column
      label="项目名称"
      prop="name">
    </el-table-column>

    <el-table-column
      label="项目版本"
      prop="version">
    </el-table-column>

    <el-table-column
      label="版本描述"
      prop="info">
    </el-table-column>

    <el-table-column
      label="发布信息"
      prop="detail">
    </el-table-column>

    <el-table-column
      label="申请人"
      prop="applicant[0].name">
    </el-table-column>

    <el-table-column
      label="审核人"
      prop="reviewer[0].name">
    </el-table-column>

    <el-table-column
      label="状态"
      prop="status.name">
    </el-table-column>

    <el-table-column
      label="申请时间"
      prop="apply_time"
      :formatter="dateFormat"
      >
    </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="handleEdit(scope.row)">处理</el-button>

        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)">取消</el-button>
      </template>
    </el-table-column>

  </el-table>
  </div>
</template>


<script>
import moment from 'moment'

export default {
  name: 'deploy-list',
  props: ['value'],
  methods: {
    /* 点击编辑按钮，将子组件的事件传递给父组件 */
    handleEdit(value) {
      this.$emit('edit', value)
    },

    /* 删除 */
    handleDelete(deploy) {
      const id = deploy.id
      const name = deploy.title
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
    },
    dateFormat:function(row, column) {
      var date = row[column.property];
      if (date === undefined) {
             return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    }


  }
}
</script>

<style lang='scss'>
.deploy-list {}
</style>

