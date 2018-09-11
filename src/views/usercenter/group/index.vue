<template>
  <div class="group">
    <div>
      <!--搜索-->
      <el-col :span="8">
        <el-input placeholder="搜索" v-model="params.search" @keyup.enter.native="searchClick">
          <el-button slot="append" icon="el-icon-search" @click="searchClick"></el-button>
        </el-input>
      </el-col>

      <!--添加按钮-->
      <el-col :span="16" style="text-align: right">
        <el-button type="primary" @click="handleAddBtn">创建组</el-button>
      </el-col> 
    </div> 
   
    <!--表格-->
    <group-list :value="groups" @edit="handleEdit" @groupmember="handleGroupMember" @power="handlePower" @delete="handleDelete"></group-list>

    <!--模态窗增加表单-->
    <el-dialog
      title="添加"
      :visible.sync="dialogVisibleForAdd"
      width="50%">
      <group-form
        ref="groupForm"
        @submit="handleSubmitAdd"
        @cancel="handleCancelAdd">
      </group-form>
    </el-dialog>
  
    <!--模态窗更新表单-->
    <el-dialog
      title="更新"
      :visible.sync="dialogVisibleForEdit"
      width="50%">
      <group-form
        ref="groupForm"
        :form="currentValue"
        @submit="handleSubmitEdit"
        @cancel="handleCancelEdit">
      </group-form>
    </el-dialog>

    <!--模态窗权限表单-->
    <el-dialog
      title="权限"
      :visible.sync="dialogVisibleForPower"
      width="50%">
      <role-power
        ref="powerForm"
        :form="currentValue"
        @submit="handleSubmitPower"
        @cancel="handleCancelPower">
      </role-power>
    </el-dialog>

    <!--模态窗成员管理表格-->
    <el-dialog
      title="成员管理"
      :visible.sync="dialogVisibleForMember"
      width="50%">
      <group-member 
        :value="members"
        @deletemember="handleDeleteMember">
      </group-member>
    </el-dialog>

    <!--分页-->
    <center>
    <el-pagination
      background
      layout="total, prev, pager, next, jumper"
      :page-size="pagesize"
      :total="totalNum"
      @current-change="handleCurrentChange">
    </el-pagination>
    </center> 
  </div>
</template>

<script>
import { getGroupList, createGroup, updateGroup, deleteGroup, updateGroupPower, deleteGroupMember } from '@/api/users/group'
import GroupList from './table'
import GroupForm from './form'
import RolePower from './power_form'
import GroupMember from './groupmember'

export default {
  name: 'group',
  components: {
    GroupList,
    GroupForm,
    RolePower,
    GroupMember
  },

  data() {
    return {
      dialogVisibleForAdd: false,
      dialogVisibleForEdit: false,
      dialogVisibleForPower: false,
      dialogVisibleForMember: false,
      currentValue: {},
      groups: [],
      members: [],
      totalNum: 0,
      pagesize: 2,
      params: {
        page: 1,
        search: ''
      } 
    }
  },

  created() {
    this.fetchData()
  },

  methods: {
    fetchData() {
      getGroupList(this.params).then(
        res => {
          this.groups = res.results
          this.totalNum = res.count
        })
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.fetchData()
      // console.log(this.params.page)
    },
    searchClick() {
      this.fetchData()
    },
    /* 添加,弹出模态窗、提交数据、取消 */
    handleAddBtn() {
      this.dialogVisibleForAdd = true
    },
    handleSubmitAdd(value) {
      createGroup(value).then(res => {
        this.$message({
          message: '创建成功',
          type: 'success'
        })
        this.handleCancelAdd()
        this.fetchData()
      })
    },
    handleCancelAdd() {
      this.dialogVisibleForAdd = false
      this.$refs.groupForm.$refs.form.resetFields()  // 清除掉子组件表单的数据
    },

    /* 更新，弹出模态窗、提交数据、取消 */
    handleEdit(value) {
      this.currentValue = { ...value }   // 将table子组件传来的值给父组件的变量，然后渲染更新表单
      console.log(this.currentValue)
      this.dialogVisibleForEdit = true
    },

    handleSubmitEdit(value) {
      console.log(value)
      const { id, ...params } = value  // 很神奇，能把表单的值拆解成自己想要的样子
      // console.log(id)       
      // console.log(params)
      updateGroup(id, params).then(res => {
        this.$message({
          message: '更新成功',
          type: 'success'
        })
        this.handleCancelEdit()
        this.fetchData()
      })
    },
    handleCancelEdit() {
      this.dialogVisibleForEdit = false
      this.$refs.groupForm.$refs.form.resetFields()
    }, 

    /* 权限，弹出模态窗、提交数据、取消 */
    handlePower(value) {
      this.currentValue = { ...value }   // 将table子组件传来的值给父组件的变量，然后渲染更新表单
      this.currentValue['power'] = this.currentValue['power'].map(it => it.id)
      console.log(this.currentValue)
      this.dialogVisibleForPower = true
    },

    handleSubmitPower(value) {
      console.log(value)
      const { id, ...params } = value  // 很神奇，能把表单的值拆解成自己想要的样子
      updateGroupPower(id, params).then(res => {
        this.$message({
          message: '更新成功',
          type: 'success'
        })
        this.handleCancelPower()
        this.fetchData()
      })
    },
    handleCancelPower() {
      this.dialogVisibleForPower = false
      this.$refs.powerForm.$refs.form.resetFields()
    }, 

    /* 弹出成员管理模态窗，并将组对成员渲染成到表格 */
    handleGroupMember(value) {
      this.currentValue = { ...value }   // 将table子组件传来的值给父组件的变量，然后渲染更新表单
      this.members = this.currentValue.members   // 直接将当前组的成员对象返回即可
      console.log(this.members)
      this.dialogVisibleForMember = true
    },


    /* 将组成员从组中删除 */
    handleDeleteMember(uid) {
      deleteGroupMember(this.currentValue.id, {'uid':uid}).then(res => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.params.page = 1,
        this.fetchData()
      },
      err => {
        console.log(err.message)
      })
   },


   /* 删除 */
   handleDelete(id) {
     deleteGroup(id).then(res => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.params.page = 1,
        this.fetchData()
     },
     err => {
       console.log(err.message)
     })
    }

  }

}
</script>

<style lang='scss' scoped>
.group {
  padding: 10px;
}
</style>

