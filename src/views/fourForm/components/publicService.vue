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
        prop="sfssGGFWL"
        :rules="[
          { required: true, message: '项目名称不能为空', trigger: 'blur' },
        ]"
        :label-width="formLabelWidth"
      >
        <el-input
          ref="sfssGGFWL"
          v-model="form.sfssGGFWL"
          placeholder="请输入项目名称"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item
        prop="fwlbGGFWL"
        label="房屋主要用途"
        :rules="[
          { required: true, message: '房屋主要用途不能为空', trigger: 'blur' },
        ]"
        :label-width="formLabelWidth"
      >
        <el-select v-model="form.fwlbGGFWL" placeholder="请选择">
          <!-- <el-option label="请选择" value=""></el-option> -->
          <el-option
            label="村“两委”办公用房"
            value="村“两委”办公用房"
          ></el-option>
          <el-option
            label="学校、 幼儿园等教育设施"
            value="学校、 幼儿园等教育设施"
          ></el-option>
          <el-option
            label="敬老院等养老服务设施"
            value="敬老院等养老服务设施"
          ></el-option>
          <el-option
            label="图书馆、 阅览室、 礼堂及硬化了的公共广场等文化娱乐设施"
            value="图书馆、 阅览室、 礼堂及硬化了的公共广场等文化娱乐设施"
          ></el-option>
          <el-option
            label="卫生站、 垃圾处理站、 公共厕所等医疗卫生设施"
            value="卫生站、 垃圾处理站、 公共厕所等医疗卫生设施"
          ></el-option>
          <el-option
            label="祠堂、 寺庙、 教堂等设施"
            value="祠堂、 寺庙、 教堂等设施"
          ></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="建设主体名称"
        prop="jsdwmcGGFWL"
        :rules="[
          { required: true, message: '建设主体名称不能为空', trigger: 'blur' },
        ]"
        :label-width="formLabelWidth"
      >
        <el-input
          ref="jsdwmcGGFWL"
          v-model="form.jsdwmcGGFWL"
          placeholder="请输入建设主体名称"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="建设主体性质"
        prop="jsdwxzGGFWL"
        :label-width="formLabelWidth"
        :rules="[
          { required: true, message: '建设主体性质不能为空', trigger: 'blur' },
        ]"
      >
        <el-radio-group v-model="form.jsdwxzGGFWL">
          <el-radio label="集体经济组织"></el-radio>
          <el-radio label="其他"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        prop="tdqdfsGGFWL"
        label="土地主要来源"
        :rules="[
          { required: true, message: '土地主要来源不能为空', trigger: 'blur' },
        ]"
        :label-width="formLabelWidth"
      >
        <el-select v-model="form.tdqdfsGGFWL" placeholder="请选择">
          <!-- <el-option label="请选择" value=""></el-option> -->
          <el-option label="集体自营土地" value="集体自营土地"></el-option>
          <el-option label="租赁" value="租赁"></el-option>
          <el-option label="购买" value="购买"></el-option>
          <el-option label="流转" value="流转"></el-option>
          <el-option label="承包地" value="承包地"></el-option>
          <el-option label="自留地" value="自留地"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="是否扶贫项目"
        prop="sffpxmGGFWL"
        :label-width="formLabelWidth"
        :rules="[
          { required: true, message: '是否扶贫项目不能为空', trigger: 'blur' },
        ]"
      >
        <el-radio-group v-model="form.sffpxmGGFWL">
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        label="是否上级部门有明确要求"
        prop="filed3GGFWL"
        :label-width="formLabelWidth"
        :rules="[
          {
            required: true,
            message: '是否上级部门有明确要求不能为空',
            trigger: 'blur',
          },
        ]"
      >
        <el-radio-group v-model="form.filed3GGFWL">
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        prop="filed4GGFWL"
        v-show="filed4GGFWLTrN"
        label="部门名称"
        :rules="[
          {
            required: filed4GGFWLTrF,
            message: '部门名称不能为空',
            trigger: 'blur',
          },
        ]"
        :label-width="formLabelWidth"
      >
        <el-select v-model="form.filed4GGFWL" placeholder="请选择">
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
        prop="kgsjGGFWL"
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
          v-model="form.kgsjGGFWL"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>

      <el-form-item
        prop="filed5GGFWL"
        label="利用情况"
        :rules="[
          {
            required: true,
            message: '利用情况不能为空',
            trigger: 'blur',
          },
        ]"
        :label-width="formLabelWidth"
      >
        <el-select v-model="form.filed5GGFWL" placeholder="请选择">
          <!-- <el-option label="请选择" value=""></el-option> -->
          <el-option label="闲置" value="闲置"></el-option>
          <el-option label="很少使用" value="很少使用"></el-option>
          <el-option label="经常使用" value="经常使用"></el-option>
        </el-select>
      </el-form-item>

      <h3>管理信息</h3>
      <hr />

      <el-form-item
        prop="xmzytdmjGGFWL"
        label="项目总占地面积"
        :label-width="formLabelWidth"
      >
        <el-input
          type="number"
          v-model.number="form.xmzytdmjGGFWL"
          @keyup.native="form.xmzytdmjGGFWL = checkInputs(form.xmzytdmjGGFWL)"
          placeholder="请输入项目总占地面积"
          autocomplete="off"
        ></el-input
        >（/平方米）
        <el-button type="primary" size="small">分析</el-button>
      </el-form-item>

      <el-form-item
        prop="qzzygdmjGGFWL"
        label="占用耕地面积"
        :rules="[
          {
            required: true,
            message: '占用耕地面积不能为空',
            trigger: 'blur',
          },
        ]"
        :label-width="formLabelWidth"
      >
        <el-input
          type="number"
          v-model.number="form.qzzygdmjGGFWL"
          @keyup.native="form.qzzygdmjGGFWL = checkInputs(form.qzzygdmjGGFWL)"
          placeholder="请输入占用耕地面积"
          autocomplete="off"
        ></el-input
        >（/平方米）
        <el-button type="primary" size="small">分析</el-button>
      </el-form-item>

      <el-form-item
        prop="filed2GGFWL"
        label="占用永久基本农田面积"
        :rules="[
          {
            required: true,
            message: '占用永久基本农田面积不能为空',
            trigger: 'blur',
          },
        ]"
        :label-width="formLabelWidth"
      >
        <el-input
          type="number"
          v-model.number="form.filed2GGFWL"
          @keyup.native="form.filed2GGFWL = checkInputs(form.filed2GGFWL)"
          placeholder="请输入占用永久基本农田面积"
          autocomplete="off"
        ></el-input
        >（/平方米）
        <el-button type="primary" size="small">分析</el-button>
      </el-form-item>

      <el-form-item
        prop="filed6GGFWL"
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
        <el-select v-model="form.filed6GGFWL" placeholder="请选择">
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
        prop="fhcxghqkGGFWL"
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
        <el-select v-model="form.fhcxghqkGGFWL" placeholder="请选择">
          <!-- <el-option label="请选择" value=""></el-option> -->
          <el-option label="未编制规划" value="未编制规划"></el-option>
          <el-option label="符合" value="符合"></el-option>
          <el-option label="部分符合" value="部分符合"></el-option>
          <el-option label="不符合" value="不符合"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        prop="fhtdlyztghqkGGFWL"
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
        <el-select v-model="form.fhtdlyztghqkGGFWL" placeholder="请选择">
          <!-- <el-option label="请选择" value=""></el-option> -->
          <el-option label="符合" value="符合"></el-option>
          <el-option label="部分符合" value="部分符合"></el-option>
          <el-option label="不符合" value="不符合"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        prop="filed7GGFWL"
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
        <el-select v-model="form.filed7GGFWL" placeholder="请选择">
          <!-- <el-option label="请选择" value=""></el-option> -->
          <el-option label="无手续" value="无手续"></el-option>
          <el-option label="手续不全" value="手续不全"></el-option>
          <el-option label="有手续但不合规" value="有手续但不合规"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        prop="filed8GGFWL"
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
        <el-select v-model="form.filed8GGFWL" placeholder="请选择">
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
        prop="sfbxzcfGGFWL"
        :label-width="formLabelWidth"
        :rules="[
          {
            required: true,
            message: '是否作出行政处罚不能为空',
            trigger: 'blur',
          },
        ]"
      >
        <el-radio-group v-model="form.sfbxzcfGGFWL">
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        v-show="filed9GGFWLTrN"
        label="是否申请法院强制执行"
        prop="filed9GGFWL"
        :label-width="formLabelWidth"
        :rules="[
          {
            required: filed9GGFWLTrF,
            message: '是否申请法院强制执行不能为空',
            trigger: 'blur',
          },
        ]"
      >
        <el-radio-group v-model="form.filed9GGFWL">
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        v-show="filed10GGFWLTrN"
        label="法院是否受理"
        prop="filed10GGFWL"
        :label-width="formLabelWidth"
        :rules="[
          {
            required: filed10GGFWLTrF,
            message: '法院是否受理不能为空',
            trigger: 'blur',
          },
        ]"
      >
        <el-radio-group v-model="form.filed10GGFWL">
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
    return {
      form: {
        cun: '',
        group: '',
        doorNum: '',
        sfssGGFWL: '',
        fwlbGGFWL: '',
        jsdwmcGGFWL: '',
        jsdwxzGGFWL: '',
        tdqdfsGGFWL: '',
        sffpxmGGFWL: '',
        filed3GGFWL: '',
        kgsjGGFWL: '',
        filed5GGFWL: '',
        xmzytdmjGGFWL: '',
        qzzygdmjGGFWL: '',
        filed2GGFWL: '',
        filed6GGFWL: '',
        fhcxghqkGGFWL: '',
        fhtdlyztghqkGGFWL: '',
        filed7GGFWL: '',
        filed8GGFWL: '',
        sfbxzcfGGFWL: '',
        filed9GGFWL: '',
        filed10GGFWL: '',
      },
      filed4GGFWLTrN: false,
      filed4GGFWLTrF: false,
      filed9GGFWLTrN: false,
      filed9GGFWLTrF: false,
      filed10GGFWLTrN: false,
      filed10GGFWLTrF: false,
      formRules: {},
      formLabelWidth: '200px',
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        },
      },
    }
  },
  watch: {
    form: {
      //深度监听，可监听到对象、数组的变化
      handler(val, oldVal) {
        if (val.filed3GGFWL === '是') {
          this.filed4GGFWLTrN = true
          this.filed4GGFWLTrF = true
        } else {
          this.filed4GGFWLTrN = false
          this.filed4GGFWLTrF = false
        }

        if (val.sfbxzcfGGFWL == '是') {
          this.filed9GGFWLTrN = true
          this.filed9GGFWLTrF = true
          if (val.filed9GGFWL == '是') {
            this.filed10GGFWLTrN = true
            this.filed10GGFWLTrF = true
          } else {
            this.filed10GGFWLTrN = false
            this.filed10GGFWLTrF = false
          }
        } else {
          this.filed9GGFWLTrN = false
          this.filed9GGFWLTrF = false
        }
      },
      deep: true, //true 深度监听
    },
  },
  methods: {
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