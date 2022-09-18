<template>
  <div>
    <el-button type="primary" @click="dialogVisible=true">添加新用户</el-button>

    <el-table :data="userList" stripe border>
      <!-- 索引列 -->
      <el-table-column label="#" type="index"></el-table-column>
      <!-- 渲染的用户信息 -->
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="年龄" prop="age"></el-table-column>
      <el-table-column label="头衔" prop="position"></el-table-column>
      <!-- 用插槽的方式获取，并在main中加工创建时间 -->
      <el-table-column label="创建时间">
        <template #default="scope">
          {{scope.row.addtime|dataFormat}}
        </template>
      </el-table-column>
      <!-- 用插槽的方式添加详情与删除 -->
      <el-table-column label="操作">
        <!-- <template v-slot:default="{row}"> -->
        <!-- <template v-slot="{row}"> -->
        <template #default="{row}">
          <router-link :to="'/users/'+row.id">详情</router-link>&nbsp;&nbsp;
          <a href="#" @click.prevent="onRemove(row.id)">删除</a>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加用户时弹出的对话框 -->
    <el-dialog title="添加新用户" :visible.sync="dialogVisible" width="30%" @close="onDialogClosed">
      <!-- 添加用户表单 -->
      <el-form :model="form" label-width="80px" :rules="formRules" ref="myaddForm">
        <!-- 采集的各种数据 -->
        <el-form-item label="用户姓名" prop="name">
          <el-input v-model.trim="form.name"></el-input>
        </el-form-item>
        <el-form-item label="用户年龄" prop="age">
          <el-input v-model.number="form.age"></el-input>
        </el-form-item>
        <el-form-item label="用户头衔" prop="position">
          <el-input v-model.trim="form.position"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onAddNewUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    //自定义验证年龄
    let checkAge = (rule, value, callback) => {
      //验证年龄是否为整数
      if (!Number.isInteger(value)) {
        return callback(new Error('请填写整数！'))
      }
      //验证年龄是否在1-100之间
      if (value > 100 || value < 1) {
        return callback(new Error('年龄要在1到100之间！'))
      }
      //验证都通过后使用回调callback,代表验证通过
      callback()
    }
    return {
      userList: [],
      //控制添加和隐藏对话框
      dialogVisible: false,
      //采集用户信息
      form: {
        name: '',
        age: '',
        position: ''
      },
      // 表单验证规则对象
      formRules: {
        name: [
          { required: true, message: '姓名不能为空！', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 1 到 15 个字符 !', trigger: 'blur' }
        ],
        age: [{ required: true, message: '年龄不能为空！', trigger: 'blur' }, { validator: checkAge, trigger: 'blur' }],
        position: [
          { required: true, message: '头衔不能为空！', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符 !', trigger: 'blur' }
        ],
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get('/api/users')
      //res.status=0表示请求成功，否则就为失败
      if (res.status !== 0) return console.log('请求用户数据失败！');
      this.userList = res.data
      console.log(this.userList);
    },
    //点击取消时重置弹出的表单
    onDialogClosed() {
      this.$refs.myaddForm.resetFields()
    },
    //点击添加按钮，进行表单校验
    onAddNewUser() {
      this.$refs.myaddForm.validate(async valid => {
        //校验不合法，则return出去
        if (!valid) return
        //校验合法则根据接口文档发起post请求
        const { data: res } = await this.$http.post('/api/users', this.form)
        console.log(res);
        if (!res.status === 0) return this.$message.error('添加新用户失败！')
        this.$message.success('添加新用户成功！')
        this.dialogVisible = false
        this.getUserList()
      })
    },
    async onRemove(id) {
      const confirmResult = await this.$confirm('确定要删除此用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      console.log(confirmResult);
      //判断是否点击了确认按钮
      if (confirmResult !== 'confirm') return this.$message.info('您取消了删除！')

      const { data: res } = await this.$http.delete('/api/users/' + id)
      console.log(res);
      if (res.status !== 0) return this.$message.error('删除失败！')
      this.$message.success('删除成功！')

    }
  },
}
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 30px;
}
</style>