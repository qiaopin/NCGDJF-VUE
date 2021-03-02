<template>
  <el-form
    :model="registeredForm"
    ref="registeredForm"
    :rules="formRules"
    class="FPForm"
  >
    <el-form-item
      prop="usertype"
      label="用户类型"
      :label-width="formLabelWidth"
      :rules="[
        { required: true, message: '用户类型不能为空', trigger: 'blur' },
      ]"
    >
      <el-select v-model="registeredForm.usertype" placeholder="请选择用户类型">
        <el-option label="市（州）级" value="2"></el-option>
        <el-option label="县（区）级" value="3"></el-option>
        <el-option label="乡镇级" value="5"></el-option>
        <el-option label="村级" value="6"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item
      label="省名称"
      :rules="[{ required: true, message: '省名称不能为空', trigger: 'blur' }]"
      :label-width="formLabelWidth"
    >
      <el-input
        v-model="registeredForm.shengName"
        :disabled="true"
        autocomplete="off"
      ></el-input>
    </el-form-item>

    <el-form-item
      prop="shimc"
      label="市名称"
      :rules="[{ required: true, message: '市名称不能为空', trigger: 'blur' }]"
      :label-width="formLabelWidth"
    >
      <el-select
        v-model="registeredForm.shimc"
        clearable
        placeholder="请选择"
        filterable
      >
        <el-option
          v-for="item in options"
          :key="item.shimc"
          :label="item.label"
          :value="item.shimc"
        >
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item
      prop="xianmc"
      label="县名称"
      :rules="[
        { required: xianRules, message: '县名称不能为空', trigger: 'blur' },
      ]"
      :label-width="formLabelWidth"
    >
      <el-select
        v-model="registeredForm.xianmc"
        clearable
        :disabled="xianDisa"
        placeholder="请选择"
        filterable
      >
        <el-option
          v-for="item in options"
          :key="item.shimc"
          :label="item.label"
          :value="item.shimc"
        >
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item
      prop="xzmc"
      label="乡镇名称"
      :rules="[
        { required: xzRules, message: '乡镇名称不能为空', trigger: 'blur' },
      ]"
      :label-width="formLabelWidth"
    >
      <el-select
        v-model="registeredForm.xzmc"
        clearable
        :disabled="xzDisa"
        placeholder="请选择"
        filterable
      >
        <el-option
          v-for="item in options"
          :key="item.shimc"
          :label="item.label"
          :value="item.shimc"
        >
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item
      prop="cmc"
      label="村名称"
      :rules="[
        { required: cRules, message: '村名称不能为空', trigger: 'blur' },
      ]"
      :label-width="formLabelWidth"
    >
      <el-select
        v-model="registeredForm.cmc"
        clearable
        :disabled="cDisa"
        placeholder="请选择"
        filterable
      >
        <el-option
          v-for="item in options"
          :key="item.shimc"
          :label="item.label"
          :value="item.shimc"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="身份证号" :label-width="formLabelWidth">
      <el-input
        type="number"
        v-model.number="registeredForm.sfz"
        autocomplete="off"
      ></el-input>
    </el-form-item>

    <el-form-item
      prop="username"
      label="用户姓名"
      :label-width="formLabelWidth"
      :rules="[
        { required: true, message: '用户姓名不能为空', trigger: 'blur' },
      ]"
    >
      <el-input v-model="registeredForm.username" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item
      label="用户性别"
      prop="sfbxzcfDHZZL"
      :label-width="formLabelWidth"
    >
      <el-radio-group v-model="registeredForm.xb">
        <el-radio label="1">男</el-radio>
        <el-radio label="2">女</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item
      prop="zw"
      label="职务"
      :label-width="formLabelWidth"
      :rules="[{ required: true, message: '职务不能为空', trigger: 'blur' }]"
    >
      <el-input v-model="registeredForm.zw" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item
      prop="ssdw"
      label="所属单位"
      :label-width="formLabelWidth"
      :rules="[
        { required: true, message: '所属单位不能为空', trigger: 'blur' },
      ]"
    >
      <el-input v-model="registeredForm.ssdw" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item
      label="角色"
      prop="js"
      :rules="[{ required: true, message: '角色不能为空', trigger: 'blur' }]"
      :label-width="formLabelWidth"
    >
      <el-checkbox-group v-model="registeredForm.js">
        <el-checkbox :disabled="js1" label="1" name="js">管理员</el-checkbox>
        <el-checkbox :disabled="js10" label="10" name="js">审核员</el-checkbox>
        <el-checkbox :disabled="js100" label="100" name="js"
          >复核员</el-checkbox
        >
        <el-checkbox :disabled="js1000" label="1000" name="js"
          >填报员-基础信息</el-checkbox
        >
        <el-checkbox :disabled="js10000" label="10000" name="js"
          >填报员-管理信息</el-checkbox
        >
      </el-checkbox-group>
    </el-form-item>

    <el-form-item
      prop="phone"
      label="用户电话(账户)"
      :label-width="formLabelWidth"
      :rules="[
        { required: true, message: '用户电话(账户)不能为空', trigger: 'blur' },
      ]"
    >
      <el-input
        type="number"
        v-model.number="registeredForm.phone"
        autocomplete="off"
      ></el-input>
    </el-form-item>

    <el-form-item
      prop="password"
      label="用户密码"
      :label-width="formLabelWidth"
      :rules="[
        { required: true, message: '用户密码不能为空', trigger: 'blur' },
      ]"
    >
      <el-input
        type="password"
        v-model="registeredForm.password"
        autocomplete="off"
      ></el-input>
    </el-form-item>

    <el-form-item
      prop="password_confirm"
      label="确认密码"
      :label-width="formLabelWidth"
    >
      <el-input
        type="password"
        v-model="registeredForm.password_confirm"
        autocomplete="off"
      ></el-input>
    </el-form-item>

    <el-form-item
      prop="phoneCode"
      label="验证码"
      :label-width="formLabelWidth"
      :rules="[{ required: true, message: '验证码不能为空', trigger: 'blur' }]"
    >
      <el-input
        class="VerificationCode"
        v-model="registeredForm.phoneCode"
        autocomplete="off"
      ></el-input>
      <!-- <el-button :loading="register" type="success" class="register">{{
            send
          }}</el-button> -->

      <el-button
        :loading="register"
        type="success"
        class="register"
        v-show="verShow"
        @click="handleClick()"
        >点击获取验证码</el-button
      >
      <el-button
        :loading="register"
        type="success"
        class="register"
        v-show="!verShow"
        ><span>{{ timer }}</span
        >秒后重新获取</el-button
      >
    </el-form-item>
    <el-form-item class="dialog-footer">
      <el-button style="margin: 0 auto" type="primary" @click="onSubmit"
        >确 定</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
