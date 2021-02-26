<template>
  <div class="left-form">
    <el-form :model="form" ref="form" :rules="formRules" class="FPForm">
      <h3>基本信息</h3>
      <hr />
      <el-form-item
        label="房屋坐落"
        prop="locaiton"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="form.cun"
          placeholder="请输入村（社区）"
          autocomplete="off"
        ></el-input>
        村（社区）
        <el-input
          v-model="form.group"
          required
          placeholder="请输入组"
          autocomplete="off"
        ></el-input>
        组
        <el-input
          v-model="form.doorNum"
          placeholder="请输入门牌号"
          autocomplete="off"
        ></el-input
        >（门牌号）
      </el-form-item>

      <el-form-item
        label="项目名称"
        prop="filed8ZZL"
        :rules="[
          { required: true, message: '项目名称不能为空', trigger: 'blur' },
        ]"
        :label-width="formLabelWidth"
      >
        <el-input
          ref="filed8ZZL"
          v-model="form.filed8ZZL"
          placeholder="请输入项目名称"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="单位名称"
        prop="jsdwmcZZL"
        :rules="[
          { required: true, message: '单位名称不能为空', trigger: 'blur' },
        ]"
        :label-width="formLabelWidth"
      >
        <el-input
          ref="jsdwmcZZL"
          v-model="form.jsdwmcZZL"
          placeholder="请输入单位名称"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item
        prop="tdqdfsZZL"
        label="土地主要来源"
        :rules="[
          { required: true, message: '土地主要来源不能为空', trigger: 'blur' },
        ]"
        :label-width="formLabelWidth"
      >
        <el-select v-model="form.tdqdfsZZL" placeholder="请选择">
          <!-- <el-option label="请选择" value=""></el-option> -->
          <el-option label="承包地" value="承包地"></el-option>
          <el-option label="自留地" value="自留地"></el-option>
          <el-option label="集体自营" value="集体自营"></el-option>
          <el-option label="租赁" value="租赁"></el-option>
          <el-option label="购买" value="购买"></el-option>
          <el-option label="流转" value="流转"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        prop="jfyyZZL"
        label="建房原因"
        :rules="[
          { required: true, message: '建房原因不能为空', trigger: 'blur' },
        ]"
        :label-width="formLabelWidth"
      >
        <el-select v-model="form.jfyyZZL" placeholder="请选择">
          <!-- <el-option label="请选择" value=""></el-option> -->
          <el-option label="分户" value="分户"></el-option>
          <el-option label="移民搬迁" value="移民搬迁"></el-option>
          <el-option label="异地扶贫搬迁" value="异地扶贫搬迁"></el-option>
          <el-option label="地质灾害搬迁" value="地质灾害搬迁"></el-option>
          <el-option label="生态整治搬迁" value="生态整治搬迁"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        prop="kgsjZZL"
        label="开工时间"
        :rules="[
          { required: true, message: '开工时间不能为空', trigger: 'blur' },
        ]"
        :label-width="formLabelWidth"
      >
        <el-date-picker
          type="year"
          :picker-options="pickerOptions0"
          placeholder="请输入开工时间(年份)"
          v-model="form.kgsjZZL"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>

      <el-form-item
        label="房屋是否出售"
        prop="sfczcsZZL"
        :label-width="formLabelWidth"
        :rules="[
          { required: true, message: '房屋是否出售不能为空', trigger: 'blur' },
        ]"
      >
        <el-radio-group v-model="form.sfczcsZZL">
          <el-radio label="否"></el-radio>
          <el-radio label="部分"></el-radio>
          <el-radio label="全部"></el-radio>
        </el-radio-group>
      </el-form-item>

      <h3>管理信息</h3>
      <hr />

      <el-form-item
        prop="xmzytdmjZZL"
        label="房屋（项目）总占地面积"
        :label-width="formLabelWidth"
      >
        <el-input
          type="number"
          v-model.number="form.xmzytdmjZZL"
          placeholder="请输入房屋（项目）总占地面积"
          autocomplete="off"
        ></el-input
        >（/平方米）
        <el-button type="primary" size="small">分析</el-button>
      </el-form-item>

      <el-form-item
        prop="zygdmjZZL"
        label="占用耕地面积"
        :label-width="formLabelWidth"
      >
        <el-input
          type="number"
          v-model.number="form.zygdmjZZL"
          placeholder="请输入占用耕地面积"
          autocomplete="off"
        ></el-input
        >（/平方米）
        <el-button type="primary" size="small">分析</el-button>
      </el-form-item>

      <el-form-item
        prop="csZZL"
        label="占用永久基本农田面积"
        :label-width="formLabelWidth"
      >
        <el-input
          type="number"
          v-model.number="form.csZZL"
          placeholder="请输入占用永久基本农田面积"
          autocomplete="off"
        ></el-input
        >（/平方米）
        <el-button type="primary" size="small">分析</el-button>
      </el-form-item>

      <el-form-item
        prop="bzarea"
        label="本地区宅基地标准面积"
        :label-width="formLabelWidth"
      >
        <el-input
          type="number"
          v-model.number="form.bzarea"
          placeholder="本地区宅基地标准面积是为计算超出本地区宅基地标准面积，可为空"
          autocomplete="off"
        ></el-input
        >（/平方米）
      </el-form-item>

      <el-form-item
        prop="filed2ZZL"
        label="超出本地区宅基地标准面积"
        :label-width="formLabelWidth"
      >
        <el-input
          type="number"
          v-model.number="form.filed2ZZL"
          placeholder="请输入超出本地区宅基地标准面积"
          autocomplete="off"
        ></el-input
        >（/平方米）
        <el-tooltip
          effect="dark"
          content="请填写本地区宅基地标准面积"
          placement="top-start"
        >
          <el-button
            type="primary"
            :disabled="cgbdqgddzjdmjDHZZLdis"
            size="small"
            @click="filed2ZZLAnalysis"
            >分析</el-button
          >
        </el-tooltip>
      </el-form-item>

      <el-form-item
        prop="filed3ZZL"
        label="占用耕地的主要类型"
        :rules="[
          {
            required: true,
            message: '占用耕地的主要类型不能为空',
            trigger: 'blur',
          },
        ]"
        :label-width="formLabelWidth"
      >
        <el-select v-model="form.filed3ZZL" placeholder="请选择">
          <!-- <el-option label="请选择" value=""></el-option> -->
          <el-option label="纯耕地" value="纯耕地"></el-option>
          <el-option
            label="休耕、 撂荒的耕地"
            value="休耕、 撂荒的耕地"
          ></el-option>
          <el-option
            label="应按照耕地管理的园地、 林地、 草地、 坑塘等用地"
            value="应按照耕地管理的园地、 林地、 草地、 坑塘等用地"
          ></el-option>
          <el-option
            label="应按照耕地管理的设施农业用地"
            value="应按照耕地管理的设施农业用地"
          ></el-option>
          <el-option
            label="应按照耕地管理的地面已硬化的乡村广场等用地"
            value="应按照耕地管理的地面已硬化的乡村广场等用地"
          ></el-option>
          <el-option
            label="自然资源管理部门认定为耕地， 但林草管理部门认定为林地或草地的土地"
            value="自然资源管理部门认定为耕地， 但林草管理部门认定为林地或草地的土地"
          ></el-option>
          <el-option label="其他耕地" value="其他耕地"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        prop="sffhcxghqkZZL"
        label="是否符合城乡（村庄）规划"
        :rules="[
          {
            required: true,
            message: '是否符合城乡（村庄）规划不能为空',
            trigger: 'blur',
          },
        ]"
        :label-width="formLabelWidth"
      >
        <el-select v-model="form.sffhcxghqkZZL" placeholder="请选择">
          <!-- <el-option label="请选择" value=""></el-option> -->
          <el-option label="未编制规划" value="未编制规划"></el-option>
          <el-option label="符合" value="符合"></el-option>
          <el-option label="部分符合" value="部分符合"></el-option>
          <el-option label="不符合" value="不符合"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        prop="sffhtdlyztghqkZZL"
        label="是否符合土地利用 总体规划（国土空间规划）情况"
        :rules="[
          {
            required: true,
            message: '是否符合土地利用 总体规划（国土空间规划）情况不能为空',
            trigger: 'blur',
          },
        ]"
        :label-width="formLabelWidth"
        class="lhlabel"
      >
        <el-select v-model="form.sffhtdlyztghqkZZL" placeholder="请选择">
          <!-- <el-option label="请选择" value=""></el-option> -->
          <el-option label="符合" value="符合"></el-option>
          <el-option label="部分符合" value="部分符合"></el-option>
          <el-option label="不符合" value="不符合"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        prop="filed4ZZL"
        label="用地手续情况"
        :rules="[
          {
            required: true,
            message: '用地手续情况不能为空',
            trigger: 'blur',
          },
        ]"
        :label-width="formLabelWidth"
      >
        <el-select v-model="form.filed4ZZL" placeholder="请选择">
          <!-- <el-option label="请选择" value=""></el-option> -->
          <el-option label="无手续" value="无手续"></el-option>
          <el-option label="手续不全" value="手续不全"></el-option>
          <el-option label="有手续但不合规" value="有手续但不合规"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        prop="filed5ZZL"
        label="没有合法合规用地手续主要原因"
        :rules="[
          {
            required: true,
            message: '没有合法合规用地手续主要原因不能为空',
            trigger: 'blur',
          },
        ]"
        :label-width="formLabelWidth"
        class="lhlabel"
      >
        <el-select v-model="form.filed5ZZL" placeholder="请选择">
          <!-- <el-option label="请选择" value=""></el-option> -->
          <el-option
            label="未申请办理用地手续"
            value="未申请办理用地手续"
          ></el-option>
          <el-option label="不符合申请条件" value="不符合申请条件"></el-option>
          <el-option label="无用地计划指标" value="无用地计划指标"></el-option>
          <el-option label="停批" value="停批"></el-option>
          <el-option label="不符合规划" value="不符合规划"></el-option>
          <el-option label="未缴费" value="未缴费"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="是否作出行政处罚"
        prop="sfbxzcfZZL"
        :label-width="formLabelWidth"
        :rules="[
          {
            required: true,
            message: '是否作出行政处罚不能为空',
            trigger: 'blur',
          },
        ]"
      >
        <el-radio-group v-model="form.sfbxzcfZZL">
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        v-show="filed6ZZLTrN"
        label="是否申请法院强制执行"
        prop="filed6ZZL"
        :label-width="formLabelWidth"
        :rules="[
          {
            required: filed6ZZLTrF,
            message: '是否申请法院强制执行不能为空',
            trigger: 'blur',
          },
        ]"
      >
        <el-radio-group v-model="form.filed6ZZL">
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        v-show="filed7ZZLTrN"
        label="法院是否受理"
        prop="filed7ZZL"
        :label-width="formLabelWidth"
        :rules="[
          {
            required: filed7ZZLTrF,
            message: '法院是否受理不能为空',
            trigger: 'blur',
          },
        ]"
      >
        <el-radio-group v-model="form.filed7ZZL">
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item :style="{ textAlign: 'center ', padding: '20px' }">
        <el-button type="success" @click="onSubmit">保存</el-button>
        <el-button type="warning">修改</el-button>
        <el-button type="info">退出</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    const reg = /^\d+.?\d{0,2}$/
    const xmzytdmjZZLvalidate = (rule, value, callback) => {
      if (reg.test(value)) {
        if (value < this.form.zygdmjZZL) {
          callback(new Error('占用耕地面积不能大于房屋（项目）总占地面积'))
        } else if (value < this.form.csZZL) {
          callback(
            new Error('占用永久基本农田面积不能大于房屋（项目）总占地面积')
          )
        } else if (value < this.form.filed2ZZL) {
          callback(
            new Error('超出本地区宅基地标准面积不能大于房屋（项目）总占地面积')
          )
        } else {
          callback()
        }
      } else if (value < 0) {
        callback(new Error('房屋（项目）总占地面积不能为负数'))
      } else {
        callback(new Error('请输入保留小数点后最多两位的小数'))
      }
    }
    const zygdmjZZLvalidate = (rule, value, callback) => {
      if (reg.test(value)) {
        if (value > this.form.xmzytdmjZZL) {
          callback(new Error('占用耕地面积不能大于房屋（项目）总占地面积'))
        } else {
          callback()
        }
      } else if (value < 0) {
        callback(new Error('占用耕地面积不能为负数'))
      } else {
        callback(new Error('请输入保留小数点后最多两位的小数'))
      }
    }
    const csZZLvalidate = (rule, value, callback) => {
      if (reg.test(value)) {
        if (value > this.form.xmzytdmjZZL) {
          callback(
            new Error('占用永久基本农田面积不能大于房屋（项目）总占地面积')
          )
        } else {
          callback()
        }
      } else if (value < 0) {
        callback(new Error('占用永久基本农田面积不能为负数'))
      } else {
        callback(new Error('请输入保留小数点后最多两位的小数'))
      }
    }
    const filed2ZZLvalidate = (rule, value, callback) => {
      if (reg.test(value)) {
        if (value > this.form.xmzytdmjZZL) {
          callback(
            new Error('超出本地区宅基地标准面积不能大于房屋（项目）总占地面积')
          )
        } else {
          callback()
        }
      } else if (value < 0) {
        callback(new Error('超出本地区宅基地标准面积不能为负数'))
      } else {
        callback(new Error('请输入保留小数点后最多两位的小数'))
      }
    }
    return {
      form: {
        cun: '',
        group: '',
        doorNum: '',
        filed8ZZL: '',
        jsdwmcZZL: '',
        tdqdfsZZL: '',
        tdqdfsDHZZL: '',
        jfyyZZL: '',
        kgsjZZL: '',
        sfczcsZZL: '',
        xmzytdmjZZL: '',
        zygdmjZZL: '',
        csZZL: '',
        bzarea: '',
        filed2ZZL: '',
        filed3ZZL: '',
        sffhcxghqkZZL: '',
        sffhtdlyztghqkZZL: '',
        filed4ZZL: '',
        filed5ZZL: '',
        sfbxzcfZZL: '',
        filed6ZZL: '',
        filed7ZZL: '',
      },
      formRules: {
        xmzytdmjZZL: [
          {
            required: true,
            message: '房屋（项目）总占地面积不能为空',
            trigger: 'blur',
          },
          //  { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
          // {
          //   required: true,
          //   pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
          //   message: '姓名不支持特殊字符',
          //   trigger: 'blur',
          // },
          { required: true, trigger: 'blur', validator: xmzytdmjZZLvalidate },
        ],
        zygdmjZZL: [
          { required: true, message: '占用耕地面积不能为空', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: zygdmjZZLvalidate },
        ],
        csZZL: [
          {
            required: true,
            message: '占用永久基本农田面积不能为空',
            trigger: 'blur',
          },
          { required: true, trigger: 'blur', validator: csZZLvalidate },
        ],
        filed2ZZL: [
          {
            required: true,
            message: '超出本地区宅基地标准面积不能为空',
            trigger: 'blur',
          },
          { required: true, trigger: 'blur', validator: filed2ZZLvalidate },
        ],
      },
      filed6ZZLTrN: false,
      filed6ZZLTrF: false,
      filed7ZZLTrN: false,
      filed7ZZLTrF: false,
      cgbdqgddzjdmjDHZZLdis: true,
      formLabelWidth: '200px',
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        },
      },
    }
  },
  watch: {
    // 'form.xmzytdmjZZL': function (value, oldval) {
    //   if (value) {
    //     if (this.form.zygdmjZZL > value) {
    //       this.$message.error('占用耕地面积不得大于房屋（项目）总占地面积')
    //     } else if (this.form.csZZL > value) {
    //       this.$message.error(
    //         '占用永久基本农田面积不得大于房屋（项目）总占地面积'
    //       )
    //     } else if (this.form.filed2ZZL > value) {
    //       this.$message.error(
    //         '超出本地区宅基地标准面积不得大于或等于 房屋（项目）总占地面积'
    //       )
    //     } else {
    //     }
    //   } else {
    //   }
    // },
    // 'form.zygdmjZZL': function (value, oldval) {
    //   if (this.form.xmzytdmjZZL) {
    //     if (value > this.form.xmzytdmjZZL) {
    //       this.$message.error('占用耕地面积不得大于房屋（项目）总占地面积')
    //     } else {
    //     }
    //   } else {
    //   }
    // },
    // 'form.csZZL': function (value, oldval) {
    //   if (this.form.xmzytdmjZZL) {
    //     if (value > this.form.xmzytdmjZZL) {
    //       this.$message.error(
    //         '占用永久基本农田面积不得大于房屋（项目）总占地面积'
    //       )
    //     } else {
    //     }
    //   }
    // },
    // 'form.filed2ZZL': {
    //   deep: true,
    //   handler(value) {
    //     if (this.form.xmzytdmjZZL) {
    //       if (value >= this.form.xmzytdmjZZL) {
    //         this.$message.error(
    //           '超出本地区宅基地标准面积不得大于或等于 房屋（项目）总占地面积'
    //         )
    //       } else {
    //       }
    //     }
    //   },
    // },
    form: {
      //深度监听，可监听到对象、数组的变化
      handler(val, oldVal) {
        if (val.bzarea) {
          this.cgbdqgddzjdmjDHZZLdis = false
        } else {
          this.cgbdqgddzjdmjDHZZLdis = true
        }

        if (val.sfbxzcfZZL == '是') {
          this.filed6ZZLTrN = true
          this.filed6ZZLTrF = true
          if (val.filed6ZZL === '是') {
            this.filed7ZZLTrN = true
            this.filed7ZZLTrF = true
          } else {
            this.filed7ZZLTrN = false
            this.filed7ZZLTrF = false
          }
        } else {
          this.filed6ZZLTrN = false
          this.filed6ZZLTrF = false
        }
      },
      deep: true, //true 深度监听
    },
  },
  methods: {
    // @keyup.native="form.xmzytdmjZZL = checkInputs(form.xmzytdmjZZL)"
    checkInputs(num) {
      let str = num.toString()
      let len1 = str.split('.')[1]
      if (str.indexOf('.') != -1) {
        if (len1 > 2) {
          return Number(str).toFixed(2)
        } else {
          return str
        }
      } else {
        return str
      }
    },
    filed2ZZLAnalysis() {
      this.form.filed2ZZL = this.form.xmzytdmjZZL - this.form.bzarea
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log(this.form)
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

<style lang="scss">
.lhlabel {
  .el-form-item__label {
    line-height: 23px;
  }
}

.resizeNone {
  .el-textarea__inner {
    //el_input中的隐藏属性
    resize: none; //主要是这个样式
    height: 120px;
  }
}
</style>

<style lang="scss" scoped>
.left-form {
  width: 40%;
  margin: 20px;

  .FPForm {
    margin: 10px;

    h3 {
      font-weight: bold;
      color: #1e9fff;
      font-size: 24px;
    }

    hr {
      color: #1e9fff;
      margin-bottom: 20px;
    }

    .el-form-item {
      color: #999;

      .el-input {
        margin-bottom: 10px;
        max-width: 300px;
        margin-right: 5px;
      }
      .el-select {
        width: 300px;
      }
    }
  }
}
</style>