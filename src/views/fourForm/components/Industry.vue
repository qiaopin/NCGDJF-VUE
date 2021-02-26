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
        prop="filed4CYL"
        :rules="[
          { required: true, message: '项目名称不能为空', trigger: 'blur' },
        ]"
        :label-width="formLabelWidth"
      >
        <el-input
          ref="filed4CYL"
          v-model="form.filed4CYL"
          placeholder="请输入项目名称"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item
        prop="fwlbCYL"
        label="房屋主要用途"
        :rules="[
          { required: true, message: '房屋主要用途不能为空', trigger: 'blur' },
        ]"
        :label-width="formLabelWidth"
      >
        <el-select v-model="form.fwlbCYL" placeholder="请选择">
          <!-- <el-option label="请选择" value=""></el-option> -->
          <el-option label="农产品加工" value="农产品加工"></el-option>
          <el-option label="其他工业生产" value="其他工业生产"></el-option>
          <el-option label="仓储物流" value="仓储物流"></el-option>
          <el-option label="旅游" value="旅游"></el-option>
          <el-option label="商业" value="商业"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="建设主体名称"
        prop="jsdwmcCYL"
        :rules="[
          { required: true, message: '建设主体名称不能为空', trigger: 'blur' },
        ]"
        :label-width="formLabelWidth"
      >
        <el-input
          ref="jsdwmcCYL"
          v-model="form.jsdwmcCYL"
          placeholder="请输入建设主体名称"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item
        prop="jsdwxzCYL"
        label="建设主体性质"
        :rules="[
          { required: true, message: '建设主体性质不能为空', trigger: 'blur' },
        ]"
        :label-width="formLabelWidth"
      >
        <el-select v-model="form.jsdwxzCYL" placeholder="请选择">
          <!-- <el-option label="请选择" value=""></el-option> -->
          <el-option label="集体经济组织" value="集体经济组织"></el-option>
          <el-option label="私人企业" value="私人企业"></el-option>
          <el-option label="国有企业" value="国有企业"></el-option>
          <el-option label="个人" value="个人"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        prop="tdqdfsCYL"
        label="土地主要来源"
        :rules="[
          { required: true, message: '土地主要来源不能为空', trigger: 'blur' },
        ]"
        :label-width="formLabelWidth"
      >
        <el-select v-model="form.tdqdfsCYL" placeholder="请选择">
          <!-- <el-option label="请选择" value=""></el-option> -->
          <el-option label="集体自营土地" value="集体自营土地"></el-option>
          <el-option label="租赁" value="租赁"></el-option>
          <el-option label="购买" value="购买"></el-option>
          <el-option label="流转" value="流转"></el-option>
          <el-option label="承包地" value="承包地"></el-option>
          <el-option label="自留地" value="自留地"></el-option>
          <el-option label="作价入股" value="作价入股"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="是否扶贫项目"
        prop="sffpxmCYL"
        :label-width="formLabelWidth"
        :rules="[
          { required: true, message: '是否扶贫项目不能为空', trigger: 'blur' },
        ]"
      >
        <el-radio-group v-model="form.sffpxmCYL">
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        label="是否上级部门有明确要求"
        prop="filed5CYL"
        :label-width="formLabelWidth"
        :rules="[
          {
            required: true,
            message: '是否上级部门有明确要求不能为空',
            trigger: 'blur',
          },
        ]"
      >
        <el-radio-group v-model="form.filed5CYL">
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        prop="filed6CYL"
        v-show="filed6CYLTrN"
        label="部门名称"
        :rules="[
          {
            required: filed6CYLTrF,
            message: '部门名称不能为空',
            trigger: 'blur',
          },
        ]"
        :label-width="formLabelWidth"
      >
        <el-select v-model="form.filed6CYL" placeholder="请选择">
          <!-- <el-option label="请选择" value=""></el-option> -->
          <el-option label="组织部门" value="组织部门"></el-option>
          <el-option label="发改部门" value="发改部门"></el-option>
          <el-option label="教育部门" value="教育部门"></el-option>
          <el-option label="科技部门" value="科技部门"></el-option>
          <el-option label="工信部门" value="工信部门"></el-option>
          <el-option label="公安部门" value="公安部门"></el-option>
          <el-option label="民政部门" value="民政部门"></el-option>

          <el-option label="司法部门" value="司法部门"></el-option>
          <el-option label="财政部门" value="财政部门"></el-option>
          <el-option label="人社部门" value="人社部门"></el-option>
          <el-option label="自然资源部门" value="自然资源部门"></el-option>
          <el-option label="生态环境部门" value="生态环境部门"></el-option>
          <el-option label="住建部门" value="住建部门"></el-option>
          <el-option label="交通运输部门" value="交通运输部门"></el-option>

          <el-option label="水利部门" value="水利部门"></el-option>
          <el-option label="农业农村部门" value="农业农村部门"></el-option>
          <el-option label="文旅部门" value="文旅部门"></el-option>
          <el-option label="卫生健康部门" value="卫生健康部门"></el-option>
          <el-option label="扶贫办" value="扶贫办"></el-option>
          <el-option label="其他部门" value="其他部门"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        prop="kgrqCYL"
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
          v-model="form.kgrqCYL"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>

      <el-form-item
        label="与本村农产品的生产、加工、 销售等是否直接相关"
        prop="filed7CYL"
        :label-width="formLabelWidth"
        :rules="[
          {
            required: true,
            message: '与本村农产品的生产、加工、 销售等是否直接相关不能为空',
            trigger: 'blur',
          },
        ]"
        class="lhlabel"
      >
        <el-radio-group v-model="form.filed7CYL">
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-form-item>

      <h3>管理信息</h3>
      <hr />

      <el-form-item
        prop="xmzytdmjCYL"
        label="项目总占地面积"
        :label-width="formLabelWidth"
      >
        <el-input
          type="number"
          v-model.number="form.xmzytdmjCYL"
          placeholder="请输入项目总占地面积"
          autocomplete="off"
        ></el-input
        >（/平方米）
        <el-button type="primary" size="small">分析</el-button>
      </el-form-item>

      <el-form-item
        prop="zygdmjCYL"
        label="占用耕地面积"
        zygdmjCYL
        :label-width="formLabelWidth"
      >
        <el-input
          type="number"
          v-model.number="form.zygdmjCYL"
          placeholder="请输入占用耕地面积"
          autocomplete="off"
        ></el-input
        >（/平方米）
        <el-button type="primary" size="small">分析</el-button>
      </el-form-item>

      <el-form-item
        prop="filed2CYL"
        label="占用永久基本农田面积"
        :label-width="formLabelWidth"
      >
        <el-input
          type="number"
          v-model.number="form.filed2CYL"
          @blur="checkInputs1"
          placeholder="请输入占用永久基本农田面积"
          autocomplete="off"
        ></el-input
        >（/平方米）
        <el-button type="primary" size="small">分析</el-button>
      </el-form-item>

      <el-form-item
        prop="filed8CYL"
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
        <el-select v-model="form.filed8CYL" placeholder="请选择">
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
        prop="sffhcxghqkCYL"
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
        <el-select v-model="form.sffhcxghqkCYL" placeholder="请选择">
          <!-- <el-option label="请选择" value=""></el-option> -->
          <el-option label="未编制规划" value="未编制规划"></el-option>
          <el-option label="符合" value="符合"></el-option>
          <el-option label="部分符合" value="部分符合"></el-option>
          <el-option label="不符合" value="不符合"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        prop="sffhtdlyztghqkCYL"
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
        <el-select v-model="form.sffhtdlyztghqkCYL" placeholder="请选择">
          <!-- <el-option label="请选择" value=""></el-option> -->
          <el-option label="符合" value="符合"></el-option>
          <el-option label="部分符合" value="部分符合"></el-option>
          <el-option label="不符合" value="不符合"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        prop="sfsqblydspsxCYL"
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
        <el-select v-model="form.sfsqblydspsxCYL" placeholder="请选择">
          <!-- <el-option label="请选择" value=""></el-option> -->
          <el-option label="无手续" value="无手续"></el-option>
          <el-option label="手续不全" value="手续不全"></el-option>
          <el-option label="有手续但不合规" value="有手续但不合规"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        prop="xmslzgbmCYL"
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
        <el-select v-model="form.xmslzgbmCYL" placeholder="请选择">
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
          <el-option label="其他" value="其他"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="是否作出行政处罚"
        prop="sfbzxcfCYL"
        :label-width="formLabelWidth"
        :rules="[
          {
            required: true,
            message: '是否作出行政处罚不能为空',
            trigger: 'blur',
          },
        ]"
      >
        <el-radio-group v-model="form.sfbzxcfCYL">
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        v-show="filed9CYLTrN"
        label="是否申请法院强制执行"
        prop="filed9CYL"
        :label-width="formLabelWidth"
        :rules="[
          {
            required: filed9CYLTrF,
            message: '是否申请法院强制执行不能为空',
            trigger: 'blur',
          },
        ]"
      >
        <el-radio-group v-model="form.filed9CYL">
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        v-show="filed10CYLTrN"
        label="法院是否受理"
        prop="filed10CYL"
        :label-width="formLabelWidth"
        :rules="[
          {
            required: filed10CYLTrF,
            message: '法院是否受理不能为空',
            trigger: 'blur',
          },
        ]"
      >
        <el-radio-group v-model="form.filed10CYL">
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
    const xmzytdmjCYLvalidate = (rule, value, callback) => {
      if (reg.test(value)) {
        if (value < this.form.zygdmjCYL) {
          callback(new Error('占用耕地面积不能大于项目总占地面积'))
        } else if (value < this.form.filed2CYL) {
          callback(new Error('占用永久基本农田面积不能大于项目总占地面积'))
        } else {
          callback()
        }
      } else if (value < 0) {
        callback(new Error('占用永久基本农田面积不能为负数'))
      } else {
        callback(new Error('请输入保留小数点后最多两位的小数'))
      }
    }
    const zygdmjCYLvalidate = (rule, value, callback) => {
      if (reg.test(value)) {
        if (value > this.form.xmzytdmjCYL) {
          callback(new Error('占用耕地面积不能大于项目总占地面积'))
        } else {
          callback()
        }
      } else if (value < 0) {
        callback(new Error('占用耕地面积不能为负数'))
      } else {
        callback(new Error('请输入保留小数点后最多两位的小数'))
      }
    }
    const filed2CYLvalidate = (rule, value, callback) => {
      if (reg.test(value)) {
        if (value > this.form.xmzytdmjCYL) {
          callback(new Error('占用永久基本农田面积不能大于项目总占地面积'))
        } else {
          callback()
        }
      } else if (value < 0) {
        callback(new Error('占用永久基本农田面积不能为负数'))
      } else {
        callback(new Error('请输入保留小数点后最多两位的小数'))
      }
    }
    return {
      form: {
        cun: '',
        group: '',
        doorNum: '',
        filed4CYL: '',
        fwlbCYL: '',
        jsdwmcCYL: '',
        jsdwxzCYL: '',
        tdqdfsCYL: '',
        sffpxmCYL: '',
        filed5CYL: '',
        filed6CYL: '',
        kgrqCYL: '',
        filed7CYL: '',
        xmzytdmjCYL: '',
        zygdmjCYL: '',
        filed2CYL: '',
        filed8CYL: '',
        sffhcxghqkCYL: '',
        sffhtdlyztghqkCYL: '',
        sfsqblydspsxCYL: '',
        xmslzgbmCYL: '',
        sfbzxcfCYL: '',
        filed9CYL: '',
        filed10CYL: '',
      },
      formRules: {
        xmzytdmjCYL: [
          {
            required: true,
            message: '项目总占地面积不能为空',
            trigger: 'blur',
          },
          //  { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
          // {
          //   required: true,
          //   pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
          //   message: '姓名不支持特殊字符',
          //   trigger: 'blur',
          // },
          { required: true, trigger: 'blur', validator: xmzytdmjCYLvalidate },
        ],
        zygdmjCYL: [
          { required: true, message: '占用耕地面积不能为空', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: zygdmjCYLvalidate },
        ],
        filed2CYL: [
          {
            required: true,
            message: '占用永久基本农田面积不能为空',
            trigger: 'blur',
          },
          { required: true, trigger: 'blur', validator: filed2CYLvalidate },
        ],
      },
      filed6CYLTrN: false,
      filed6CYLTrF: false,
      filed9CYLTrN: false,
      filed9CYLTrF: false,
      filed10CYLTrN: false,
      filed10CYLTrF: false,
      formLabelWidth: '200px',
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        },
      },
    }
  },
  watch: {
    // 'form.xmzytdmjCYL': function (value, oldval) {
    //   if (value) {
    //     if (this.form.zygdmjCYL > value) {
    //       this.$message.error('占用耕地面积不得大于项目总占土地面积')
    //     } else if (this.form.filed2CYL > value) {
    //       this.$message.error('占用永久基本农田面积不得大于项目总占土地面积')
    //     }
    //   } else {
    //   }
    // },
    // 'form.zygdmjCYL': function (value, oldval) {
    //   if (this.form.xmzytdmjCYL) {
    //     if (value > this.form.xmzytdmjCYL) {
    //       this.$message.error('占用耕地面积不得大于项目总占土地面积')
    //     } else {
    //     }
    //   } else {
    //   }
    // },
    // 'form.filed2CYL': function (value, oldval) {
    //   if (this.form.xmzytdmjCYL) {
    //     if (value > this.form.xmzytdmjCYL) {
    //       this.$message.error('占用永久基本农田面积不得大于项目总占土地面积')
    //     } else {
    //     }
    //   } else {
    //   }
    // },
    form: {
      //深度监听，可监听到对象、数组的变化
      handler(val, oldVal) {
        if (val.filed5CYL === '是') {
          this.filed6CYLTrN = true
          this.filed6CYLTrF = true
        } else {
          this.filed6CYLTrN = false
          this.filed6CYLTrF = false
        }

        if (val.sfbzxcfCYL == '是') {
          this.filed9CYLTrN = true
          this.filed9CYLTrF = true
          if (val.filed9CYL == '是') {
            this.filed10CYLTrN = true
            this.filed10CYLTrF = true
          } else {
            this.filed10CYLTrN = false
            this.filed10CYLTrF = false
          }
        } else {
          this.filed9CYLTrN = false
          this.filed9CYLTrF = false
        }
      },
      deep: true, //true 深度监听
    },
  },
  methods: {
    // @keyup.native="form.zygdmjCYL = checkInputs(form.zygdmjCYL)"
    checkInputs1(num) {
      let str = this.form.filed2CYL.toString()
      if (str.indexOf('.') != -1) {
        let len1 = str.split('.')[1]
        if (len1 > 2) {
          this.form.filed2CYL = Number(str).toFixed(2)
        } else {
        }
      } else {
      }
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