// import { getAll } from '@/api/mapProxy'
export default {
  data() {
    const passwordConfirmLvalidate = (rule, value, callback) => {
      if (this.registeredForm.password === '') {
        callback(new Error('请先输入用户密码'))
      } else if (value !== this.registeredForm.password) {
        callback(new Error('请保持密码与确认密码一致'))
      } else {
        callback()
      }
    }
    return {
      options: [
        {
          shimc: '130626',
          label: '石家庄市',
        },
        {
          shimc: '130123',
          label: '唐山市',
        },
        {
          shimc: '130234',
          label: '邯郸市',
        },
        {
          shimc: '130345',
          label: '唐山市',
        },
        {
          shimc: '130456',
          label: '邢台市',
        },
      ],
      registeredForm: {
        usertype: '',
        shengName: '河北省',
        shimc: '',
        xianmc: '',
        xzmc: '',
        cmc: '',
        sfz: '',
        username: '',
        xb: '',
        zw: '',
        ssdw: '',
        js: [],
        phone: '',
        password: '',
        password_confirm: '',
        phoneCode: '',
      },
      formRules: {
        password_confirm: [
          {
            required: true,
            message: '确认密码不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            trigger: 'blur',
            validator: passwordConfirmLvalidate,
          },
        ],
      },
      register: false,
      send: '发送(60s)',
      verShow: true,
      timer: 60,
      xianRules: false,
      xianDisa: true,
      xzRules: false,
      xzDisa: true,
      cRules: false,
      cDisa: true,
      formLabelWidth: '120px',
      js1: true,
      js10: true,
      js100: true,
      js1000: true,
      js10000: true,
    }
  },
  watch: {
    'registeredForm.usertype': function (value, oldval) {
      this.registeredForm.js = []
      if (value === '2') {
        this.xianRules = false
        this.xianDisa = true
        this.xzRules = false
        this.xzDisa = true
        this.cRules = false
        this.cDisa = true
        this.js1 = false
        this.js10 = false
        this.js100 = false
        this.js1000 = true
        this.js10000 = true
      } else if (value === '3') {
        this.xianRules = true
        this.xianDisa = false
        this.xzRules = false
        this.xzDisa = true
        this.cRules = false
        this.cDisa = true
        this.js1 = false
        this.js10 = false
        this.js100 = false
        this.js1000 = false
        this.js10000 = false
      } else if (value === '5') {
        this.xianRules = true
        this.xianDisa = false
        this.xzRules = true
        this.xzDisa = false
        this.cRules = false
        this.cDisa = true
        this.js1 = false
        this.js10 = false
        this.js100 = false
        this.js1000 = false
        this.js10000 = false
      } else if (value === '6') {
        this.xianRules = true
        this.xianDisa = false
        this.xzRules = true
        this.xzDisa = false
        this.cRules = true
        this.cDisa = false
        this.js1 = true
        this.js10 = true
        this.js100 = true
        this.js1000 = false
        this.js10000 = false
      } else {
      }
    },
  },
  methods: {
    handleClick() {
      if (!this.registeredForm.phone) {
        this.$message({ message: '请输入用户电话', type: 'warning' })
        return
      }
      this.verShow = false
      var auth_timer = setInterval(() => {
        this.timer--
        if (this.timer <= 0) {
          this.verShow = true
          clearInterval(auth_timer)
        }
      }, 1000)

      // getAll({ phone: this.registeredForm.phone, sendType: 'reg' })
      //   .then((res) => {
      //     console.log(res)
      //   })
      //   .catch((err) => {
      //     console.log(err)
      //   })

      // this.$axios({
      //   method: 'post',
      //   url: 'nodeMiddle/common/sendMsg',
      //   data: {
      //     phone: this.registeredForm.phone,
      //     sendType: 'reg',
      //   },
      // })
      //   .then((res) => {
      //     console.log(res)
      //   })
      //   .catch((err) => {
      //     console.dir(err)
      //     this.$toast.fail('系统错误')
      //   })
    },
    onSubmit() {
      this.$refs.registeredForm.validate((valid) => {
        if (valid) {
          console.log(this.registeredForm)
        } else {
          this.$message({
            message: '请正确填写表单',
            type: 'warning',
          })
          return false
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.FPForm {
  .el-select {
    width: 100%;
  }
}
</style>